import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import ExampleView from './ExampleView';

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch);

const ExampleContainer = connect(mapStateToProps, mapDispatchToProps)(ExampleView);

export default ExampleContainer;
