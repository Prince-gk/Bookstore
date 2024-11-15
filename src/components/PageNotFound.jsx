import React from 'react';
import { Link } from 'react-router-dom';

function PageNotFound() {
    return (
        <div className="text-center mt-5">
            <h1 className="display-4">404</h1>
            <p className="lead">Oops! The page you're looking for doesn't exist.</p>
            <Link to="/" className="btn btn-primary">
                Go Back Home
            </Link>
        </div>
    );
}

export default PageNotFound;
