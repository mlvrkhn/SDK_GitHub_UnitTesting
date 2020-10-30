import GitHubSDK from './GitHubSDK';
import myData from './_token';
// const fetch = require("node-fetch");
import { expect } from '@jest/globals';

describe('tests for GitHubSDK class', () => {
    describe('GitHubSDK class exitence', () => {

        it('checks if the instance of a GitHubSDK class is created', () => {
            const api = new GitHubSDK(myData);
            expect(api).toBeInstanceOf(GitHubSDK);
        });

        it('throws if arguments are not passed', () => {
            expect.assertions(1);
            expect(() => {
                const api = new GitHubSDK();
            }).toThrow();
        });

    })
    describe('function getUserData()', () => {
        it('returns login ("mlvrkhn") if proper args passed', () => {
            async function createRequest() {
                const api = new GitHubSDK(myData);
                console.log("createRequest -> api", api)
                const resp = await api.getUserData();
                console.log("createRequest -> resp", resp)
            }
            // console.log('resp tests: ', resp);
            // expect(createRequest).toBe('mlvrkhn')

        });
        // it('resolves to truth if valid args passed', () => {

        // })
        // it('throws if invalid token passed', () => {

        // })
        // it('should include heroku at the beginning of url passet to fetch', () => {

        // })
    })
    
});