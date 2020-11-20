const path = require('path');
const fetch = require("node-fetch");
const regeneratorRuntime = require("regenerator-runtime");
export default class GitHubSDK {
    constructor({
        login,
        token,
    }) {
        this.url = 'https://api.github.com/';
        this.login = login;
        this.token = token;
        this.cors = 'https://cors-anywhere.herokuapp.com/';
        this._checkIfValidData(this.url, this.login, this.token);
    }
    getUserData() {
            const apiURL = this._getURL(false, 'users', this.login);
            const options = {
                method: 'GET', 
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token ${this.token}`
                }
            };
            return this._fetch(apiURL, options);
    };

    getPublicRepos(userToCheck = this.login, nrOfRepos = 4) {
        if (typeof userToCheck !== 'string' || typeof nrOfRepos !== 'number') {
            if (nrOfRepos < 1) {
                throw new Error('Number of repos must be minimum 1')
            } else {
                throw new Error('Invalid arguments!')
            }
        } else {
            const reposURL = this._getURL(false, 'users', userToCheck, 'repos');
            const query = `?sort=updated&per_page=${nrOfRepos}`
            const url = reposURL + query;
            const options = {
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token ${this.token}`
                }
            }
            return this._fetch(url, options);
        }
    };

    toggleRepoPrivacy(repoName, ifPrivate) {
        if (typeof repoName !== 'string' || typeof ifPrivate !== 'boolean') {
            throw new Error('Invalid arguments passed');
        } else {
            const targetStatus = { private: `${ifPrivate}` };
            const repoURL = this._getURL(false, 'repos', this.login, repoName);
            const options = {
                method: 'PATCH',
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `token ${this.token}`
                    },
                    body: JSON.stringify(targetStatus)
            }
            return this._fetch(repoURL, options);
        }
    }
    createRepo(repoData) {
        if (!repoData) {
            throw new Error('You did not passed new repository data')
        } else {
            const { name, description } = repoData;
            if (typeof name !== 'string' || typeof description !== 'string') {
                throw new Error('Invalid arguments passed');
            } else {
                const url = this._getURL(false, 'user', 'repos')
                const body = {
                    name: `${name}`,
                    description: `${description}`,
                    private: true
                };
                const options = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `token ${this.token}`
                    },
                    body: JSON.stringify(body)
                }
                return this._fetch(url, options)
            }
        }
    }

    deleteRepo(repoName) {
        const url = this._getURL(false, 'repos', this.login, repoName);
        const options = {
            method: 'DELETE',
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token ${this.token}`
                }
        }
        return this._fetch(url, options);
    }

    updateRepositoriesView(data) {
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
            repoHTML.textContent = `${html_url}`;
            repoHTML.setAttribute('href', html_url)
            repoCreatedAt.textContent = `Created at: ${created}`;
            repoUpdatedAt.textContent = `Updated at: ${updated}`;
            repoDescription.textContent = description;
            
            parent.appendChild(newElement);
        });
    }

    _checkIfValidData(url, login, token) {
        if (url === undefined || login === undefined || token == undefined || typeof token !== 'string') {
            throw new Error('Missing parameters in instance creation')
        } else {
            return;
        }
    }

    _getURL(ifcors = false, prefix, prop, val = '') {
        let apiURL = path.join(prefix, prop, val);

        if (!ifcors) {
            return this.url + apiURL
        } else {
            return this.cors + this.url + apiURL;
        }
    };

    _fetch(url, options) {
        return fetch(url, options)
            .then(res => (!res.ok) ? Promise.reject(res) : res.json());
    };
};