import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import MenuBar from './components/MenuBar'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#03dac5"
    },

  }
})

// const useStyles = makeStyles((theme) => ({
//   appBarSpacer: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     height: '100vh',
//     overflow: 'auto',
//   },
// }));

// const classes = useStyles();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />

    </BrowserRouter>
  </ThemeProvider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
