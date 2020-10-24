import GitHubSDK from '../GitHubSDK.js';
import { expect } from '@jest/globals';


describe('GitHubSDK class exitence', () => {
    it('checks if the instance of a GitHubSDK class exists', () => {
        const api = new GitHubSDK();
        expect(api).toBeInstanceOf(GitHubSDK);
    });
})