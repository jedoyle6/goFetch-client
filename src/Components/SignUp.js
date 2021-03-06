import React from 'react';
import './SignUp.css';
import { Link } from 'react-router-dom';
import ApiService from '../Helpers/ApiService';
import TokenService from '../Helpers/TokenService';
import GameContext from '../GameContext';

class SignUp extends React.Component {
    static contextType = GameContext;
    state = {
        error: null
    }

    handleSubmitSignup = (event) => {
        event.preventDefault();
        const { user_name, password, team_id } = event.target

        this.setState({ error: null })

        ApiService.postUser({
        user_name: user_name.value,
        password: password.value,
        team_id: team_id.value
        })
        .then(res => {
            user_name.value = ''
            password.value = ''
            team_id.value = ''
            TokenService.saveAuthToken(res.authToken);

            ApiService.getProfileData()
            .then(profileData => {
                const {user_name, total_points, team_id, rank, totalPlayers} = profileData;
                return this.context.asyncSetState({
                    user_name,
                    total_points,
                    team_id,
                    rank,
                    totalPlayers
                });
            })
        })
        .catch(res => {
            this.setState({ error: res.error})
        })
    }

    render() {

        return(
            <div className="signup-screen">
                <form className="signup-form" onSubmit={(event) => this.handleSubmitSignup(event)}>
                    <legend>Sign Up</legend>

                    <div>
                        <label className="signup-label" htmlFor="user_name">User Name:</label>
                        <input className="signup-text-input" type="text" name="user_name" id="user_name" required></input>
                    </div>

                    <div>
                    <label className="signup-label" htmlFor="password">Password:</label>
                    <input className="signup-text-input" type="password" name="password" id="password" required></input>
                    </div>

                    <div>
                        <label htmlFor="team_id" className="team-select-label">Pick Your Team:</label>

                        <div className="team-select-container">
                            <label htmlFor="terriers" className="team-name-label">Terrific Terriers</label>
                            <img src="./Images/Dogs/TerryTerrier_icon.png" alt="A Terrier in military uniform" className="teamicon"></img>
                            <input type="radio" name="team_id" id="terriers" value="1" required/>
                        </div>

                        <div className="team-select-container">
                            <label htmlFor="bulldogs" className="team-name-label">Bestest Bulldogs</label>
                            <img src="./Images/Dogs/BillyBulldog_icon.png" alt="A Bulldog wearing a coat and hat" className="teamicon"></img>
                            <input type="radio" name="team_id" id="bulldogs" value="2"/>
                        </div>

                        <div className="team-select-container">
                            <label htmlFor="poodles" className="team-name-label">Precious Poodles</label>
                            <img src="./Images/Dogs/PenelopePoodle_icon.png" alt="A Poodle wearing a frilly pink coat" className="teamicon"></img>
                            <input type="radio" name="team_id" id="poodles" value="3"/>
                        </div>
                    </div>

                    <p id="error-message">{this.state.error}</p>
                    <button type="submit">Submit</button>
                    <p>Already a member? <Link to='/login'>Log In</Link></p>
                </form>              
                
            </div>            
        );
    }
}

export default SignUp;