import GitHubSDK from './GitHubSDK';
import { expect } from '@jest/globals';


describe('tests for GitHubSDK', () => {
    describe('GitHubSDK class exitence'() => {

        it('checks if the instance of a GitHubSDK class is created', () => {
            const api = new GitHubSDK('Name', 'Lastname');
            console.dir(api)
            expect(api).toBeInstanceOf(GitHubSDK);
        });

        it('gets user data and ', asyc() => {
            const api = new GitHubSDK('Martin', 'Gawlyta');
            const respond = await api.getUserData();
            expect(respond).toBeInstanceOf(GitHubSDK);
        });

    })
    describe('function getUserData()', () => {
        it('returns user data and converts into txt', () => {

        })
        it('throws error if invalid token passed', () => {

        })
        it('throws error if invalid token passed', () => {

        })
    })
    
});