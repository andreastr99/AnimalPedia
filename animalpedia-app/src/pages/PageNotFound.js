import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './PageNotFound.css'; // You can create your own CSS file for custom styles

const PageNotFound = () => {
  return (
    <div className="container text-center mt-5 not-found-container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <h1 className="display-4 mb-4">Oops! Page Not Found</h1>
        <p className="lead mb-4">The requested page seems to be hiding in the jungle...</p>


          <Link to="/" className="btn btn-primary square-button text-dark shadow-sm" >
            Go back to home page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
