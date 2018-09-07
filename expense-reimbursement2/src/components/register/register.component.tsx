import * as React from 'react';
import { Link } from 'react-router-dom';

export class RegisterComponent extends React.Component<any,any> {
    constructor(props:any){
        super(props);
    }
    public render() {
        return (
            <div>
                <Link to="/login">
                <button className="btn btn-lg btn-primary btn-reg">complete</button>
                </Link>
            </div>
        );
    }
}
