import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        '& .MuiDialog-paper': {
            padding: 20,
            paddingBottom: 25,
            maxWidth: 620,
        },
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));


export default function RegisterPopup() {
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [confPassword, setConfPassword] = React.useState('');
    const [showError, setShowError] = React.useState(false);
    const [helperText, setHelperText] = React.useState();
    const [account, setAccount] = React.useState({
        ID: 0,
        email: " ",
        password: " ",
    });
    const [profile, setProfile] = React.useState({
        ID: 0,
        accountID: 0,
        profileName: " ",
        userTag: " ",
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function checkPasswords() {
        if (account.password == confPassword) {
            console.log(account.password)
            console.log(confPassword)
            return true;
        }
        else {
            setShowError(true);
            setHelperText("Passwords don't match!")
            console.log(account.password)
            console.log(confPassword)
            return false;
        }
    }

    async function checkEmail() {
        var emailExists = true;

        console.log("checkemail");

        await axios.get('https://kwekkerapigateway.azurewebsites.net/account/email', { params: { email: account.email } })
            .then(res => {
                console.log(res);
                console.log("emailcheck: " + res.data);
                emailExists = res.data;
            })
            .catch(error => {
                console.log(error)
            });

        return emailExists;
    }

    async function checkUserTag() {
        var tagExists = true;

        console.log("checktag");

        await axios.get('https://kwekkerapigateway.azurewebsites.net/profile/userTag', { params: { usertag: profile.userTag } })
            .then(res => {
                console.log(res);
                console.log("tagcheck: " + res.data);
                tagExists = res.data;
            })
            .catch(error => {
                console.log(error)
            });

        return tagExists;
    }

    async function handleSubmit(event) {
        event.preventDefault();

        if (checkPasswords()) {

            var emailExists = await checkEmail();
            var tagExists = await checkUserTag();;

            if (!emailExists && !tagExists) {

                var result = false;

                await axios.post('https://kwekkerapigateway.azurewebsites.net/account', account, {
                    headers: {
                        "Content-Type": 'application/json', 'Accept': 'application/json'
                    }
                }).then(res => {
                    console.log(res);
                    console.log(res.data);

                    result = res.data.success;
                    profile.accountID = res.data.accountID;
                }).catch(error => console.log(error));

                if (result) {

                    await axios.post('https://kwekkerapigateway.azurewebsites.net/profile/', profile, {
                        headers: {
                            "Content-Type": 'application/json', 'Accept': 'application/json'
                        }
                    }).then(res => {
                        console.log(res);
                        console.log(res.data);
                        handleClose();
                    }).catch(error => console.log(error));
                }
            }
            else {
                console.log("Email or usertag already exist");
            }
        }
    }

    return (
        <div>
            <Link href="#" variant="body2" onClick={handleClickOpen}>
                Don't have an account? Sign Up
            </Link>
            <Dialog className={classes.paper} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                <DialogContent>
                    <form className={classes.form} onSubmit={(event) => handleSubmit(event)} >
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="username"
                                    name="profileName"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="profileName"
                                    label="Profile name"
                                    onInput={e => profile.profileName = e.target.value}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="userTag"
                                    label="@Usertag"
                                    name="userTag"
                                    onInput={e => profile.userTag = e.target.value}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    onInput={e => account.email = e.target.value}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    onInput={e => account.password = e.target.value}
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="confPassword"
                                    label="Confirm Password"
                                    type="password"
                                    id="confPassword"
                                    helperText={helperText}
                                    error={showError}
                                    onInput={e => setConfPassword(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign Up
                         </Button>
                        <Grid container justify="flex-end">
                            <Grid item>

                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        </div >
    );
}