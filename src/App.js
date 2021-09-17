import React, {Component} from 'react';
import './App.css';
import Layout from './components/Layout';
import {connect} from 'react-redux'
import * as actions from './store/actions/index'
import {withRouter} from 'react-router-dom'


class App extends Component {

  componentDidMount() {
    this.props.onTryAutoSign()
  }

  render() {

    return (

      <div className="App">
          <Layout />
      </div>

    )

  }

}




const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSign: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));
