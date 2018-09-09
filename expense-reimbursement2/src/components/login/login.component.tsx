import * as React from "react";
import { Link } from 'react-router-dom';


export class LoginComponent extends React.Component<any,any>{

    constructor(props: any) {
        super(props);
        this.state = {
          credentials: {
            password: '',
            username: '',
          },
          errorMessage: ''
        }
      }
    
      public passwordChange = (e: any) => {
        this.setState({
          ...this.state,
          credentials: {
            ...this.state.credentials,
            password: e.target.value
          }
        });
      }
    
      public usernameChange = (e: any) => {
        this.setState({
          ...this.state,
          credentials: {
            ...this.state.credentials,
            username: e.target.value
          }
        });
      }
    
      public submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch('http://localhost:3000/users/login', {
          body: JSON.stringify(this.state.credentials),
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST',
        })
          .then(resp => {
            console.log(resp.status)
            if (resp.status === 401) {
              this.setState({
                ...this.state,
                errorMessage: 'Invalid Credentials'
              });
            } else if (resp.status === 200) {
              return resp.json();
            } else {
              this.setState({
                ...this.state,
                errorMessage: 'Failed to Login at this time'
              });
            }
            throw new Error('Failed to login');
          })
          .then(resp => {
            localStorage.setItem('user', JSON.stringify(resp));
            if (resp.role==="MANAGER"){
                this.props.history.push('/manager');
            }
            else {
                this.props.history.push('/user')
            }
          })
          .catch(err => {
            this.setState({...this.state,
            errorMessage: 'Failed to login at this time'
            })
            console.log(err);
          });
      }


    public render(){
        const { errorMessage, credentials } = this.state;
        
        return(    
            <div className="col-4">
            <form className="form-signin" onSubmit={this.submit}>
              <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
              <label htmlFor="username" className="sr-only">Username</label>
              <input
              onChange={this.usernameChange}
              value={credentials.username}
              type="username"
              className="form-control"
              placeholder="Username"
              required />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input
                onChange={this.passwordChange}
                value={credentials.password}
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Password"
                required/>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
              {errorMessage && <p id="error-message">{errorMessage}</p>}
            </form>
            <p className="mt-5 mb-3">Are you a developer doing a presentation who needs a user?</p>
                <Link to="/register">
                <button className="btn btn-lg btn-primary btn-reg">Register</button>
                </Link>
            <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
          </div>
        )}
}