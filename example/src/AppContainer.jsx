import {
  connect,
} from 'react-redux';
import {
  bindActionCreators,
} from 'redux';
import App from './App';

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App);
