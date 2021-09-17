import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
import {connect} from 'react-redux'


class Footer extends Component {

    state={

    }

    render(){
        return(

            <footer>
                Copyright © Desk | Sva prava pridržana.
               {this.props.isAuth ? <NavLink to="/settings">
                   {' '} Postavke i informacije
                </NavLink> : null} 
            </footer>

        )
    }

}


const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token 
    }
}

export default connect(mapStateToProps)(Footer);

