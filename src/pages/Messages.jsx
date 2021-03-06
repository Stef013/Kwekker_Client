import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Grid, Typography, Card, CardHeader, CardActions, CardContent, Avatar, IconButton, CardMedia } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import MoreVertIcon from '@material-ui/icons/MoreVert';
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
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    },
    avatar: {
        backgroundColor: "#03dac5",
    }
});

class Messages extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            gotMessages: false,
            messagesnotnull: false,
            profileID: 0,
        };

        this.messages = [];
    }

    async getProfileNames() {
        for (var i = 0; i < this.messages.length; i++) {
            await axios.get('https://kwekkerapigateway.azurewebsites.net/profile/profileName', {
                params: {
                    profileId: this.messages[i].senderID
                }
            }).then(res => {
                console.log(res);
                console.log(res.data);
                this.messages[i].profileName = res.data;
            }).catch(error => console.log(error));
        }
    }

    async componentDidMount() {
        var auth = JSON.parse(localStorage.getItem('authentication'));
        this.setState({ profileID: auth.profileID });

        await axios.get('https://kwekkerapigateway.azurewebsites.net/message/recieved', {
            params: {
                profileId: auth.profileID
            },
            headers: {
                "Authorization": "Bearer " + auth.token,
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.messages = res.data;
        }).catch(error => console.log(error));

        if (this.messages.length > 0) {

            await this.getProfileNames();
            this.setState({ messagesnotnull: true });
            console.log(this.messages);
        }

        this.setState({ gotMessages: true });
    }

    render() {
        const { classes } = this.props;
        const { gotMessages, profileID, messagesnotnull } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <MenuBar />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    {gotMessages ?
                        messagesnotnull ?
                            (
                                <Container maxWidth="md" className={classes.container} >
                                    <Grid container spacing={2}>

                                        {this.messages.reverse().map(function (message, idx) {
                                            return (
                                                <Grid item xs={12} md={10} lg={9}>
                                                    <Card >
                                                        <CardHeader
                                                            avatar={
                                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                                    {message.profileName.charAt(0)}
                                                                </Avatar>
                                                            }
                                                            action={
                                                                <IconButton aria-label="settings">
                                                                    <MoreVertIcon />
                                                                </IconButton>
                                                            }
                                                            title={message.profileName}
                                                            subheader={new Date(message.dateTime).toLocaleDateString() + " " + new Date(message.dateTime).toLocaleTimeString()}
                                                        />
                                                        <CardMedia
                                                            className={classes.media}
                                                            title="Paella dish"
                                                        />

                                                        <CardContent>
                                                            <Typography variant="body2" color="textSecondary" component="p">
                                                                {message.message}
                                                            </Typography>
                                                        </CardContent>
                                                        <CardActions disableSpacing>
                                                            <IconButton color="secondary" aria-label="add to favorites">
                                                                <DeleteIcon />
                                                            </IconButton>

                                                            <NewMessagePopup senderID={profileID} recieverID={message.senderID} profileName={message.profileName} />
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            )
                                        }, this)}
                                    </Grid>
                                </Container>
                            )
                            :
                            (
                                <Typography align="center" color="textSecondary" variant="h4" style={{ marginTop: 350 }}  >
                                    You have no messages yet.
                                </Typography>
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

export default withRouter(withStyles(useStyles)(Messages));