import React from 'react';
import { CircularProgress, Button, IconButton, TextField, Dialog, DialogContent, DialogTitle, Snackbar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/MailOutline';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios'
import moment from "moment";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiDialog-paper': {
            padding: 20,
            width: 600,
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

function ButtonComponent(props) {
    const classes = useStyles();
    const { onClick, loading } = props;
    return (
        <Button type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onClick}
            disabled={loading}>
            {loading && <CircularProgress size={25} />}
            {!loading && 'Send'}
        </Button>
    );
}

export default function NewMessagePopup(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [openError, setOpenError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [message, setMessage] = React.useState({
        ID: 0,
        senderID: 0,
        recieverID: 0,
        message: "",
        dateTime: "",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setLoading(false);
        setOpen(false);
        setOpenError(false);
    };

    const handleCloseError = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);

        message.senderID = props.senderID;
        message.recieverID = props.recieverID;
        message.dateTime = moment().format();

        console.log(message);
        var auth = JSON.parse(localStorage.getItem('authentication'));
        var response = "";
        await axios.post('https://kwekkerapigateway.azurewebsites.net/message', message, {
            headers: {
                "Content-Type": 'application/json', 'Accept': 'application/json', "Authorization": "Bearer " + auth.token
            }
        }).then(res => {
            console.log(res);
            response = res;
        }).catch(error => {
            console.log(error);
            setOpenError(true);
            setLoading(false);
        });

        if (response.data === "") {
            handleClose();
        }
        else {
            setOpenError(true);
            setLoading(false);
        }
    }

    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen} aria-label="add to favorites">
                <MailIcon />
            </IconButton>
            <Dialog className={classes.paper} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <div className={classes.root}>
                    <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError}>
                        <Alert onClose={handleCloseError} severity="error" variant="filled" className={classes.alert}>
                            An Error has occured.
                        </Alert>
                    </Snackbar>
                </div>
                <DialogTitle id="form-dialog-title">Send message to {props.profileName}</DialogTitle>
                <DialogContent>
                    <form onSubmit={(event) => handleSubmit(event)} >

                        <TextField
                            multiline
                            name="message"
                            variant="outlined"
                            required
                            fullWidth
                            rows={4}
                            id="message"
                            label="Message content"
                            onInput={e => message.message = e.target.value}
                            autoFocus
                        />

                        <ButtonComponent loading={loading} />

                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}