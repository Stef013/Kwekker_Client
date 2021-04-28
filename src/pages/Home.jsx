import React from 'react';
import clsx from 'clsx';
import { fade, makeStyles, createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import AccountIcon from '@material-ui/icons/AccountCircle';
import { Grid, Paper, Container, TextField, Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import MenuBar from '../components/MenuBar'

const useStyles = makeStyles((theme) => ({
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
        paddingLeft: theme.spacing(10),
        paddingRight: theme.spacing(10),
    },
    paper: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(2),
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
    submit: {
        width: 100,
        borderRadius: 25,
        marginTop: 15,
    },
    accountIcon: {
        height: 60,
        width: 60,
        color: "#03dac5",
    }
}));

export default function Home() {
    const classes = useStyles();
    const history = useHistory();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

    return (
        <div className={classes.root}>
            <CssBaseline />
            <MenuBar />
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <Container maxWidth="xl" className={classes.container}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={8} lg={8}>
                            <Paper className={classes.paper}  >
                                <Grid container spacing={3}>
                                    <Grid item xs={2} md={1} lg={1} style={{textAlign:"right"}}>
                                        <AccountIcon className={classes.accountIcon}/>
                                    </Grid>
                                    <Grid item xs={10} md={11} lg={11}>
                                    <TextField 
                                        fullWidth
                                        multiline
                                        placeholder="What's on your mind?"
                                        variant="outlined" />
                                    </Grid>
                                </Grid>

                                <div style={{textAlign: "right"}}>
                                    <Button 
                                        className={classes.submit}
                                        variant="contained"
                                        color="primary"
                                    >
                                        Kwek
                                    </Button>
                                    </div>
                            </Paper>
                        </Grid>
                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={classes.paper}>
                                Trends
                                
                            </Paper>
                        </Grid>
                        <Grid item xs={12}>
                            <Paper className={classes.paper}>
                                Feed
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div>
    );
}