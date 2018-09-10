import * as React from 'react';

export class ManagerMainComponent extends React.Component<any, any> {
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
            allReimbursements:[{}],
            reimbursements: [{}],
            user: userObject,
        }
    }
    public componentDidMount() {
        fetch('http://localhost:3000/reimbursements/', {
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
                    allReimbursements: resp,
                    reimbursements: resp,

                });
            })
            .catch(err => {
                console.log(err);
            })
    }
    public  updateTableSort(selection: string) {
        let newTable;
        switch (selection) {
            case "all":
                newTable = this.state.allReimbursements;
                break;
            case "pending":
                newTable = this.state.allReimbursements.filter((re: any) => {
                    if (re.status === "PENDING"){
                        return true;
                    }
                    else{
                        return false;
                    }
                })
                break;
            case "approved":
                newTable = this.state.allReimbursements.filter((re: any) => {
                    if (re.status === "APPROVED"){
                        return true;
                    }
                    else{
                        return false;
                    }
                })
                break;
            case "denied":
                newTable = this.state.allReimbursements.filter((re: any) => {
                    if (re.status === "DENIED"){
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                })
                break;
            default:
                break;
        }
        this.setState({
            ...this.state,
            reimbursements: newTable
        });
    }

    public render() {
        return (
            <div>
                <br />
                <br />
                <div className="btn-group btn-group-toggle" data-toggle="buttons" >
                    <label className="btn btn-secondary active" onClick={() => { this.updateTableSort("all") }}>
                        <input type="radio" name="options" autoComplete="off" defaultChecked /> All Requests
                     </label>
                    <label className="btn btn-secondary" onClick={() => { this.updateTableSort("pending") }}>
                        <input type="radio" name="options" autoComplete="off" /> Pending
                    </label>
                    <label className="btn btn-secondary" onClick={() => { this.updateTableSort("approved") }}>
                        <input type="radio" name="options" autoComplete="off" /> Approved
                    </label>
                    <label className="btn btn-secondary" onClick={() => { this.updateTableSort("denied") }}>
                        <input type="radio" name="options" autoComplete="off" /> Denied
                    </label>
                </div>
                <table className="table table-hover table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Ticket #</th>
                            <th scope="col">Creator</th>
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
                                    <td>{reimb.author}</td>
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
            </div>
        );
    }
}