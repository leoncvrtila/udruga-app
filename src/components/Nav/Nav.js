import React, {Component} from 'react'
import {NavLink} from 'react-router-dom'

import Active from '../../assets/images/Active.svg'
import nonActive from '../../assets/images/nonActive.svg'
import Leader from '../../assets/images/leader.svg'
import Home from '../../assets/images/home.svg'
import Clubs from '../../assets/images/clubs.svg'
import Logout from '../../assets/images/logout.svg'

class Nav extends Component {


    state = {
        nav: [ 
    
            {name: 'Početna', url: Home, path: '/main'},
            {name: 'Aktivni članovi', url: Active, path: '/members'},
            {name: 'Neaktivni članovi', url: nonActive, path: '/passive'},
            {name: 'Klubovi', url: Clubs, path: '/clubs'},
            {name: 'Upravna tijela', url: Leader, path: '/bodies'},
            {name: 'Odjava', url: Logout, path: '/logout'}        
        ]
       
        }

    render() {


        const nav = this.state.nav.map((i) => {
            return( <NavLink to={i.path} activeClassName='is-active' key={i.name}>
                    <img src={i.url} alt={i.name}/>{i.name}
                 </NavLink>
            )
            }
        );

        return(

            <nav>
                {nav}
            </nav>

        );   
    }
}

    



export default Nav;