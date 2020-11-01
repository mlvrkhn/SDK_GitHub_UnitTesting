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

    // difficulties getting auth. Perhaps GH doesnt accept regular token for updating the repo? I can toggle the privacy STATUS via cur and postman, but I only can set from public to private. After I get an error.

    toggleRepoPrivacy(repoName, ifPrivate) {
        return new Promise((resolve, reject) => {
            
            if (typeof repoName !== 'string' || typeof ifPrivate !== 'boolean') {
                console.log('toggle rejected');
                reject(new Error('Invalid arguments passed'));
            } else {
                console.log('toggle through');
                const targetStatus = { private: `${ifPrivate}` };
                const reposPrefix = 'repos';
                const usersUrlCors = `${this.cors_api_host}${this.url}${reposPrefix}/${this.login}/${repoName}`;
                const usersUrl = `${this.url}${reposPrefix}/${this.login}/${repoName}`;
                const usersUrlQuery = `${this.url}${reposPrefix}/${this.login}/${repoName}?private=${ifPrivate}`;


                const mediaType = 'application/api.github.v3+json';
                const mediaTypePreview = 'application/vnd.github.nebula-preview+json';

                const postmanURL = 'https://api.github.com/repos/mlvrkhn/sketchpad';
                const postmanURLCors = 'https://cors-anywhere.herokuapp.com/https://api.github.com/repos/mlvrkhn/sketchpad';
    
                fetch(postmanURL, {
                    method: 'PATCH',
                    header: {
                        Accept: 'application/api.github.v3+json',
                        Authorization: `token ${this.token}`
                    },
                    body: {
                        private: true
                    }
                })
                    .then(resp => {
                        const rep = resp.json();
                        console.log('resp.json(): ', rep);
                        return rep;
                    })
                    .then(data => {
                        console.log(data);
                        resolve(data);
                    });
            }
        })
    }

    createRepo(repoName, ifPrivate) {
        return new Promise((resolve, reject) => {
            if (typeof repoName !== 'string' || typeof ifPrivate !== 'boolean') {
                console.log('toggle rejected');
                reject(new Error('Invalid arguments passed'));
            } else {
                console.log('toggle through');
                const targetStatus = { private: `${ifPrivate}` };
                const reposPrefix = 'repos';
                const usersUrlCors = `${this.cors_api_host}${this.url}${reposPrefix}/${this.login}/${repoName}`;
                const usersUrl = `${this.url}${reposPrefix}/${this.login}/${repoName}`;
                const usersUrlQuery = `${this.url}${reposPrefix}/${this.login}/${repoName}?private=${ifPrivate}`;

                const mediaType = 'application/api.github.v3+json';
                const mediaTypePreview = 'application/vnd.github.nebula-preview+json';

                const postmanURL = 'https://api.github.com/repos/mlvrkhn/sketchpad';
                const postmanURLCors = 'https://cors-anywhere.herokuapp.com/https://api.github.com/repos/mlvrkhn/sketchpad';
    
                fetch(postmanURL, {
                    method: 'PATCH',
                    header: {
                        Accept: 'application/api.github.v3+json',
                        Authorization: `token ${this.token}`
                    },
                    body: {
                        private: true
                    }
                })
                    .then(resp => {
                        const rep = resp.json();
                        console.log('resp.json(): ', rep);
                        return rep;
                    })
                    .then(data => {
                        console.log(data);
                        resolve(data);
                    });
            }
        })
    }

    checkIfValidData(url, login, token) {
        if (url === undefined || login === undefined || token == undefined) {
            throw new Error('Missing parameters in instance creation')
        } else {
            return;
        }
    }
};