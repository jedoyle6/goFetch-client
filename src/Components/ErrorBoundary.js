import React from 'react';
import { Link } from 'react-router-dom';
import './ErrorBoundary.css';

class ErrorBoundary extends React.Component {
    state = {hasError: false}

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return(
                <div className="error-bound">
                    <h1>Oops!</h1>
                    <h2>An Error Occured</h2>
                    <p>We're sorry, something went wrong. Please refresh the page and try again.</p>
                    <Link to='/' className="notfound-link notfound">
                        <div className="notfound-button">
                            <i className="fas fa-home nav-icon"></i>
                            <p className="nav-label">Go Home</p>
                        </div>
                    </Link>
                </div>
        )}
        return this.props.children;
    }
}

export default ErrorBoundary;