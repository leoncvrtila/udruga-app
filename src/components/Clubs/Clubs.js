import React, {Component} from 'react'
import {Link} from 'react-router-dom'

import Aux from '../../hoc/Aux'
import Event from './Event'

import '../../assets/css/club.scss'

import ribolov from '../../assets/images/ribolov.png'
import bela from '../../assets/images/bela.png'
import nogomet from '../../assets/images/nogomet.png'
import pikado from '../../assets/images/pikado.png'
import humanitarian from '../../assets/images/humanitarian.svg'

class Clubs extends Component {                     // prikazuje sve klubove i sve evente

    state={
        clubsItem:[
            {id: '1',imgUrl: ribolov, title: 'ribolov'},
            {id: '2',imgUrl: nogomet, title: 'nogomet'},
            {id: '3',imgUrl: bela, title: 'bela'},
            {id: '4',imgUrl: pikado, title: 'pikado'},
            {id: '5',imgUrl: humanitarian, title: 'humanitarniRad'}
        ]
    }


    render() {

        let clubsItem = this.state.clubsItem.map(i => {
            
         return  <Link key={i.id} to={i.title}>
                <div className="ClubItem">
                    <img src={i.imgUrl} alt={i.title}/>
                </div>
                </Link>
        })

        return(

            <Aux>
                <div className="ClubItemWrap">
                    {clubsItem}
                </div>
                
                <Event/>
            </Aux>

        );

    }


}


export default Clubs;