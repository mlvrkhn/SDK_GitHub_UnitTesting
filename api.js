import GitHubSDK from './GitHubSDK'
import myData from './token.js'


// ***************************
// ******* APP ***************
// ***************************
window.addEventListener('DOMContentLoaded', 
createUserInstance);

function createUserInstance() {
        const sdk = new GitHubSDK(myData);
        sdk.getUserData();
}
// sdk.getUserProfile();
// sdk.listPublicRepos();
// sdk.toggleRepoStatus();