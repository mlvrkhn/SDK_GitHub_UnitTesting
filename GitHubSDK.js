const path = require('path');
const fetch = require("node-fetch");

// const regeneratorRuntime = require("regenerator-runtime");
import regeneratorRuntime from "regenerator-runtime";

const myToken = '82a95f5e8ca944aac848eecffda7d212bb5b2c5e'
const myUsername = 'mlvrkhn';
const myURL = 'https://api.github.com/users';


console.log('Class loaded!!!');
export default class GitHubSDK {
    constructor(url, token, username) {
        this.username = username;
        this.token = token;
        this.url = url;
        this.cors_api_host = 'https://cors-anywhere.herokuapp.com/';
    }
    displayData() {
        const cors = `${this.myURL}`
        console.log(cors);
    }
    getUserData() {
        // const response = fetch(`${this.cors_api_host}${this.url}`, {
        //     method: 'GET',
        //     headers: {
        //         Accept: 'application/vnd.github.v3+json',
        //         Authorization: `token ${myToken}`,
        //     }
        // }).then(resp => resp.json())
        //     .then(data => console.log(data))
        //     .catch(err => console.log('my Error: ' + err));
        const response = fetch(`${this.url}`)
            .then(resp => resp.json())
            .then(data => console.log(data))
            .catch(err => console.log('my Error: ' + err));
    }
};

// const x = new GitHubSDK(myURL, myToken, myUsername);
// x.displayData();

// module.exports = {
//     GitHubSDK
// }
