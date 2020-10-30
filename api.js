import GitHubSDK from './GitHubSDK'
import myData from './_token.js'

// ***************************
// ******* APP ***************
// ***************************

window.addEventListener('DOMContentLoaded', createUserInstance);

async function createUserInstance() {
    const sdk = new GitHubSDK(myData);
    const data = await sdk.getUserData();
    populateUserInfo(data);
}
function populateUserInfo(data) {
    console.log(data);
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
}
// sdk.getUserProfile();
// sdk.listPublicRepos();
// sdk.toggleRepoStatus();