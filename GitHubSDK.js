const path = require('path');
const fetch = require("node-fetch");
const regeneratorRuntime = require("regenerator-runtime");


export default class GitHubSDK {
    constructor({
        url,
        login,
        token
    }) {
        this.url = url;
        this.login = login;
        this.token = token;
        this.cors_api_host = 'https://cors-anywhere.herokuapp.com/';
        this.checkIfValidData(this.url, this.login, this.token);
    }
    getUserData() {
        return new Promise((resolve, reject) => {
            const usersURL = `${this.url}${this.login}`;
            const response = fetch(usersURL, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `token ${this.token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        console.log('response not successfull');
                        reject(new Error(`HTTP Error ${response.status}`));
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    // console.log(data.login);
                    resolve(data);
                })
                .catch(err => console.log(err));
        })
    };
    checkIfValidData(url, login, token) {
        if (url === undefined || login === undefined || token == undefined) {
            throw new Error('Missing parameters in instance creation')
        }
    }
};


// list public repos
    // some code

    // toggle repo status (private-public)
    // some code

    // show activity
    // some code