import GitHubSDK from './GitHubSDK';
// const fetch = require("node-fetch");
import { expect } from '@jest/globals';


describe('tests for GitHubSDK class', () => {
    describe('GitHubSDK class exitence', () => {

        it('checks if the instance of a GitHubSDK class is created', () => {
            const api = new GitHubSDK('url','login', 'token');
            expect(api).toBeInstanceOf(GitHubSDK);
        });

        it('throws if parameters are not passed', async () => {
            function createClassInstance() {
                const api = new GitHubSDK();
                console.log('hejka');
            };
            return createClassInstance();

            expect(respond).toBeInstanceOf(GitHubSDK);

        });

    })


    // it('throws if parameters are not passed', async () => {
    //         const api = new GitHubSDK('Martin', 'Gawlyta');
    //         const respond = await api.getUserData();
    //         expect(respond).toBeInstanceOf(GitHubSDK);
    //     });
    
    // describe('function getUserData()', () => {
    //     it('returns user data and converts into txt', () => {

    //     })
    //     it('throws error if invalid token passed', () => {

    //     })
    //     it('throws error if invalid token passed', () => {

    //     })
    // })
    
});