import GitHubSDK from './src/GitHubSDK'
import { myData, newRepoData } from './src/_token.js'

// ***************************
// ******* APP ***************
// ***************************

window.addEventListener('DOMContentLoaded', createUserInstance);

async function createUserInstance() {
    const sdk = new GitHubSDK(myData);

    const data = await sdk.getUserData();
    const repos = await sdk.getPublicRepos();
    const toggleRespond = await sdk.toggleRepoPrivacy('sketchpad', true);
    sdk.createRepo(newRepoData);

    populateUserInfo(data);
    updateRepositoriesView(repos);
}
function populateUserInfo(data) {
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
function updateRepositoriesView(data) {
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
// sdk.getUserProfile();
// sdk.listPublicRepos();
// sdk.toggleRepoStatus();