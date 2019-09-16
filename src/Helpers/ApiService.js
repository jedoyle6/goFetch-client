import config from '../config';
import TokenService from './TokenService';

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
    },

    reportGameScore (player_id, points) {
        return fetch(`${config.API_ENDPOINT}/gamelog`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
            body: JSON.stringify({player_id, points})
        })
        .then(res => 
            (!res.ok) 
            ? res.json().then(e => Promise.reject(e))
            : res.json()
        )
    },

    postLogin(credentials) {
        return fetch(`${config.API_ENDPOINT}/login`, {
          method:'POST',
          headers: {
            'content-type': 'application/json'
          },
          body: JSON.stringify(credentials)
        })
        .then(res => (!res.ok) ?
          res.json().then(e => Promise.reject(e)) : res.json())
    },

    postUser(user) {
        return fetch(`${config.API_ENDPOINT}/signup`, {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then(res =>
            (!res.ok)
              ? res.json().then(e => Promise.reject(e))
              : res.json()
          )
    },

    getProfileData () {
      return fetch(`${config.API_ENDPOINT}/profile`, {
          method: 'GET',
          headers: {
              'content-type': 'application/json',
              'Authorization': `Bearer ${TokenService.getAuthToken()}`
          },
      })
      .then(res => 
          (!res.ok) 
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
}

export default ApiService;