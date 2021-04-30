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
    },
    paper: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 400,
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
        marginRight: 10,
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
                <Container maxWidth="md" className={classes.container} >
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8} lg={8}>
                            <Grid
                                spacing={2}
                                direction="column"
                                container
                            >
                                <Grid item>
                                    <Paper className={classes.paper}  >
                                        <div style={{ display: "flex", flexDirection: "row" }}>
                                            <AccountIcon className={classes.accountIcon} />
                                            <TextField
                                                fullWidth
                                                multiline
                                                placeholder="What's on your mind?"
                                                variant="outlined" />
                                        </div>
                                        <div style={{ textAlign: "right" }}>
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

                                <Grid item>
                                    <Paper className={classes.paper}>
                                        Feed
                                    </Paper>
                                </Grid>

                            </Grid>
                        </Grid>

                        <Grid item xs={12} md={4} lg={4}>
                            <Paper className={fixedHeightPaper}>
                                Trends
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            </main>
        </div >
    );
}