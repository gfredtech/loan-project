import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import 'antd/dist/antd.css';

export const JWT_KEY = '__jwt_';
export const BASE_API_URL = 'https://loan-backend.herokuapp.com';
// export const BASE_API_URL = 'http://localhost:5000';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/login" component={Login} />
      </Switch>
    </Router>
  );
}

export default App;
