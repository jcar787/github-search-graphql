import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer, { initialState } from './reducers';
import rootSaga from './sagas';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware(rootSaga);
const middleware = [sagaMiddleware];
const enhancers = [];

if (process.env.REACT_APP_DEBUG && window.__REDUX_DEVTOOLS_EXTENSION__) {
  enhancers.push(
    window.__REDUX_DEVTOOLS_EXTENSION__({
      serialize: true
    })
  );
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);
const configureStore = () =>
  createStore(rootReducer, initialState, composedEnhancers);
const store = configureStore();

sagaMiddleware.run(rootSaga);

export default store;
