import GitHubSDK from './src/GitHubSDK';
import myData from './src/_token';
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
            try {
                const sdk = new GitHubSDK(myData);
                sdk.toggleRepoPrivacy();
            } catch (e) {
                expect(e).toEqual(Error('Invalid arguments passed'));
            }
        })

        it('resolves if repo status is set to private', async () => {

            function toggleRepo() {
                const sdk = new GitHubSDK();
                const respond = sdk.toggleRepoPrivacy('codenotes_martin', true);
                console.log(respond);
                return respond
            }
            await expect(toggleRepo()).toReturn();
        })

        it ('resolves to set status to private (true)', async () => {
            expect.assertions(1);
    
            const repoName = 'sketchpad';
            const ifPrivate = true;
            const github = new GitHubSDK(myData);
            const res = await github.toggleRepoPrivacy('sktechpad', true);
            console.log('res', res);
            return expect(res).toReturn();
        });
    })

    })

    describe('function createRepo', () => {

        it ('throws if argument if name is not privided', async () => {
            expect.assertions(1);

            await expect(() => {
                const git = new GitHubSDK(myData);
                const resp = git.createRepo();                
            }).toThrow(); 
        });

        it ('resolves and returns "example_repo"', async () => {
            expect.assertions(1)

            const newRepoData = {
                name: "example_repo",
                description: "this is test repo for GitHubSDK"
            }

            await function createFakeRepo() {
                const git = new GitHubSDK(myData);
                const resp = git.createRepo(newRepoData);
                return resp;
            }
            return createFakeRepo().then(resp => expect(resp.name).toBe('example_repo'));
        });
    });











