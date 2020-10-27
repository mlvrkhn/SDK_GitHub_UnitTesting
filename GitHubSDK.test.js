import GitHubSDK from './GitHubSDK';
import { expect } from '@jest/globals';


describe('GitHubSDK class exitence', () => {
    it('checks if the instance of a GitHubSDK class is created', () => {
        const api = new GitHubSDK('Name', 'Lastname');
        // console.dir(api)
        expect(api).toBeInstanceOf(GitHubSDK);
    });

    it('gets user data and ', async () => {
        const api = new GitHubSDK('https://api.github.com/users/');
        const respond = await api.getUserData();
        expect(respond).toBeInstanceOf(GitHubSDK);
    });
});