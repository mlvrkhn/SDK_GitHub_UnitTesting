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
    describe('function getUserData()', () => {
        it('returns login if proper args passed', async () => {
            const token = '82a95f5e8ca944aac848eecffda7d212bb5b2c5e'
            const username = 'mlvrkhn';
            const url = 'https://api.github.com/users/';

            const sdk = new GitHubSDK(url, username, token);
            const data = sdk.getUserData();
            console.log(data);
            expect(data).toBe('mlvrkhn')
            }
        )
        // it('resolves to truth if valid args passed', () => {

        // })
        // it('throws if invalid token passed', () => {

        // })
        // it('should include heroku at the beginning of url passet to fetch', () => {

        // })
    })
    
});