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
    const myURL = 'https://api.github.com/users';


    createUserInstance(myURL, myUsername, myToken);
}
// **** INIT *******
export default class GitHubSDK {
    constructor(url, username, token) {
        this.username = username;
        this.token = token;
        this.url = url;
        this.cors_api_host = 'https://cors-anywhere.herokuapp.com/';
    }
    async getUserData() {
        const usersURL = path.join(this.cors_api_host, this.url);
        console.log(usersURL);
        const usersURL1 = `${this.cors_api_host}${this.url}`;
        console.log(usersURL1)

        const response = await fetch(usersURL1, {
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
};


// **** HELPING FUNCTIONS *******
function createUserInstance(url, username, token) {
    const sdk = new GitHubSDK(url, username, token);
    sdk.getUserData();
    // console.log(sdk);
}
