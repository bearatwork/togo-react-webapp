import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { AuthProvider } from './AuthContext'

import Login from "./constructors/loginWrapper";
import Todos from "./constructors/todos";
// import Header from "./constructors/header";

import ProtectedRoute from './protectedRoute'

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './content/css/App.css';

function App() {
  return (
    <Router>
      <AuthProvider>
        {/* <Header></Header> */}
        <Switch>
          <Route exact path="/" component={Login}/>
          <ProtectedRoute path="/todos" component={Todos} />
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App;
