import './App.css';
import Login from './pages/Login';
import Home from './pages/Home';
import Error from './pages/Error';
import PrivateRoute from './components/PrivateRoute';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/Login" component={Login} />
        <PrivateRoute exact path="/" component={Home} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
