import { FETCH_REPOS_START, FETCH_MORE_REPOS } from './search.constants';

export const fetchReposStart = search => {
  return {
    type: FETCH_REPOS_START,
    search
  };
};

export const fetchMoreRepos = () => {
  return {
    type: FETCH_MORE_REPOS
  };
};
