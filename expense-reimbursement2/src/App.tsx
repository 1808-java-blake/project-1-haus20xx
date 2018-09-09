import * as React from 'react';
import './App.css';
import './include/bootstrap';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { UserMainComponent } from './components/main-page/user.main.component';
import { ManagerMainComponent } from './components/main-page/manager.main.component';


class App extends React.Component<any,any> {
  constructor(props:any){
    super(props);
  }

  public render() {
    return (
      <BrowserRouter >
      <div className="App row justify-content-center coin-bg">
        <Switch>
          <Route path='/login' component={LoginComponent}/>
          <Route path='/register' component={RegisterComponent}/>
          <Route path='/user' component={UserMainComponent}/>
          <Route path='/manager' component={ManagerMainComponent}/>
          <Route  component={LoginComponent}/>
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
