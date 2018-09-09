import * as React from 'react';

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
            reimbursements: [{}],
            user: userObject
        };
    }
    public componentDidMount() {
        console.log('the state is ' + this.state.user);
        console.log('the state has value ' + this.state.user.id);
        fetch('http://localhost:3000/reimbursements/' + this.state.user.id, {
            body: JSON.stringify(this.state.credentials),
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
                console.log('err');
            })
    }
    public render() {
        return (
            <div>
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

                <button type="button" className="btn btn-secondary btn-lg btn-block" data-toggle="modal" data-target="#exampleModal">
                    Submit a Request
                </button>

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
                                ...
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-primary">Submit Reimbursement</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}