import React from "react";
import { Avatar, CircularProgress, Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Grid, Typography, Container, Snackbar } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { withStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import RegisterPopup from '../components/RegsiterPopup'
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

const useStyles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
});

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            openError: false,
        };

        this.account = {
            email: "",
            password: "",
        };
    }

    navigateHome() {
        this.props.history.push('/');
    }

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        this.setState({ openError: false });
    };

    async handleSubmit(event) {
        event.preventDefault();
        this.setState({ loading: true });

        var result;

        console.log(this.account);
        await axios.post('https://kwekkerapigateway.azurewebsites.net/account/authenticate', this.account, {
            headers: {
                "Content-Type": 'application/json', 'Accept': 'application/json'
            }
        }).then(res => {
            result = res.data;
        }).catch(error => console.log(error));

        if (result.accountID > 0) {

            var profileID = await this.fetchProfileID(result.accountID);

            var auth = {
                accountID: result.accountID,
                profileID: profileID,
                token: result.token,
            }

            localStorage.setItem('authentication', JSON.stringify(auth));
            this.setState({ loading: false });
            this.navigateHome();
        }
        else {
            this.setState({ openError: true });
            this.setState({ loading: false });
        }
    }

    async fetchProfileID(accountID) {
        var profileID = 0;

        await axios.get('https://kwekkerapigateway.azurewebsites.net/profile/profileid', {
            params: {
                accountID: accountID,
            }
        }).then(res => {
            profileID = res.data;
        }).catch(error => console.log(error));

        return profileID
    }

    render() {
        const { classes } = this.props;
        const { loading, openError } = this.state;
        return (
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>

                    <div className={classes.root}>
                        <Snackbar open={openError} autoHideDuration={6000} onClose={this.handleClose}>
                            <Alert onClose={this.handleClose} severity="error" variant="filled" className={classes.alert}>
                                Username or password is incorrect.
                             </Alert>
                        </Snackbar>
                    </div>
                    <form className={classes.form} onSubmit={(event) => this.handleSubmit(event)}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            onInput={e => this.account.email = e.target.value}
                            autoFocus
                        />
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            onInput={e => this.account.password = e.target.value}
                            autoComplete="current-password"
                        />

                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />

                        <Button type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            disabled={loading}>
                            {loading && <CircularProgress size={25} />}
                            {!loading && 'SIGN IN'}
                        </Button>
                    </form>
                    <Grid container>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid item>
                            <RegisterPopup />
                        </Grid>
                    </Grid>

                </div>
            </Container>
        );
    }
}
export default (withRouter(withStyles(useStyles)(Login)))