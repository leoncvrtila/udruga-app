import React, {Component} from 'react'
import * as actions from '../../../store/actions/auth'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Logout extends Component {


    componentDidMount () {
        this.props.onLogout(this.props.history);
    }

    render() {

        return <Redirect to="/"/>;                        // nakon klika na logout prikazuje se auth 

    }


}


const mapDispatchToProps = dispatch => {

    return{
        onLogout: () => dispatch(actions.logout())      // globalna akcija koja se vrsi klikom na logout
    }

}


export default connect(null,mapDispatchToProps)(Logout);