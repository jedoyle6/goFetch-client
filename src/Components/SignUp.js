import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';

class SignUp extends React.Component {
    state = {
        error: false,
        message: ''
    }

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submitted!');
    }

    render() {

        return(
            <div className="signup-screen">
                <form className="signup-form" onSubmit={(event) => this.handleSubmit(event)}>
                    <legend>Sign Up</legend>

                    <div>
                        <label className="signup-label" htmlFor="user_name">User Name:</label>
                        <input className="signup-text-input" type="text" name="user_name" id="user_name" required></input>
                    </div>

                    <div>
                    <label className="signup-label" htmlFor="password">Password:</label>
                    <input className="signup-text-input" type="text" name="password" id="password" required></input>
                    </div>

                    <div>
                        <label htmlFor="team" className="team-select-label">Pick Your Team:</label>

                        <div className="team-select-container">
                            <label htmlFor="terriers">Terrific Terriers</label>
                            <img src="./Images/Dogs/TerryTerrier_icon.png" alt="A Terrier in military uniform" className="teamicon"></img>
                            <input type="radio" name="team" id="terriers" value="1" required/>
                        </div>

                        <div className="team-select-container">
                            <label htmlFor="bulldogs">Bestest Bulldogs</label>
                            <img src="./Images/Dogs/BillyBulldog_icon.png" alt="A Bulldog wearing a coat and hat" className="teamicon"></img>
                            <input type="radio" name="team" id="bulldogs" value="2"/>
                        </div>

                        <div className="team-select-container">
                            <label htmlFor="poodles">Precious Poodles</label>
                            <img src="./Images/Dogs/PenelopePoodle_icon.png" alt="A Poodle wearing a frilly pink coat" className="teamicon"></img>
                            <input type="radio" name="team" id="poodles" value="3"/>
                        </div>
                    </div>

                    <p id="error-message">{this.state.message}</p>
                    <button type="submit">Submit</button>
                    <p>Already a member? <Link to='/login'>Log In</Link></p>
                </form>              
                
            </div>            
        );
    }
}

export default SignUp;