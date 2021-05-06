import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Grid, Paper, Typography, Card, CardHeader, CardActions, CardContent, Avatar, IconButton, CardMedia } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import DeleteIcon from '@material-ui/icons/DeleteOutline';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { teal } from '@material-ui/core/colors'
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
        backgroundColor: teal[500],
    },
    messageCard: {

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

    async componentDidMount() {
        console.log("begin");

        var auth = JSON.parse(localStorage.getItem('authentication'));
        this.setState({ profileID: auth.profileID });

        //Hardcoded profileID later aanpassen.
        await axios.get('https://localhost:44344/message/recieved', {
            params: {
                profileId: this.state.profileID
            },
            headers: {
                "Authorization": "Bearer " + auth.token,
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.messages = res.data;
            this.setState({ gotMessages: true });

            if (this.messages.length > 0) {
                this.setState({ messagesnotnull: true });
            }

        }).catch(error => console.log(error));
        console.log("end");
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

                                        {this.messages.map(function (message, idx) {
                                            return (
                                                <Grid item xs={12} md={10} lg={9}>
                                                    <Card >
                                                        <CardHeader
                                                            avatar={
                                                                <Avatar aria-label="recipe" className={classes.avatar}>
                                                                    R
                                                            </Avatar>
                                                            }
                                                            action={
                                                                <IconButton aria-label="settings">
                                                                    <MoreVertIcon />
                                                                </IconButton>
                                                            }
                                                            title={"sender: " + message.senderID}
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

                                                            <NewMessagePopup senderID={profileID} recieverID={message.senderID} />
                                                        </CardActions>
                                                    </Card>
                                                </Grid>
                                            )
                                        })}
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