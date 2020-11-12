import GitHubSDK from './src/GitHubSDK';
import { myData } from './src/_token';

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

        it('expected to return login - "mlvrkhn"', async () => {
            expect.assertions(1);

            const api = new GitHubSDK(myData);
            const res = await api.getUserData();
            expect(res.login).toBe('mlvrkhn')
        });

        it('throws if wrong invalid arguments passed', async () => {
            expect.assertions(1);

            try {
                const fakeData = {
                    token: 'xzy',
                    login: 'mlvrkhn',
                    url: 'https://api.github.com/users/'
                }
                const api = new GitHubSDK(fakeData);
                const res = await api.getUserData();
            } catch (error) {
                expect(error).toEqual(Error('HTTP Error'))
            }
        })
    })

    describe('function getPublicRepos()', () => {

        it('throws if invalid arguments passed to getPublicRepos()', async () => {
            expect.assertions(1);
            try {
                const api = new GitHubSDK(myData);
                await api.getPublicRepos('string', 'string2');
            } catch (e) {
                expect(e).toEqual(Error('Invalid arguments!'))
            }
        });

        it('returns object with 2 items', async () => {
            expect.assertions(1);
            const sdk = new GitHubSDK(myData);
            const repos = await sdk.getPublicRepos('kevwil', 2);
            return expect(repos.length).toBe(2);
        });

        it('will throw if undefined is passed into method', async () => {
            expect.assertions(1);
            try {
                await sdk.getPublicRepos([], 2);
            } catch (e) {
                expect(e).toEqual(ReferenceError('sdk is not defined'))
            }
        });
    })

    describe('function toggleRepoPrivacy()', () => {

        it('throws if args are not passed', async () => {
            expect.assertions(1);
            
            try {
                const sdk = new GitHubSDK(myData);
                await sdk.toggleRepoPrivacy();
            } catch (e) {
                expect(e).toEqual(Error('Invalid arguments passed'));
            }
        });

        it('throws incorrect arguments', async () => {
            expect.assertions(1);
            
            try {
                const sdk = new GitHubSDK(myData);
                await sdk.toggleRepoPrivacy(10, 'text');
            } catch (e) {
                expect(e).toEqual(Error('Invalid arguments passed'));
            }
        })
        
        it('resolves with owner login equal to mlvrkhn', async () => {
            expect.assertions(1);

            try {
                const sdk = new GitHubSDK(myData);
                await sdk.toggleRepoPrivacy('sketchpad', true).then(resp => {
                    expect(resp.owner.login).toEqual('mlvrkhn')});
            } catch (error) {
                console.log(error);
            }
        });
    })

    describe('function createRepo', () => {

        it('throws if argument if name is not privided', async () => {
            expect.assertions(1);

            try {
                const git = new GitHubSDK(myData);
                await git.createRepo();
            } catch (error) {
                expect(error).toEqual(Error('You did not passed new repository data'))
            }
        });

        it('throws if argument are not type string', async () => {
            expect.assertions(1);

            try {
                const git = new GitHubSDK(myData);
                await git.createRepo(11, 12);
            } catch (error) {
                expect(error).toEqual(Error('Invalid arguments passed'))
            }
        });

        it('throws if only one argument passed', async () => {
            expect.assertions(1);

            try {
                const git = new GitHubSDK(myData);
                await git.createRepo('12');
            } catch (error) {
                expect(error).toEqual(Error('Invalid arguments passed'))
            }
        });
    });

});