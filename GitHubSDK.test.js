import GitHubSDK from './GitHubSDK';
// const fetch = require("node-fetch");
import { expect } from '@jest/globals';


describe('tests for GitHubSDK class', () => {
    describe('GitHubSDK class exitence', () => {

        it('checks if the instance of a GitHubSDK class is created', () => {
            const api = new GitHubSDK('url', 'login', 'token');
            expect(api).toBeInstanceOf(GitHubSDK);
        });

        it('throws if arguments are not passed', () => {
            expect.assertions(1);
        
            expect(() => {
                const api = new GitHubSDK();
            }).toThrow('Missing parameters in instance creation');
        });

    })
    // describe('function getUserData()', () => {
    //     it('fetches and returns user login from API', () => {

    //     })
    //     // it('throws if invalid token passed', () => {

    //     // })
    //     // it('should include heroku at the beginning of url passet to fetch', () => {

    //     // })
    // })
    
});