import * as React from "react";
import { Link } from 'react-router-dom';


export class LoginComponent extends React.Component<any,any>{

    constructor(props:any){
        super(props);
    }
    public render(){
        return(
            <div className="text-center sign-page">
                hello
                < img src={'../../img/logo.png'} alt="" height="70" width="70"/>
            <form className="form-signin">
                    <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
                    <label htmlFor="inputEmail" className="sr-only">Username</label>
                    <input id="inputEmail" className="form-control" placeholder="Username" required autoFocus/>
                        <label htmlFor="inputPassword" className="sr-only">Password</label>
                        <input type="password" id="inputPassword" className="form-control" placeholder="Password"
                               required/>
                            <button className="btn btn-lg btn-primary btn-block">Sign test in</button>
            </form>
                <p className="mt-5 mb-3">Not a user?</p>
                <Link to="/register">
                <button className="btn btn-lg btn-primary btn-reg">Register</button>
                </Link>
                <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
            </div>

        )}
}