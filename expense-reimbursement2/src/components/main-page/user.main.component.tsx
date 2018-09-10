import * as React from 'react';
import { ManagerKeyComponent } from '../user-keys/manager.key.component';

export class UserMainComponent extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        const userHolder = localStorage.getItem('user');
        let userObject;

        if (userHolder) {
            userObject = JSON.parse(userHolder);
        }
        else {
            userObject = {};
        }

        this.state = {
            amount: 0,
            currentError: "",
            description: "",
            reimbursements: [{}],
            type: "OTHER",
            user: userObject
        };
    }
    public componentDidMount() {
        fetch('http://localhost:3000/reimbursements/' + this.state.user.id, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET',
        })
            .then(resp => {
                return resp.json();
            })
            .then(resp => {
                this.setState({
                    ...this.state,
                    reimbursements: resp
                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    public amountChange = (e:any) =>{
        this.setState({
            ...this.state,
            amount:e.target.value
        })
    }
    public descriptionChange = (e:any)=>{
        this.setState({
            ...this.state,
            description: e.target.value
        })
    }
    public typeChange = (e:any)=>{
        this.setState({
            ...this.state,
            type:e.target.value
        })
    }
    public submitReimbursement = () => {
        fetch('http://localhost:3000/reimbursements/',{
            body: JSON.stringify({
            amount:this.state.amount,
            author: this.state.user.id,
            description:this.state.description,
            type: this.state.type
        }),
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
        })
        .then(()=>{
        this.componentDidMount();
        }
        )
        .then(()=>{
        this.setState({
            ...this.state,
            amount:0,
            description:"",
            type:"OTHER"
        })
        })
        .catch(err=>{
            console.log(err);
        })
    }
    public logout = () => {
        fetch('http://localhost:3000/users/logout', {
            credentials: 'include',
            method: 'POST'
        })
            .then(() => {
                localStorage.setItem('user', "");
                this.setState({
                    ...this.state,
                    user: ""
                });
                this.props.history.push('/login');
            })
            .catch(err => {
                console.log(err);
            })
    }

    public render() {
        return (
            <div>
                <br/>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Ticket #</th>
                            <th scope="col">Reimbursement Amount</th>
                            <th scope="col">Submitted</th>
                            <th scope="col">Resolved</th>
                            <th scope="col">Resolver ID</th>
                            <th scope="col">Description</th>
                            <th scope="col">Type</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.reimbursements.map((reimb: any) => (
                                <tr key={reimb.id}>
                                    <td>{reimb.id}</td>
                                    <td>{reimb.amount}</td>
                                    <td>{reimb.submittedTS}</td>
                                    <td>{reimb.resolvedTS}</td>
                                    <td>{reimb.resolver}</td>
                                    <td>{reimb.description}</td>
                                    <td>{reimb.type}</td>
                                    <td>{reimb.status}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
                {(Object.keys(this.state.user).length !== 0)
                    && (<button type="button" className="btn btn-secondary btn-lg btn-block" data-toggle="modal" data-target="#exampleModal">
                        Submit a Request
                 </button>)}
                <br/>
                <ManagerKeyComponent/>
                <br/>
                <button type="button" className="btn btn-primary btn-sm btn-red" onClick={this.logout}>Logout</button>


                <div className="modal fade" id="exampleModal" tabIndex={-1} role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Reimbursement Form</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Amount
                                <div className="form-group row">
                                    <label htmlFor="example-number-input" className="col-2 col-form-label">$</label>
                                    <div className="col-10">
                                        <input className="form-control" type="number" value={this.state.amount} id="example-number-input"
                                        onChange={this.amountChange} />
                                    </div>
                                </div>
                                Type
                                <select className="form-control" onChange={this.typeChange} value={this.state.type}>
                                    <option value="OTHER">Other</option>
                                    <option value="LODGING">Lodging</option>
                                    <option value="TRAVEL">Travel</option>
                                    <option value="FOOD">Food</option>
                                </select>
                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1" rows={3} onChange={this.descriptionChange} value={this.state.description} required></textarea>
                                </div>
                                <button type="button" className="btn btn-secondary btn-red" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.submitReimbursement} >Submit Reimbursement</button>
                            </div>
                            <div className="modal-footer">

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}