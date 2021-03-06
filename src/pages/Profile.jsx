import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Grid, Paper, Typography, Card, CardHeader, Avatar } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { teal } from '@material-ui/core/colors'
import MenuBar from '../components/MenuBar';
import BackgroundImage from '../images/profile_background.png';
import AccountIcon from '@material-ui/icons/AccountCircle';
import NewMessagePopup from '../components/NewMessagePopup'
import axios from 'axios';

const useStyles = (theme) => ({
    root: {
        display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    profileBackground: {
        height: 250,
        backgroundImage: `url(${BackgroundImage})`,
    },
    profileInfo: {
        paddingLeft: theme.spacing(3),
        marginTop: 20,
    },
    accountIcon: {
        height: 150,
        width: 150,
        position: "absolute",
        marginTop: -25,
        marginBottom: -25,
    },
    iconMargin: {
        position: "absolute",
        marginTop: -75,
        marginBottom: -75,
        paddingLeft: theme.spacing(1),
    },
    avatar: {
        backgroundColor: teal[500],
    },
    card: {
        marginTop: 10,
        height: 70,
    }
});

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gotProfile: false,
            profile: [],
            profiles: [],
        };
    }

    async componentDidMount() {

        var auth = JSON.parse(localStorage.getItem('authentication'));

        await axios.get('https://kwekkerapigateway.azurewebsites.net/profile/account', {
            params: {
                accountID: auth.accountID
            },
            headers: {
                "Authorization": "Bearer " + auth.token,
            }
        }).then(res => {
            this.setState({ profile: res.data });
            
        }).catch(error => console.log(error));

        if(this.state.profile != null)
        {
            await axios.get('https://kwekkerapigateway.azurewebsites.net/profile/profiles', {
            params: {
                profileID: auth.profileID
            },
            headers: {
                "Authorization": "Bearer " + auth.token,
            }
            }).then(res => {
                this.setState({ profiles: res.data });
            }).catch(error => console.log(error));
        
            this.setState({ gotProfile: true });
        }
    }

    render() {
        const { classes } = this.props;
        const { gotProfile, profile, profiles } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <MenuBar />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    {gotProfile ?
                        (
                            <Container maxWidth="md" className={classes.container}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <Paper>
                                            <Grid container spacing={3}>
                                                <Grid item xs={12}>
                                                    <Container className={classes.profileBackground}>
                                                    </Container>
                                                </Grid>
                                                <Grid item xs={12} >
                                                    <Container className={classes.iconMargin}>
                                                        <AccountIcon className={classes.accountIcon} />
                                                    </Container>
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Container className={classes.profileInfo}>
                                                        <Typography variant="h5">{profile.profileName}</Typography>
                                                        <Typography color="textSecondary">{profile.userTag}</Typography>
                                                        <Typography style={{ marginTop: 15 }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</Typography>
                                                        <div style={{ display: "flex", flexDirection: "row", marginTop: 15 }}>
                                                            <Typography style={{ marginRight: 20 }}>0 Following</Typography>
                                                            <Typography >0 Followers</Typography>
                                                        </div>
                                                    </Container>

                                                </Grid>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                    <Grid item xs={12} md={8} lg={8} style={{ marginTop: 5 }}>
                                        <Grid
                                            spacing={2}
                                            direction="column"
                                            container
                                        >
                                            <Grid item>
                                                <Paper className={classes.paper}>
                                                    New Kwek
                                                </Paper>
                                            </Grid>

                                            <Grid item>
                                                <Paper className={classes.paper}>
                                                    Kweks
                                                </Paper>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                   
                                    <Grid item xs={12} md={4} lg={4} style={{ marginTop: 5 }}>
                                        <Paper className={classes.paper}>
                                            Suggestions
                                            
                                            {profiles.map(function (p) {
                                                return(
                                             <Grid item >
                                                 <Card className={classes.card}>
                                                     <CardHeader
                                                        avatar={
                                                            <Avatar aria-label="recipe" className={classes.avatar}>
                                                                {p.profileName.charAt(0)}
                                                            </Avatar>
                                                        }
                                                        action={
                                                            <NewMessagePopup senderID={profile.id} recieverID={p.id} profileName={p.profileName} />
                                                        }
                                                        title={p.profileName}
                                                        subheader={p.userTag}
                                                    />
                                                </Card>
                                             </Grid>
                                             ) 
                                        })}
                                        </Paper>
                                    </Grid>

                                </Grid>
                            </Container>
                        )
                        :
                        (
                            <Typography align="center" color="textSecondary" variant="h4" style={{ marginTop: 350 }}  >
                                Loading...
                            </Typography>
                        )
                    }
                </main>
            </div>
        );
    }
}

export default withRouter(withStyles(useStyles)(Profile));