import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './AppContainer';
import store from './store';

const {
  render,
} = ReactDOM;

import './assets/scss/app.scss';

const renderApp = (Component) => {
  render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
  document.getElementById('root'));
};

renderApp(App);

if (module.hot) {
  module.hot.accept('./AppContainer', () => {
    const NewApp = require('./AppContainer').default;
    render(
      <AppContainer>
        <NewApp store={store} />
      </AppContainer>,
      document.getElementById('root'),
    );
  });
}
