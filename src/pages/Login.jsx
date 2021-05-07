import React from "react";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { withRouter } from 'react-router-dom';
import RegisterPopup from '../components/RegsiterPopup'
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
            confPassword: "",
            showError: false,
            helperText: "",
        };

        this.account = {
            email: "",
            password: "",
        };

    }

    navigateHome() {
        this.props.history.push('/');
    }

    async handleSubmit(event) {
        event.preventDefault();

        var result;

        console.log(this.account);
        await axios.post('https://localhost:44344/account/authenticate', this.account, {
            headers: {
                "Content-Type": 'application/json', 'Accept': 'application/json'
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            result = res.data;
        }).catch(error => console.log(error));

        if (result.accountID > 0) {

            var profileID = await this.fetchProfileID(result.accountID);

            var auth = {
                accountID: result.accountID,
                profileID: profileID,
                token: result.token,
            }

            console.log(auth);
            localStorage.setItem('authentication', JSON.stringify(auth));
            this.navigateHome();
        }
        else {
            console.log("Username or password is incorrect.");
        }
    }

    async fetchProfileID(accountID) {
        var profileID = 0;

        await axios.get('https://localhost:44344/profile/profileid', {
            params: {
                accountID: accountID,
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            profileID = res.data;
        }).catch(error => console.log(error));

        return profileID
    }

    render() {

        const { classes } = this.props;
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
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Sign In
                        </Button>
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
                    </form>
                </div>
            </Container>
        );
    }
}
export default (withRouter(withStyles(useStyles)(Login)))