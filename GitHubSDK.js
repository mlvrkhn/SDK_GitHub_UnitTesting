const path = require('path');
const fetch = require("node-fetch");
const regeneratorRuntime = require("regenerator-runtime");

// ***************************
// ******* APP ********
// ***************************

window.addEventListener('DOMContentLoaded', init);

// **** INIT *******
function init() {
    const myToken = '82a95f5e8ca944aac848eecffda7d212bb5b2c5e'
    const myUsername = 'mlvrkhn';
    const myURL = 'https://api.github.com/users/';


    createUserInstance(myURL, myUsername, myToken);
}

function createUserInstance(url, username, token) {
        const sdk = new GitHubSDK(url, username, token);
        sdk.getUserData();
        console.log(sdk);
}

// **** INIT *******
export default class GitHubSDK {
    constructor(url, username, token) {
        this.url = url;
        this.username = username;
        this.token = token;
        this.cors_api_host = 'https://cors-anywhere.herokuapp.com/';
        this.checkIfValidData(this.url, this.username, this.token);
    }
    async getUserData() {
        const usersURL = `${this.cors_api_host}${this.url}${this.username}`;
        const response = await fetch(usersURL, {
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token ${this.token}`
                }
            })
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log(err));
    }
    // list public repos
    // some code

    // toggle repo status (private-public)
    // some code
    
    
    // **** HELPING FUNCTIONS *******

    checkIfValidData(url, username, token) {
        if (url === undefined || username === undefined || token == undefined) {
            throw new Error('Missing parameters in instance creation')
        }
    }
};


