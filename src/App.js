import './App.css';
import Login from './pages/Login'
import Home from './pages/Home'
import Error from './pages/Error'
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/home" component={Home} />
        <Route component={Error} />
      </Switch>
    </main>
  );
}

export default App;
