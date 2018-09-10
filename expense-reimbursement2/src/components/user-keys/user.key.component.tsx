import * as React from 'react';


export class UserKeyComponent extends React.Component<any,any> {
    constructor(props:any){
        super(props);
        this.state = {
            users:[{}]
        }
    }
    public componentDidMount(){
        fetch('http://localhost:3000/users/', {
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
            this.setState({
                ...this.state,
                users: resp
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
                            <th scope="col">First Name</th>
                            <th scope="col">Last Name</th>
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
                                        <td>{user.firstname}</td>
                                        <td>{user.lastname}</td>
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
