import GitHubSDK from './GitHubSDK';
import myData from './_token';
// const fetch = require("node-fetch");
import {
    expect
} from '@jest/globals';

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


        it('works with promises', () => {
            expect.assertions(1);
            
            const api = new GitHubSDK(myData);
            const res = api.getUserData();
            // response not successfull
            return expect(res).resolves.toEqual('mlvrkhn')
            // return res.then(data => expect(data.login).toEqual('mlvrkhn'));
        });
        // it('throws if invalid token passed', () => {

        // })
        // it('should include heroku at the beginning of url passet to fetch', () => {

        // })
    })

});