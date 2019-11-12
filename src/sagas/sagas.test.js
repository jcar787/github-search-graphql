import { expectSaga } from 'redux-saga-test-plan';
import effects from 'redux-saga/effects';
import { client } from '../utils';
import { fetchMoreRepos, fetchRepos } from './sagas';

describe("Test sagas to see if they're returning correct data", () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should return a list of repositories', () => {
    const mockAction = { type: 'GET_REPOS', search: 'express' };
    const results = {
      data: {
        search: {
          repositoryCount: 1,
          edges: [
            {
              cursor: 'aWeirdString',
              node: {
                name: 'Express',
                url: 'github.com/expressjs/express',
                watchers: {
                  totalCount: 23
                },
                owner: {
                  login: 'expressjs'
                },
                primaryLanguage: {
                  name: 'JavaScript'
                }
              }
            }
          ]
        }
      }
    };
    jest.spyOn(client, 'query').mockImplementation(() => results);
    const repos = results.data.search.edges;
    const lastCursor = repos[repos.length - 1].cursor;
    return expectSaga(fetchRepos, mockAction)
      .put({
        type: 'FETCH_REPOS_SUCCESS',
        repos,
        totalCount: results.data.search.repositoryCount,
        name: mockAction.search,
        lastCursor
      })
      .run();
  });
  it('should fail if there are no repositories', () => {
    const mockAction = { type: 'GET_REPOS', search: 'express' };
    const results = {
      data: {
        search: {
          edges: []
        }
      }
    };
    jest.spyOn(client, 'query').mockImplementation(() => results);
    return expectSaga(fetchRepos, mockAction)
      .put({
        type: 'FETCH_REPOS_FAILED',
        error: 'No repositories found'
      })
      .run();
  });
  it('should fail if the input is empty', () => {
    const mockAction = { type: 'GET_REPOS', search: '' };
    return expectSaga(fetchRepos, mockAction)
      .put({
        type: 'FETCH_REPOS_FAILED',
        error: 'Input can not be empty'
      })
      .run();
  });
  it('should return more repositories', () => {
    const mockAction = { type: 'GET_REPOS', search: 'express' };
    const results = {
      data: {
        search: {
          repositoryCount: 1,
          edges: [
            {
              cursor: 'aWeirdString',
              node: {
                name: 'Express',
                url: 'github.com/expressjs/express',
                watchers: {
                  totalCount: 23
                },
                owner: {
                  login: 'expressjs'
                },
                primaryLanguage: {
                  name: 'JavaScript'
                }
              }
            }
          ]
        }
      }
    };
    jest.spyOn(client, 'query').mockImplementation(() => results);
    const repos = results.data.search.edges;
    const lastCursor = repos[repos.length - 1].cursor;
    return expectSaga(fetchMoreRepos, mockAction)
      .withState({
        search: {
          name: 'express',
          cursors: ['asndasudna']
        }
      })
      .put({
        type: 'FETCH_MORE_REPOS_SUCCESS',
        repos,
        lastCursor
      })
      .run();
  });
});
