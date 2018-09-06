import React, { Component } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
        <Switch>
          <Route path='/login' component={LoginComponent}/>
          <Route path='/register' component={RegisterComponent}/>
          <Route component={LoginComponent}/>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
