const myToken = '82a95f5e8ca944aac848eecffda7d212bb5b2c5e'
const fetch = require("node-fetch");
const myUsername = 'mlvrkhn';
const myURL = 'https://api.github.com/users';


export default class GitHubSDK {
    constructor(url, token, username) {
        this.username = username;
        this.token = token;
        this.url = url;
        this.cors_api_host = 'cors-anywhere.herokuapp.com';
    }
    displayData() {
        const cors = `${this.myURL}/${this.myUsername}`
        console.log(cors);
    }
    async getUserData() {
        const response = await fetch(`${this.url}`, {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${myToken}`,
            }
        });
        response
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(err => console.log('my Error: ' + err));
    }
};



const x = new GitHubSDK(myURL, myToken, myUsername);
x.displayData()
x.getUserData();

// export.modules = {
//     GitHubSDK
// }