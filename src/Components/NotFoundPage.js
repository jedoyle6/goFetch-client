import React from 'react';
import { Link } from 'react-router-dom';
import './NotFoundPage.css';

class NotFoundPage extends React.Component {


    render() {
        return(
            <div className="notfound">
                <h1>Oops!</h1>
                <h2>404</h2>
                <p>We're sorry, it looks like the page you were looking for doesn't exist.</p>
                <Link to='/' className="notfound-link notfound">
                    <div className="notfound-button">
                        <i className="fas fa-home nav-icon"></i>
                        <p className="nav-label">Go Home</p>
                    </div>
                </Link>
            </div>
        );
    }
}

export default NotFoundPage;