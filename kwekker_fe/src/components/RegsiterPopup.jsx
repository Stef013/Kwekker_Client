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
    const [Repassword, setRePassword] = React.useState('');
    const [account, setAccount] = React.useState({
        email: " ",
        password: " ",
    });
    const [profile, setProfile] = React.useState({
        profileName: " ",
        userTag: " ",
    });


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event) {
        event.preventDefault();

        setProfile({
            profileName: event.target.profileName.value,
            userTag: event.target.userTag.value,
        })

        setAccount({
            email: event.target.email.value,
            password: event.target.password.value,
        })

        console.log(profile);
        console.log(profile.profileName);
        console.log(account);

        // const user = account;
        // account.nationality = country;

        // const user = account;
        // console.log(user);
        // console.log(country);

        // axios.post('http://localhost:5678/account/register', { user }).then(res => {
        //     console.log(res);
        //     console.log(res.data);
        // })

    }

    return (
        <div>
            <Link href="#" variant="body2" onClick={handleClickOpen}>
                Don't have an account? Sign Up
            </Link>
            <Dialog className={classes.paper} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Sign Up</DialogTitle>
                <DialogContent>
                    <form className={classes.form} noValidate onSubmit={(event) => handleSubmit(event)} >
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
                                    autoComplete="current-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="rpassword"
                                    label="Repeat Password"
                                    type="password"
                                    id="rpassword"
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