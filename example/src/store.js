import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

function configureStore() {
  const store = createStore(
    rootReducer,
    compose(
      applyMiddleware(thunk),
      process.env.NODE_ENV === 'development' && window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  if (module.hot) {
    module.hot.accept('./reducers', () =>
      store.replaceReducer(require('./reducers').default),
    );
  }

  return store;
}

const store = configureStore();

export default store;
