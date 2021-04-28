import React from 'react';
import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Error from './pages/Error';
import PrivateRoute from './components/PrivateRoute';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <PrivateRoute exact path="/" component={Home} title="Home" />
        <Route exact path="/Login" component={Login} title="Login" />
        <PrivateRoute exact path="/Profile" component={Profile} title="Profile" />
        <Route component={Error} title="Error" />
      </Switch>
    </main>
  );
}

export default App;
