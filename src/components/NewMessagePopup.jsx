import React from 'react';
import { Button, IconButton, TextField, Dialog, DialogContent, DialogTitle, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/MailOutline';
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


export default function NewMessagePopup(props) {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [showError, setShowError] = React.useState(false);
    const [helperText, setHelperText] = React.useState();
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
        setOpen(false);
    };

    async function handleSubmit(event) {
        event.preventDefault();

        message.senderID = props.senderID;
        message.recieverID = props.recieverID;
        message.dateTime = moment().format();

        console.log(message);
        var auth = JSON.parse(localStorage.getItem('authentication'));

        await axios.post('https://kwekkerapigateway.azurewebsites.net/message', message, {
            headers: {
                "Content-Type": 'application/json', 'Accept': 'application/json', "Authorization": "Bearer " + auth.token
            }
        }).then(res => {
            console.log(res);
            handleClose();
        }).catch(error => console.log(error));
    }

    return (
        <div>
            <IconButton color="primary" onClick={handleClickOpen} aria-label="add to favorites">
                <MailIcon />
            </IconButton>
            <Dialog className={classes.paper} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Send
                         </Button>

                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}