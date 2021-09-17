import React, {Component} from 'react'
import Aux from '../hoc/Aux'
import {Route, Switch} from 'react-router-dom'

import Contract from '../components/Contract/Contract'
import Auth from '../containers/Auth/Auth'
import Nav from '../components/Nav/Nav'
import Main from './Main/Main'
import Members from '../components/Members/Members'
import Clubs from './Clubs/Clubs'
import RibolovClub from './Clubs/Club/ribolovClub'
import NogometClub from './Clubs/Club/nogometClub'
import BelaClub from './Clubs/Club/belaClub'
import PikadoClub from './Clubs/Club/pikadoClub'
import HumanitarianClub from './Clubs/Club/humanitarianClub'
import Passive from './Passive/Passive'
import GoverningBodies from './GoverningBodies/GoverningBodies'
import CentralCommittee from './GoverningBodies/Bodies/CentralCommittee'
import Presidency from './GoverningBodies/Bodies/Presidency'
import SupervisoryBoard from './GoverningBodies/Bodies/SupervisoryBoard'
import Logout from '../containers/Auth/Logout/Logout'
import Settings from '../components/Settings/Settings'
import Footer from '../components/Footer/Footer'

import '../assets/css/main.css'
import '../assets/css/nav.css'

import {connect} from 'react-redux'
import axios from 'axios'



class Layout extends Component {

    state = {
        valid: null
    }

    componentDidMount() {


        axios.get('https://udruga-desk.firebaseio.com/valid.json') // provjerit u njihovoj bazi
          .then(response => {

            const valid = []
            for(let key in response.data) {                 // iz beckenda dobivam object pa ga moram pretvorit u array
                valid.push({                       // key je id tj odredeni member
                    ...response.data[key],
                    id: key
                
                }) 
            }

              
            if (valid[0].valid === true) {
                this.setState({valid: true});
            } else {
                this.setState({valid: false});
            }
              
          })
          .catch(error => {
            this.setState({error: true});
          });
    }



    render() {



        return (
            <Aux>
                
                
                <section>
                
                    <div className="Auth">
                       <Route path="/" exact component={(this.state.valid === true) ? Auth : Contract} />
                    </div>     

                    <Route path="/(main|members|clubs|ribolov|nogomet|bela|pikado|humanitarniRad|passive|bodies|centralCommittee|presidency|supervisoryBoard|settings)" component={(this.props.isAuth === true) && (this.state.valid === true) ? Nav : null} />

                    <Route path="/main" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? Main : (this.state.valid === true) ? Auth : Contract} />  

                    <Route path="/members" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? Members : (this.state.valid === true) ? Auth : Contract} />  

                    <Route path="/clubs" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? Clubs : (this.state.valid === true) ? Auth : Contract} /> 

                    <Route path="/ribolov" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? RibolovClub : (this.state.valid === true) ? Auth : Contract} /> 

                    <Route path="/nogomet" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? NogometClub : (this.state.valid === true) ? Auth : Contract} /> 

                    <Route path="/bela" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? BelaClub : (this.state.valid === true) ? Auth : Contract} />

                    <Route path="/pikado" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? PikadoClub : (this.state.valid === true) ? Auth : Contract} />

                    <Route path="/humanitarniRad" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? HumanitarianClub : (this.state.valid === true) ? Auth : Contract} />

                    <Route path="/bodies" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? GoverningBodies : (this.state.valid === true) ? Auth : Contract} />

                    <Route path="/centralCommittee" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? CentralCommittee : (this.state.valid === true) ? Auth : Contract} />

                    <Route path="/presidency" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? Presidency : (this.state.valid === true) ? Auth : Contract} />

                    <Route path="/supervisoryBoard" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? SupervisoryBoard : Auth} />

                    <Route path="/passive" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? Passive : (this.state.valid === true) ? Auth : Contract} />

                    <Route path="/settings" exact component={(this.props.isAuth === true) && (this.state.valid === true) ? Settings : (this.state.valid === true) ? Auth : Contract } />

                    <Route path="/logout" exact component={Logout} /> 

                <Route path="/(|main|members|clubs|ribolov|nogomet|bela|pikado|humanitarniRad|passive|bodies|centralCommittee|presidency|supervisoryBoard|settings)" component={Footer} /> 
             
                </section>
            </Aux>
        );
    } 
    
                                            // Rute za odredene linkove ali prije toga provjerava postoji li token tj mora se prvo netko ulogirati sa emailom i lozinkom da moze dobiti pristup ostalim componentama 


}


const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token !== null // provjerava da ako token nije null tj postoji li token ili ne >>> ako postoji onda je true ako ne onda je null
    }
}


export default connect(mapStateToProps)(Layout);
/**                     */