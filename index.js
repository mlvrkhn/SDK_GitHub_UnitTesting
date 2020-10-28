
const myData = {
    token: '82a95f5e8ca944aac848eecffda7d212bb5b2c5e',
    login: 'mlvrkhn',
    url: 'https://api.github.com/'
}
const sdk = new GitHubSDK(myData);


sdk.getUserProfile();
sdk.listPublicRepos();
sdk.toggleRepoStatus();