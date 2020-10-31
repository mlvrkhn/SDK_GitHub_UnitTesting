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
    // describe('function getUserData()', () => {

    //     it('expected to return login - "mlvrkhn"', async () => {
    //         expect.assertions(1);
    //         const api = new GitHubSDK(myData);
    //         const res = await api.getUserData();
    //         expect(res.login).toBe('mlvrkhn')
    //     });

    //     it('throws if wrong invalid arguments passed', async () => {
    //         expect.assertions(1);

    //         try {
    //             const fakeData = {
    //                 token: 'xzy',
    //                 login: 'mlvrkhn',
    //                 url: 'https://api.github.com/users/'
    //             }
    //             const api = new GitHubSDK(fakeData);
    //             const res = await api.getUserData();
    //         } catch (error) {
    //             expect(error).toEqual(Error('HTTP Error'))
    //         }
    //     })
    // })
    describe('function getPublicRepos()', () => {
        
        it('throws if invalid arguments passed to getPublicRepos()', async () => {
            expect.assertions(1);
            try {
                const api = new GitHubSDK(myData);
                const res = await api.getPublicRepos('string', 'string2');
            } catch (e) {
                expect(e).toEqual(Error('Invalid arguments!'))
            }
        });

        it('returns object with 2 items', async () => {
            expect.assertions(1);

            // async function fetchTenItems() {
            const sdk = new GitHubSDK(myData);
            const repos = await sdk.getPublicRepos('kevwil', 2);
            return expect(repos.length).toBe(2);

        });
    })
});