import GitHubSDK from './src/GitHubSDK'
import { myData, newRepoData } from './src/_token.js'

window.addEventListener('DOMContentLoaded', createUserInstance);

function createUserInstance() {
    const sdk = new GitHubSDK(myData);

    sdk.getUserData().then(data => {
        _populateUserInfo(data);
    });
    sdk.getPublicRepos().then(resp => {
        _updateRepositoriesView(resp);
    });

    // create repo
    // sdk.createRepo(newRepoData)
    //     .then(resp => console.log('repo created: ', resp));

    // delete repo
    // sdk.deleteRepo('fakeRepo');
    // sdk.deleteRepo('toggletest');
};

function _populateUserInfo(data) {
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

function _updateRepositoriesView(repositories) {
    const protoSelector = 'repo__container-proto'
    const repoElement = document.querySelector('.' + protoSelector);
    const parent = repoElement.parentNode;

    repositories.forEach(repo => {
        const repoDOMElement = _createRepoContainer(repoElement);
        _populateRepoData(repoDOMElement, repo, parent)
    });
}

function _populateRepoData(element, data, root) {
    const {name, created_at, updated_at, html_url, description} = data;

    element.classList.remove('repo__container-proto');
    element.querySelector('.repo__title').textContent = `Name: ${name}`;        
    element.querySelector('.repo__html').textContent = `${html_url.slice(8)}`;
    element.querySelector('.repo__created-at').textContent = `Created at: ${created_at.slice(0, 10)}`;        
    element.querySelector('.repo__updated-at').textContent = `Updated at: ${updated_at.slice(0, 10)}`;        
    element.querySelector('.repo__description').textContent = description;

    root.appendChild(element);
}

function _createRepoContainer(proto) {
    return proto.cloneNode(true);
}