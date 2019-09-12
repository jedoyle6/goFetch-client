import config from '../config';

const ApiService ={
    getPlayerLeaderboard () {
        return fetch(`${config.API_ENDPOINT}/leaderboard/player`)
        .then(res => 
            (!res.ok) 
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

    getTeamLeaderboard () {
        return fetch(`${config.API_ENDPOINT}/leaderboard/team`)
        .then(res => 
            (!res.ok) 
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    }
}

export default ApiService;