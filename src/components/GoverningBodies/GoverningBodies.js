import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import NotificationForm from './NotificationForm'
import firebase from '../../firebase/firebase';
import 'firebase/firestore';
import Aux from '../../hoc/Aux'
import Error from '../../hoc/Error'

import {connect} from 'react-redux'

import axios from 'axios'
import '../../assets/css/governingBodies.scss'

import Central from '../../assets/images/central.svg'
import President from '../../assets/images/president.svg'
import Control from '../../assets/images/control.svg'

class GoverningBodies extends Component {


    state = {
        members:[],
        bodies: [                                                  // upravna tijela
    
            {name: 'Središnji odbor', url: Central, path: '/centralCommittee'},
            {name: 'Predsjedništvo', url: President, path: '/presidency'},
            {name: 'Nadzorni odbor', url: Control, path: '/supervisoryBoard'}      
        ],
        activeValue: 'da', 
        centralCommitteeValue: 'Član središnjeg odbora',          // prema tome se filtriraju - koristi se za grupno slanje mailova prema upravnim tijelima
        presidencyValue: 'Član predsjedništva',
        supervisoryBoardValue: 'Član nadzornog odbora',
        centralCommittee: false,
        presidency: false,
        supervisoryBoard: false,
        subject: '',
        email: '',
        msg: '',
        error: false
       
        }

        componentDidMount() {


            axios.get('https://udruga-desk.firebaseio.com/member.json?auth=' + this.props.isAuth)
              .then(response => {
                const fetchedMembers = []
                for(let key in response.data) {                 // iz beckenda dobivam object pa ga moram pretvorit u array
                    fetchedMembers.push({                       // key je id tj odredeni member
                        ...response.data[key],
                        id: key
                    
                    }) 
                }
                  this.setState({members: fetchedMembers});
              })
              .catch(error => {
                this.setState({error: true});
              });
        }

        changeHandler = (e) => {

            this.setState({[e.target.name]:e.target.value})     // odabrani name njegov value
        
        
          }
    
        submitClickHandler = (e) => {
    
            this.setState({email: e.target.name})
    
        }
        
        submitHandler = (e) => {
    
            e.preventDefault()                                          
            // slanje value - email adrese se filtrirane i onda stavljene u const emails i onda postavljene kao name unutar submit btna i onda kad se klikne on postavi state i taj state se salje u node
    
            const db = firebase.firestore();
            db.settings({
                timestampsInSnapshots: true
            });
    
            let email = this.state.email
            let subject = this.state.subject
            let msg = this.state.msg
    
            let arrayEmails = email.split(",")
            console.log(arrayEmails)


            let unique = {};
            function removeDups(arrayEmails) {
                
                arrayEmails.forEach(function(i) {
                  if(!unique[i]) {
                    unique[i] = true;
                  }
                });
                return Object.keys(unique);
                
              }

              
            let filteredEmails = removeDups(arrayEmails)
            let i
            let txt = ""
            for(i = 0; i < filteredEmails.length; i++) {
    
                txt += filteredEmails[i] + ', '
    
                const userRef = db.collection("posts").add({
                    subject: subject,
                    email: filteredEmails[i],
                    msg: msg
                }); 
    
            }        
    
    
            setTimeout(() => {
                this.setState({msg: '', subject: ''})
            }, 700)   
           
        
        }


        centralCommitteeHandler = () => {

            this.setState(prevState=>({
                centralCommittee: !prevState.centralCommittee
            }))
        }

        presidencyHandler = () => {

            this.setState(prevState=>({
                presidency: !prevState.presidency
            }))
        }

        supervisoryBoardHandler = () => {

            this.setState(prevState=>({
                supervisoryBoard: !prevState.supervisoryBoard
            }))
        }

        errorHandler = () => {
            this.setState(prevState=>({
                error: !prevState.error
            }))
        }
    

    render() {

       

        const bodies = this.state.bodies.map((i) => {
            return( <Link to={i.path} key={i.name}>
                    <img src={i.url} alt={i.name}/>{i.name}
                 </Link>
            )
            }
        );

        

        let selectedEmails = []                                             // oni koji su odabrani da im se salje mail ce se dodat tu unutra 

         // filtrira članove sredisnjeg odbora
        
         let centralCommitteeMembers = this.state.members.filter(
            (member) => {
                return  member.active.toLowerCase().indexOf(this.state.activeValue.toLowerCase()) !== -1  && // filtrira ih prvo da vidi jesu li uopce aktivni
                        member.centralCommittee.toLowerCase().indexOf(this.state.centralCommitteeValue.toLowerCase()) !== -1 
            }
        )

        const centralCommitteeEmails = Object.keys(centralCommitteeMembers).map(function(key) { 
            return centralCommitteeMembers[key].email;
          });
        
          // filtrira članove predsjednistva

        let presidencyMembers = this.state.members.filter(
            (member) => {
                return  member.active.toLowerCase().indexOf(this.state.activeValue.toLowerCase()) !== -1  && // filtrira ih prvo da vidi jesu li uopce aktivni
                        member.presidency.toLowerCase().indexOf(this.state.presidencyValue.toLowerCase()) !== -1 
            }
        )

        const presidencyEmails = Object.keys(presidencyMembers).map(function(key) {
            return presidencyMembers[key].email;
          });

        // filtrira nadzornog odbora

        let supervisoryBoardMembers = this.state.members.filter(
            (member) => {
                return  member.active.toLowerCase().indexOf(this.state.activeValue.toLowerCase()) !== -1  && // filtrira ih prvo da vidi jesu li uopce aktivni
                        member.supervisoryBoard.toLowerCase().indexOf(this.state.supervisoryBoardValue.toLowerCase()) !== -1 
            }
        )

        const supervisoryBoardEmails = Object.keys(supervisoryBoardMembers).map(function(key) { 
            return supervisoryBoardMembers[key].email;
          });



        if(this.state.centralCommittee) {                                   // ukoliko je btn kliknut promjeni state i ubaci te mailove u selectedEmails array

            selectedEmails.push(centralCommitteeEmails)
        } 

        if (this.state.presidency) {
            
            selectedEmails.push(presidencyEmails)
        } 

        if (this.state.supervisoryBoard) {

            selectedEmails.push(supervisoryBoardEmails)
        }
        

        return(
            
            <Aux>

                <div className="GoverningBodies">
                    {bodies}
                </div>

                <NotificationForm 
                    subject={this.state.subject}
                    textareaValue={this.state.msg}
                    emails={selectedEmails}
                    submitHandler={this.submitHandler}
                    changeHandler={(e) => this.changeHandler(e)}
                    submitClickHandler={this.submitClickHandler}
                    centralCommittee={this.centralCommitteeHandler}
                    presidency={this.presidencyHandler}
                    supervisoryBoard={this.supervisoryBoardHandler}
                    centralCommitteeState={this.state.centralCommittee}
                    presidencyState={this.state.presidency}
                    supervisoryBoardState={this.state.supervisoryBoard}
                />

                <Error
                    error={this.state.error}
                    errorHandler={this.errorHandler}
                />

            </Aux>

        );   
    }
}

    
const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token 
    }
}

export default connect(mapStateToProps)(GoverningBodies);