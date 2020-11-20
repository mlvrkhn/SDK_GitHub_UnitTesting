import GitHubSDK from './src/GitHubSDK'
import { myData, newRepoData } from './src/_token.js'

window.addEventListener('DOMContentLoaded', createUserInstance);

function createUserInstance() {
    const sdk = new GitHubSDK(myData);

    sdk.getUserData().then(data => {
        _populateUserInfo(data);
    });
    sdk.getPublicRepos().then(resp => {
        sdk.updateRepositoriesView(resp);
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