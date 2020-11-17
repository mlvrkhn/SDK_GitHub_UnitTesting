const path = require('path');
const fetch = require("node-fetch");
const regeneratorRuntime = require("regenerator-runtime");


export default class GitHubSDK {
    constructor({
        url,
        login,
        token,
        cors
    }) {
        this.url = url;
        this.login = login;
        this.token = token;
        this.cors = cors;
        this._checkIfValidData(this.url, this.login, this.token);
    }
    getUserData() {
        return new Promise((resolve, reject) => {
            const apiURL = this._getURL(false, 'users', this.login);

            fetch('https://api.github.com/users/mlvrkhn', {
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
    getPublicRepos(userToCheck = this.login, nrOfRepos = 4) {
        if (typeof userToCheck !== 'string' || typeof nrOfRepos !== 'number') {
            if (nrOfRepos < 1) {
                throw new Error('Number of repos must be minimum 1')
            } else {
                throw new Error('Invalid arguments!')
            }
        } else {
            return new Promise((resolve, reject) => {
                const reposURL = this._getURL(false, 'users', userToCheck, 'repos');
                const query = `?sort=updated&per_page=${nrOfRepos}`
                const finalURL = reposURL + query;

                fetch(finalURL, {
                        method: 'GET',
                        headers: {
                            Accept: 'application/vnd.github.v3+json',
                            Authorization: `token ${this.token}`
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
                const repoURL = this._getURL(false, 'repos', this.login, repoName);

                fetch(repoURL, {
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
                    const url = this._getURL(false, 'user', 'repos')
                    const obj = {
                        name: `${name}`,
                        description: `${description}`,
                        private: true
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
            repoHTML.textContent = `${html_url}`;
            repoHTML.setAttribute('href', html_url)
            repoCreatedAt.textContent = `Created at: ${created}`;
            repoUpdatedAt.textContent = `Updated at: ${updated}`;
            repoDescription.textContent = description;
            
            parent.appendChild(newElement);
        });
    }
    _getURL(ifcors = false, prefix, prop, val = '') {
        let apiURL = path.join(prefix, prop, val);

        if (!ifcors) {
            return this.url + apiURL
        } else {
            return this.cors + this.url + apiURL;
        }
    };
    _deleteRepo(repoName) {
        const deleteURL = this._getURL(false, 'repos', this.login, repoName);

        // const body = {
        //     name: repoName
        // }
        fetch(deleteURL, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/vnd.github.v3+json',
                    Authorization: `token ${this.token}`
                }
        })
        .then(resp => console.log(resp));
    }
};