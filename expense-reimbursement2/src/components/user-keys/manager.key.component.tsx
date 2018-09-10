import * as React from 'react';
import { environment } from '../../environment';


export class ManagerKeyComponent extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {
            users:[{}]
        }
    }
    public componentDidMount(){
        fetch(environment+'/users/', {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
        .then((resp)=>{
           return resp.json();
        })
        .then((resp)=>{

            const onlyAdmins:any = [];
            resp.map((user:any)=>{
                if (user.role === "MANAGER"){
                    onlyAdmins.push(user);
                }
            })
            this.setState({
                ...this.state,
                users: onlyAdmins
            })
        }) 
    }
    public render() {
        return (
            <div>
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">User ID</th>
                            <th scope="col" >Username</th>
                            <th scope="col">Email</th>
                            <th scope="col">Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.users.map((user: any) => {
                                return (
                                    <tr key={user.id} className="table-info">
                                        <td>{user.id}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        );
    }
}
