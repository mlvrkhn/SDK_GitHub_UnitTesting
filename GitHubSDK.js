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
        // this.checkIfValidData(this.url, this.login, this.token);
    }
    getUserData() {
        return new Promise((resolve, reject) => {
            const usersURL = `${this.cors_api_host}${this.url}users/${this.login}`;
            const usersURLnoCors = `${this.url}users/${this.login}`;
            console.log("GitHubSDK -> getUserData -> usersURLnoCors", usersURLnoCors)
            

            fetch(usersURLnoCors, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `token ${this.token}`
                    }
                })
                .then(response => {
                    if (!response.ok) {
                        reject(new Error(`HTTP Error`));
                    } else {
                        return response.json();
                    }
                })
                .then(data => {
                    resolve(data);
                })
                .catch(err => console.log(err));
        })
    };
    getPublicRepos(userToCheck = this.login, nrOfRepos = 5) {
        if (typeof userToCheck !== 'string' || typeof nrOfRepos !== 'number') {
            throw new Error('Invalid arguments!')
        } else {

            return new Promise((resolve, reject) => {
                const reposURL = `${this.cors_api_host}${this.url}users/${userToCheck}/repos?sort=updated&per_page=${nrOfRepos}`;
                const reposURLnoCors = `${this.url}users/${userToCheck}/repos?sort=updated&per_page=${nrOfRepos}`;
        
                fetch(reposURLnoCors, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `token ${this.token}`,
                    }
                })
                .then(res => {
                    if (!res.ok) {
                        reject(new Error('Fetching unsuccessfull'));
                    } else {
                        return res.json()
                    }
                })
                .then(data => {
                    resolve(data)
                })
                .catch(err => {
                    console.log(err);
                })
            })
        }
    }
    toggleRepoPrivacy(repoName, ifPrivate) {
        if (typeof repoName !== 'string' || typeof ifPrivate !== 'boolean') {
            throw new Error('Invalid arguments passed')
        } else {
            console.log('else');
            const targetStatus = {
                private: `${ifPrivate}`
            }
            const reposPrefix = 'repos'
            const usersURL = `${this.cors_api_host}${this.url}${reposPrefix}/${this.login}/${repoName}`;
            console.log("GitHubSDK -> toggleRepoPrivacy -> usersURL", usersURL)
            const usersURLnoCors = `${this.url}${reposPrefix}/${this.login}/${repoName}`;; 
            console.log("GitHubSDK -> toggleRepoPrivacy -> usersURLnoCors", usersURLnoCors)

            
            fetch(usersURLnoCors, {
                method: 'PUT',
                header: {
                    Accept: 'application/api.github.v3+json',
                    Authorization: `token ${this.token}`,
                },
                body: JSON.stringify(targetStatus)
            })
            .then(resp => resp.json())
            .then(data => console.log(data));
        }
    }

    checkIfValidData(url, login, token) {
        if (url === undefined || login === undefined || token == undefined) {
            throw new Error('Missing parameters in instance creation')
        } else {
            return;
        }
    }
};

    // show activity
    // some code