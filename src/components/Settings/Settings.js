import React, {Component} from 'react'

import Aux from '../../hoc/Aux'

import {connect} from 'react-redux'
import axios from 'axios'

import prirucnik from '../../assets/pdf/prirucnik.pdf'
import pravila from '../../assets/pdf/pravila.pdf'


class Settings extends Component {


    state = {
        name: '',
        surname: '',
        date: '',
        organization: '',
        valid: null,
        deinstall: false,
        kom: ''
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

              
                this.setState({
                    name: valid[0].name,
                    surname: valid[0].surname,
                    date: valid[0].date,
                    organization: valid[0].organization,
                    valid: valid[0].valid,
                    key: valid[0].id,

                });
           
              
          })
          .catch(error => {
            this.setState({error: true});
          });
    }

    deinstallHandler = () => {
        
        this.setState({
            deinstall: true
        })

    }

    modalYesHandler = (e,id) => {

        let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
        let yyyy = today.getFullYear();
        
        today = dd + '.' + mm + '.' + yyyy; 

        axios.put('https://udruga-desk.firebaseio.com/valid/'+ id +'.json', { // prvo kod nas nek se upise 
        name: this.state.name,
        surname: this.state.surname,
        date: this.state.date,
        unistallDate: today,
        organization: this.state.organization,
        kom: this.state.kom,
        valid: false
        })
        .then(response => {

            if(response.data.name){
                window.location.href = '/'
            }

        })
        .catch(error => {
            this.setState({error: true});
        }); 


    }

    modalNoHandler = () => {

        this.setState({
            deinstall: false
        })

    }

    komHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render(){ // onClick={this.deinstallHandler} -------------------------- MOGUĆNOST DEINSTALACIJE DODATI
        return(
            <Aux>

                <div className="Backdrop" style={{display: this.state.deinstall ? 'block' : 'none'}}></div>

                <div className="Settings">
                    <h2>Postavke i informacije</h2>

                    <h4>Odgovorna osoba</h4>
                    <p>{this.state.name + ' ' + this.state.surname}</p>

                    <h4>Naziv organizacije</h4>
                    <p>{this.state.organization}</p>

                    <h4>Datum registracije</h4>
                    <p>{this.state.date}</p>

                    <h4>Dokumenti za preuzimanje</h4>
                    <a href={prirucnik} download="Priručnik za korištenje - Desk Association">Priručnik za korištenje - PDF</a>
                    <a href={pravila} download="Pravila - Desk Association">Pravila - PDF</a>

                    <h4>Prekid korištenja</h4>
                    <div className="SettingsBtn" >Deinstaliraj</div>

                    <h4>Verzija</h4>
                    <p>Desk 3.7</p>
                </div>

                <div className="SettingsModal" style={{display: this.state.deinstall ? 'flex' : 'none'}}>

                        <h4>Jeste li sigurni?</h4>

                        <textarea name="kom" onChange={(e) => this.komHandler(e)} value={this.state.kom} placeholder="Napišite komentar..." ></textarea>

                        <div className="SettingsModalWrap">
                            <div onClick={(e) => this.modalYesHandler (e,this.state.key)} className="SettingsModalBtn">DA</div>
                            <div onClick={this.modalNoHandler} className="SettingsModalBtn">NE</div>
                        </div>

                </div>

            </Aux>
        )
    }

}

const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token 
    }
}


export default connect(mapStateToProps)(Settings);