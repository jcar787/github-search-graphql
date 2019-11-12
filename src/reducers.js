import { combineReducers } from 'redux';
import { reducer as search, initialState as searchState } from './pages/search';

export const initialState = {
  search: searchState
};

export default combineReducers({
  search
});
