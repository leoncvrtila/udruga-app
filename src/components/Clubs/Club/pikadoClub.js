import React, {Component} from 'react'
import axios from 'axios'
import NotificationForm from '../../Notifications/NotificationForm'
import MemberItem from './MemberItem'
import CreateEvent from './createEvent'
import firebase from '../../../firebase/firebase';
import 'firebase/firestore';
import Error from '../../../hoc/Error'

import {connect} from 'react-redux'

class PikadoClub extends Component {

    state={
        members: [],
        titles:[
            {name: 'Ime'},
            {name: 'Prezime'},
            {name: 'Datum rođenja'},
            {name: 'Županija stanovanja'},
            {name: 'Grad stanovanja'},
            {name: 'Općina stanovanja'},
            {name: 'Adresa stanovanja'},
            {name: 'Telefon'},
            {name: 'Email'}
       ],
       clubValue: 'pikado',                                                             // prema tome se filtriraju
       subject: '',
       email: '',
       msg: '',
       eventDate: '',
       eventTitle: '',
       activeValue: 'da',
       error: false
    }


    componentDidMount() {


        axios.get('https://udruga-desk.firebaseio.com/member.json?auth=' + this.props.isAuth)
          .then(response => {
            const fetchedMembers = []
            for(let key in response.data) {                                         // iz beckenda dobivam object pa ga moram pretvorit u array
                fetchedMembers.push({                                               // key je id tj odredeni member
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

        this.setState({[e.target.name]: e.target.value})                           // odabrani name njegov value
    
    
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
        let i
        let txt = ""
        for(i = 0; i < arrayEmails.length; i++) {

            txt += arrayEmails[i] + ', '

            const userRef = db.collection("posts").add({
                subject: subject,
                email: arrayEmails[i],
                msg: msg
            }); 

        }        


        setTimeout(() => {
            this.setState({msg: '', subject: ''})
        }, 700)   
       
    
    }

      
    refreshMemberState = () => {
        setTimeout(() => {

            axios.get('https://udruga-desk.firebaseio.com/member.json?auth=' + this.props.isAuth)
              .then(response => {
            
                const fetchedMembers = []
                for(let key in response.data) {                               // iz beckenda dobivam object pa ga moram pretvorit u array
                    fetchedMembers.push({                                    // key je id tj odredeni member
                        ...response.data[key],
                        id: key
                    
                    }) 
                }

                this.setState({members: fetchedMembers});
        })
        .catch(error => {
            this.setState({error: true});
        });  


        }, 1000);  
    }

    eventHandler = () => {

        if(
            (this.state.eventDate !== '') && 
			(this.state.eventTitle !== '') 
        ) {

            axios.post('https://udruga-desk.firebaseio.com/events.json?auth=' + this.props.isAuth, {
                date: this.state.eventDate,
                title: this.state.eventTitle,
                active: 'da'
            })
            .then(response => {

            })
            .catch(error => {
                this.setState({error: true});
            });      

            setTimeout(() => {
                this.setState({eventDate: '', eventTitle: ''})
            }, 1000)

        }        

    }


    errorHandler = () => {
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }

    render() {

        let titles = this.state.titles.map((item) => {
            return (
                <th key={item.name}>
                    {item.name}
                </th>
            )

            })

        
        
        let filteredMembers = this.state.members.filter(                                        // u toj varijabli se nalaze filtrirani clanovi 
                (member) => {
                    return  member.pikado.toLowerCase().indexOf(this.state.clubValue.toLowerCase()) !== -1
            }
        )
    
               const memberItem =  filteredMembers.map((i) => {
                    return(  <MemberItem 
                              key={i.oib}
                              oib={i.oib}
                              name={i.name}
                              surname={i.surname}
                              sex={i.sex}
                              birthdate={i.birthdate}
                              stateOfBirth={i.stateOfBirth}
                              county={i.county}
                              city={i.city}
                              township={i.township}
                              address={i.address}
                              zipCode={i.zipCode}
                              tel={i.tel}
                              email={i.email}
                              qualifications={i.qualifications}
                              status={i.status}
                              professionalTitle={i.professionalTitle}
                              study={i.study}
                              employment={i.employment}
                              pensioner={i.pensioner}
                              fieldOfInterest={i.fieldOfInterest}
                              membership={i.membership}
                              id={i.id}
                              hierarchy={i.hierarchy}
                              refreshMemberState={this.refreshMemberState}
                              selectedMember={() => this.selectedMemberHandler(i.id, i.membership)}
                          />
                     
                      )
                  });
    
    
            
    
                const emails = Object.keys(filteredMembers).map(function(key) {             // mail-ovi kojima se salje obavijest o placanju clanarine
                    return filteredMembers[key].email;
                  });
    

        return(

            <div className="ClubWrap">

                <h1 className="H1Title">
                    Pikado
                </h1>

                <div className="tableWrap">
                    <table>
                        <thead>
                            <tr>
                                {titles}
                            </tr>
                        </thead>
                        {filteredMembers.length ?                                           // ukoliko nema ni jednog clana 
                            <tbody>
                                {memberItem}
                            </tbody> 
                            : <tbody><tr style={{textAlign: 'center',background: 'none'}}><td colSpan="10" style={{borderRight: '0px'}}>Nema zainteresiranih članova.</td></tr></tbody>
                        }

                    </table>
                </div>

                <CreateEvent
                    eventDate={this.state.eventDate}
                    eventTitle={this.state.eventTitle}
                    changeHandler={(e) => this.changeHandler(e)}
                    eventHandler={this.eventHandler}
                />

                <NotificationForm 
                    subject={this.state.subject}
                    textareaValue={this.state.msg}
                    emails={emails}
                    submitHandler={this.submitHandler}
                    changeHandler={(e) => this.changeHandler(e)}
                    submitClickHandler={this.submitClickHandler}
                />

                <Error
                    error={this.state.error}
                    errorHandler={this.errorHandler}
                />

            </div>
        );

    }


}

const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token 
    }
}

export default connect(mapStateToProps)(PikadoClub);