import {
  all,
  call,
  debounce,
  put,
  select,
  takeEvery
} from 'redux-saga/effects';
import { GET_REPOS } from './search.gql';
import { client } from '../../utils';
import {
  FETCH_REPOS_SUCCESS,
  FETCH_REPOS_START,
  FETCH_REPOS_FAILED,
  FETCH_MORE_REPOS,
  FETCH_MORE_REPOS_SUCCESS
} from './search.constants';
import { NotFoundError, EmptyInputError } from './search.errors';

export function* fetchRepos(action) {
  const { search } = action;
  try {
    if (search === '') {
      throw new EmptyInputError();
    }
    const results = yield call(client.query, GET_REPOS, {
      query: search,
      type: 'REPOSITORY'
    });
    const repos = results.data.search.edges;
    if (repos.length === 0) {
      throw new NotFoundError();
    }
    const lastCursor = repos[repos.length - 1].cursor;
    yield put({
      type: FETCH_REPOS_SUCCESS,
      repos,
      totalCount: results.data.search.repositoryCount,
      name: search,
      lastCursor
    });
  } catch (e) {
    yield put({ type: FETCH_REPOS_FAILED, error: e.message });
  }
}

export function* fetchMoreRepos() {
  const { name: search, cursors } = yield select(state => state.search);
  const after = cursors[cursors.length - 1];
  const results = yield client.query(GET_REPOS, {
    query: search,
    type: 'REPOSITORY',
    after: after
  });
  const repos = results.data.search.edges;
  const lastCursor = repos[repos.length - 1].cursor;

  yield put({
    type: FETCH_MORE_REPOS_SUCCESS,
    repos,
    lastCursor
  });
}

function* takeFetchMoreRepos() {
  yield takeEvery(FETCH_MORE_REPOS, fetchMoreRepos);
}

function* debounceRequestRepos() {
  yield debounce(1000, FETCH_REPOS_START, fetchRepos);
}

export default function* rootSaga() {
  yield all([debounceRequestRepos(), takeFetchMoreRepos()]);
}
