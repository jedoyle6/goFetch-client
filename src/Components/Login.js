import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

class Login extends React.Component {
    state = {
        error: false,
        message: ''
    }

    handleSubmitLogin = (event) => {
        event.preventDefault();
        console.log('Submitted!');
    }

    render() {

        return(
            <div className="login-screen">
                <form className="login-form" onSubmit={(event) => this.handleSubmitLogin(event)}>
                    <legend>Log In</legend>

                    <div>
                        <label className="login-label" htmlFor="user_name">User Name:</label>
                        <input className="login-text-input" type="text" name="user_name" id="user_name"></input>
                    </div>

                    <div>
                    <label className="login-label" htmlFor="password">Password:</label>
                    <input className="login-text-input" type="text" name="password" id="password"></input>
                    </div>
                    <p id="error-message">{this.state.message}</p>
                    <button type="submit">Submit</button>
                    <p>or <Link to='/signup'>Sign Up</Link></p>
                </form>              
                
            </div>            
        );
    }
}

export default Login;