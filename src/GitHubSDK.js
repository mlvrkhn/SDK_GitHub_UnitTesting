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
        this._checkIfValidData(this.url, this.login, this.token);
    }
    getUserData() {
        return new Promise((resolve, reject) => {
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
                        resolve(response.json());
                    }
                })
                .catch(err => console.log(err));
        })
    };
    getPublicRepos(userToCheck = this.login, nrOfRepos = 5) {
        if (typeof userToCheck !== 'string' || typeof nrOfRepos !== 'number') {
            throw new Error('Invalid arguments!')
        } else {
            return new Promise((resolve, reject) => {
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
                            resolve(res.json())
                        }
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
        }
    };

    toggleRepoPrivacy(repoName, ifPrivate) {
        return new Promise((resolve, reject) => {

            if (typeof repoName !== 'string' || typeof ifPrivate !== 'boolean') {
                reject(new Error('Invalid arguments passed'));
            } else {
                const targetStatus = { private: `${ifPrivate}` };
                const sketchpadURL = 'https://api.github.com/repos/mlvrkhn/sketchpad';

                fetch(sketchpadURL, {
                        method: 'PATCH',
                        headers: {
                            Accept: 'application/vnd.github.v3+json',
                            Authorization: `token ${this.token}`
                        },
                        body: JSON.stringify(targetStatus)
                    })
                    .then(resp => {
                        return resp.json();
                    })
                    .then(data => {
                        resolve(data);
                    });
            }
        })
    }

    createRepo(repoData) {
        return new Promise((resolve, reject) => {

            if (!repoData) {
                throw new Error('You did not passed new repository data')
            } else {
                const { name, description } = repoData;

                if (typeof name !== 'string' || typeof description !== 'string') {
                    reject(new Error('Invalid arguments passed'));
                } else {
                    const url = `${this.url}user/repos`;
                    const obj = {
                        name: `${name}`,
                        description: `${description}`
                    };

                    fetch(url, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/vnd.github.v3+json',
                                Authorization: `token ${this.token}`
                            },
                            body: JSON.stringify(obj)
                        })
                        .then(resp => {
                            const rep = resp.json();
                            return rep;
                        })
                        .then(data => {
                            resolve(data);
                        });
                }
            }
        })
    }

    _checkIfValidData(url, login, token) {
        if (url === undefined || login === undefined || token == undefined) {
            throw new Error('Missing parameters in instance creation')
        } else {
            return;
        }
    }

    _populateUserInfo(data) {
        const { avatar_url, html_url, hireable, bio, login } = data;
        const imgAvatar = document.querySelector('.user_avatar');
        const userLogin = document.querySelector('.user_login');
        const userWebsite = document.querySelector('.user_homepage');
        const ifUserHireable = document.querySelector('.user_hireable');
        const userBio = document.querySelector('.user_bio');
        
        userLogin.innerText = login;
        userWebsite.innerText = html_url.slice(8);
        imgAvatar.setAttribute('src', avatar_url);
        ifUserHireable.innerText = `If hireable: ${hireable}`;
        userBio.innerText = bio;
    };

    _updateRepositoriesView(data) {
        const protoSelector = 'repo__container-proto'
        const repoElement = document.querySelector('.' + protoSelector);

        data.forEach(repo => {
            const {name, created_at, updated_at, html_url, description} = repo;        
            const newElement = repoElement.cloneNode(true);
            newElement.classList.remove(protoSelector)

            const created = created_at.slice(0, 10);
            const updated = updated_at.slice(0, 10);
            const repoTitle = newElement.querySelector('.repo__title');        
            const repoHTML = newElement.querySelector('.repo__html');
            const repoCreatedAt = newElement.querySelector('.repo__created-at');        
            const repoUpdatedAt = newElement.querySelector('.repo__updated-at');        
            const repoDescription = newElement.querySelector('.repo__description');        
            const parent = repoElement.parentNode;

            repoTitle.textContent = `Name: ${name}`;
            repoHTML.textContent = `WWW: ${html_url}`;
            repoHTML.setAttribute('href', html_url)
            repoCreatedAt.textContent = `Created at: ${created}`;
            repoUpdatedAt.textContent = `Updated at: ${updated}`;
            repoDescription.textContent = description;
            
            parent.appendChild(newElement);
        });
    }
};