import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import beach from '../assets/images/jungle.jpg'

const PageNotFound = () => {
  return (
    <div
      className="text-center"
      style={{
        backgroundImage: `url(${beach})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="display-4 mb-4">Oops! Page Not Found</h1>
            <p className="lead mb-4">
              The requested page seems to be hiding in the jungle...
            </p>
            <Link
              to="/"
              className="btn btn-dark square-button text-light shadow-sm"
            >
              Go back to the home page
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
