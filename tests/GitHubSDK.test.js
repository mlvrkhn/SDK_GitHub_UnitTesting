import {
    myData,
    toggleRepoData,
    fakeCreateRepo,
    fakeDuplicateRepo,
    fakeTogglePrivacyRepo,
} from '../src/_token';
import GitHubSDK from '../src/GitHubSDK';
import { expect } from '@jest/globals';

const fetch = require('node-fetch');
const regeneratorRuntime = require('regenerator-runtime');
window.fetch = fetch;

describe('tests for GitHubSDK class', () => {
    describe('GitHubSDK class eitence', () => {
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
    });

    describe('function getUserData()', () => {
        it('is expected to return login from myData object', async () => {
            expect.assertions(1);
            const api = new GitHubSDK(myData);
            const res = await api.getUserData();
            expect(res.login).toBe(myData.login);
        });

        it('throws if wrong invalid arguments passed', async () => {
            expect.assertions(1);

            expect(() => {
                const fakeData = {
                    login: 'mlvrkhn',
                    token: 123456,
                };
                const api = new GitHubSDK(fakeData);
            }).toThrow();
        });
    });

    describe('function getPublicRepos()', () => {
        it('throws if invalid arguments passed to getPublicRepos()', async () => {
            expect.assertions(1);
            try {
                const api = new GitHubSDK(myData);
                await api.getPublicRepos('string', 'string2');
            } catch (e) {
                expect(e).toEqual(Error('Invalid arguments!'));
            }
        });

        it('returns object with 2 items', async () => {
            expect.assertions(1);
            const sdk = new GitHubSDK(myData);
            const repos = await sdk.getPublicRepos('kevwil', 2);
            return expect(repos.length).toBe(2);
        });

        it('will throw if login is not a string', async () => {
            expect.assertions(1);
            try {
                const api = new GitHubSDK(myData);
                await api.getPublicRepos([], 'string2');
            } catch (e) {
                expect(e).toEqual(Error('Invalid arguments!'));
            }
        });
    });

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

        it('throws with incorrect arguments', async () => {
            expect.assertions(1);

            try {
                const sdk = new GitHubSDK(myData);
                await sdk.toggleRepoPrivacy(10, 'text');
            } catch (e) {
                expect(e).toEqual(Error('Invalid arguments passed'));
            }
        });

        it('checks if public repo becomes public after running toggleRepoPrivacy()', async () => {
            expect.assertions(1);

            try {
                const git = new GitHubSDK(myData);
                await git
                    .createRepo(toggleRepoData)
                    .then(async () => {
                        await git
                            .toggleRepoPrivacy('toggletest', false)
                            .then((resp) => {
                                expect(resp.private).toEqual(false);
                            });
                    })
                    .then(async () => git.deleteRepo('toggletest'));
            } catch (err) {
                console.log('toggler error: ', err);
            }
        });
    });

    describe('function createRepo', () => {
        it('throws if argument if args are not provided', async () => {
            expect.assertions(1);

            try {
                const git = new GitHubSDK(myData);
                await git.createRepo();
            } catch (error) {
                expect(error).toEqual(
                    Error('You did not passed new repository data')
                );
            }
        });

        it('throws if argument are not type string', async () => {
            expect.assertions(1);

            try {
                const git = new GitHubSDK(myData);
                await git.createRepo(11, 12);
            } catch (error) {
                expect(error).toEqual(Error('Invalid arguments passed'));
            }
        });

        it('throws if only one argument passed', async () => {
            expect.assertions(1);

            try {
                const git = new GitHubSDK(myData);
                await git.createRepo('12');
            } catch (error) {
                expect(error).toEqual(Error('Invalid arguments passed'));
            }
        });

        it('checks if new fakeRepo was created', async () => {
            expect.assertions(1);

            try {
                const api = new GitHubSDK(myData);
                const newRepo = await api.createRepo(fakeCreateRepo);
                expect(newRepo.created_at).toBeTruthy();
                await api.deleteRepo('fake-repo');
            } catch (error) {
                console.log('fakeRepo error: ', error);
            }
        });

        it('throws with message if the repo already exists', async () => {
            expect.assertions(1);

            const git = new GitHubSDK(myData);
            try {
                await git.createRepo(fakeDuplicateRepo).then(async () => {
                    await git.createRepo(fakeDuplicateRepo);
                });
            } catch (error) {
                expect(error).toEqual('Promise rejected in _fetch()');
            }
            await git.deleteRepo('duplicate-fake-repo');
        });
    });
});
