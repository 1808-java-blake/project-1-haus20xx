import * as React from 'react';
import './App.css';
import './include/bootstrap';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends React.Component<any,any> {
  constructor(props:any){
    super(props);
    this.setState({

    });
  }

  public render() {
    return (
      <BrowserRouter>
      <div className="App row justify-content-center">
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
