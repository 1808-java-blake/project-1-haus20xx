import * as React from 'react';
import { Link } from 'react-router-dom';

export const UserNavComponent: React.StatelessComponent<{}> = () => {
  return (
    <div>
      <nav className="navbar navbar-toggleable-md navbar-expand-lg navbar-light bg-light display-front nav-pad">
        <div className="navbar-header c-pointer shift-left">
          <Link to="/user" className="unset-anchor">
            <img className="img-adjust-position rev-logo" src="" alt="revature" />
          </Link>
        </div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample04" aria-controls="navbarsExample04" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarsExample04">
          <ul className="navbar-nav ml-auto margin-nav">
            <li className="nav-item active">
              <Link to="/user" className="unset-anchor nav-link">Home</Link>
            </li>
            <li className="nav-item active">
              <Link to="/user/submit" className="unset-anchor nav-link">Submit a new Reimbursement</Link>
            </li>
            <li className="nav-item active">
              <Link to="/user/view" className="unset-anchor nav-link">View Reimbursements</Link>
            </li>
            <li className="nav-item active">
              <Link to="/logout" className="unset-anchor nav-link">logout</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div >
  );
}