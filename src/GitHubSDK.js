const path = require('path');

export default class GitHubSDK {
    constructor({ login, token }) {
        this.url = 'https://api.github.com/';
        this.login = login;
        this.token = token;
        this.cors = 'https://cors-anywhere.herokuapp.com/';
        this._checkIfValidData(this.url, this.login, this.token);
    }
    getUserData() {
        const query = `users/${this.login}`;
        const apiURL = this._getURL(false, query);
        const options = {
            method: 'GET',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${this.token}`,
            },
        };
        return this._fetch(apiURL, options);
    }
    getPublicRepos(userToCheck = this.login, nrOfRepos = 4) {
        if (typeof userToCheck !== 'string' || typeof nrOfRepos !== 'number') {
            if (nrOfRepos < 1) {
                throw new Error('Number of repos must be minimum 1');
            } else {
                throw new Error('Invalid arguments!');
            }
        } else {
            const query = `users/${userToCheck}/repos?sort=updated&per_page=${nrOfRepos}`;
            const reposURL = this._getURL(false, query);
            const options = {
                method: 'GET',
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token ${this.token}`,
                },
            };
            return this._fetch(reposURL, options);
        }
    }
    toggleRepoPrivacy(repoName, ifPrivate) {
        if (typeof repoName !== 'string' || typeof ifPrivate !== 'boolean') {
            throw new Error('Invalid arguments passed');
        } else {
            const targetStatus = { private: `${ifPrivate}` };
            const query = `repos/${this.login}/${repoName}`;
            const repoURL = this._getURL(false, query);
            const options = {
                method: 'PATCH',
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token ${this.token}`,
                },
                body: JSON.stringify(targetStatus),
            };
            return this._fetch(repoURL, options);
        }
    }
    createRepo(repoData) {
        if (!repoData) {
            throw new Error('You did not passed new repository data');
        } else {
            const { name, description } = repoData;
            if (typeof name !== 'string' || typeof description !== 'string') {
                throw new Error('Invalid arguments passed');
            } else {
                const query = `user/repos`;
                const url = this._getURL(false, query);
                const body = {
                    name: `${name}`,
                    description: `${description}`,
                    private: true,
                };
                const options = {
                    method: 'POST',
                    headers: {
                        Accept: 'application/vnd.github.v3+json',
                        Authorization: `token ${this.token}`,
                    },
                    body: JSON.stringify(body),
                };
                return this._fetch(url, options);
            }
        }
    }
    deleteRepo(repoName) {
        const query = `repos/${this.login}/${repoName}`;
        const url = this._getURL(false, query);
        const options = {
            method: 'DELETE',
            headers: {
                Accept: 'application/vnd.github.v3+json',
                Authorization: `token ${this.token}`,
            },
        };
        return this._fetch(url, options).catch((err) =>
            console.log(`Error ${err} at url address: ${url}`)
        );
    }

    _checkIfValidData(url, login, token) {
        if (
            url === undefined ||
            login === undefined ||
            token == undefined ||
            typeof token !== 'string'
        ) {
            throw new Error('Missing parameters in instance creation');
        } else {
            return;
        }
    }
    _getURL(ifcors = false, query) {
        if (!ifcors) {
            return this.url + query;
        } else {
            return this.cors + this.url + query;
        }
    }
    _fetch(url, options) {
        return fetch(url, options).then((res) =>
            !res.ok
                ? Promise.reject('Promise rejected in _fetch()')
                : res.json()
        );
    }
}
