import GitHubSDK from './src/GitHubSDK'
import { myData, newRepoData } from './src/_token.js'

window.addEventListener('DOMContentLoaded', createUserInstance);

function createUserInstance() {
    const sdk = new GitHubSDK(myData);

    sdk.getUserData().then(data => {
        sdk._populateUserInfo(data);
    });

    sdk.getPublicRepos().then(resp => {
        sdk._updateRepositoriesView(resp);
    });
    
    // toggling privacy and creating new repo are commented not to hit the API all the time
    // const toggleRespond = sdk.toggleRepoPrivacy('sketchpad', false);
    // sdk.createRepo(newRepoData);
};