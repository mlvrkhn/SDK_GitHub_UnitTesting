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

        // Tutaj mam response, która zwraca obiekt Response. Pozniej muszę go przetłumaczyć na JSON (resp.json()),
        // a następnie juz mam obiekt DATA (jak nizej). Jak mogę zapisać sobie te dane
        // które chcę do programy? Tzn jak je wyłuskać z tego łancucha resp().then().catch()?

        const response = await fetch(usersURL, {
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token ${this.token}`
                }
            })
            .then(resp => resp.json())
            .then(data => {

                // czy powinienem sprawdzać w testach te wartości albo cokolwiek w data?
                // rozumiem ze nie skoro nie jest to moj kod?
                
                const { login, avatar_url, html_url, hireable, bio } = data;

                const imgAvatar = document.querySelector('.user_avatar');
                const userLogin = document.querySelector('.user_login');
                const userWebsite = document.querySelector('.user_homepage');
                const ifUserHireable = document.querySelector('.user_hireable');
                const userBio = document.querySelector('.user_bio');

                userLogin.innerText = login;
                userWebsite.innerHTML = html_url.slice(8);
                imgAvatar.setAttribute('src', avatar_url);
                ifUserHireable.innerHTML = `If hireable: ${hireable}`;
                userBio.innerHTML = bio;
            })
            .catch(err => console.log(err));
    }

    // Co myślisz o kolejnych metodach? Mają sens?

    // list public repos
        // some code

    // toggle repo status (private-public)
        // some code

    // show activity
        // some code
    
    
    // **** HELPING FUNCTIONS *******
    // Czy wszystkie funkcje wrzucać do klasy czy te dodatkowe lepiej trzymać poza?

    checkIfValidData(url, username, token) {
        if (url === undefined || username === undefined || token == undefined) {
            throw new Error('Missing parameters in instance creation')
        }
    }
};


