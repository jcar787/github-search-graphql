import {
  FETCH_REPOS_START,
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_FAILED,
  FETCH_MORE_REPOS,
  FETCH_MORE_REPOS_SUCCESS
} from './search.constants';

export const initialState = {
  repos: [],
  loading: false,
  error: null,
  name: '',
  cursors: [],
  totalCount: 0
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_REPOS_START:
      return { ...initialState, loading: true, error: null };
    case FETCH_MORE_REPOS:
      return { ...state, loading: true, error: null };
    case FETCH_MORE_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        repos: [...state.repos, ...action.repos],
        cursors: [...state.cursors, action.lastCursor],
        error: null
      };
    case FETCH_REPOS_SUCCESS:
      return {
        ...state,
        loading: false,
        repos: [...state.repos, ...action.repos],
        totalCount: action.totalCount,
        name: action.name,
        cursors: [...state.cursors, action.lastCursor],
        error: null
      };
    case FETCH_REPOS_FAILED:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
