import React from "react";
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Grid, Paper, Typography, Card, CardHeader, CardActions, CardContent, Avatar, IconButton, CardMedia } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { teal } from '@material-ui/core/colors'
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
            gotMessages: false
        };

        this.messages = [];
    }

    async componentDidMount() {
        console.log("begin");

        var auth = JSON.parse(localStorage.getItem('authentication'));

        await axios.get('https://localhost:44344/messageproducer/recieved', {
            params: {
                profileId: 2
            },
            headers: {
                "Authorization": "Bearer " + auth.token,
            }
        }).then(res => {
            console.log(res);
            console.log(res.data);
            this.messages = res.data;
            this.setState({ gotMessages: true });
        }).catch(error => console.log(error));
        console.log("end");
    }

    render() {
        const { classes } = this.props;
        const { gotMessages } = this.state;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <MenuBar />
                <main className={classes.content}>
                    <div className={classes.appBarSpacer} />
                    {gotMessages ?
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
                                                            This impressive paella is a perfect party dish and a fun meal to cook together with your
                                                            guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                                  </Typography>
                                                    </CardContent>
                                                    <CardActions disableSpacing>
                                                        <IconButton aria-label="add to favorites">
                                                            <FavoriteIcon />
                                                        </IconButton>
                                                        <IconButton aria-label="share">
                                                            <ShareIcon />
                                                        </IconButton>


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