import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import ExampleContainer from './components';

class App extends Component {
  static propTypes = {
    store: PropTypes.shape().isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div>
          <main className="main" id="main">
            <ExampleContainer />
          </main>
        </div>
      </Provider>
    );
  }
}

export default App;
