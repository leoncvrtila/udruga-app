import React, {Component} from 'react'

import Aux from '../../hoc/Aux'

import {connect} from 'react-redux'
import axios from 'axios'

import Desk from '../../assets/images/desk.jpg'

import SpinnerB from '../../containers/Spinner/SpinnerB'
import Auth from '../../containers/Auth/Auth'
import { Redirect } from 'react-router-dom'


class Contract extends Component {


    state = {
        accept: false,
        name: '',
        surname: '',
        date: '',
        organization: '',
        nonValid: null,
        valid: null,
        show: null
        }

    componentDidMount() {


        axios.get('https://udruga-desk.firebaseio.com/valid.json')
          .then(response => {

            const valid = []
            for(let key in response.data) {                 // iz beckenda dobivam object pa ga moram pretvorit u array
                valid.push({                       // key je id tj odredeni member
                    ...response.data[key],
                    id: key
                
                }) 
            }
              
            if (valid.length === 1) {
                this.setState({valid: true});
            } else {
                this.setState({valid: false});
            }
              
          })
          .catch(error => {
            this.setState({error: true});
          });
    }

    errorHandler = () => {
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }


    
    acceptHandler = () => {

        this.setState({
            accept: true
        })

    }

    doneHandler = () => {

        let today = new Date();
		let dd = String(today.getDate()).padStart(2, '0');
		let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
        let yyyy = today.getFullYear();
        
        today = dd + '.' + mm + '.' + yyyy; 

        if(
            (this.state.name !== '') &&
            (this.state.surname !== '') &&
            (this.state.organization !== '') 
        ){

            
            axios.post('https://udruga-desk.firebaseio.com/valid.json', { // PRVO kod nas nek se upise 
                name: this.state.name,
                surname: this.state.surname,
                date: today,
                organization: this.state.organization,
                valid: true
            })
            .then(response => {
               
            })
            .catch(error => {
                this.setState({error: true});
            }); 

            this.setState({show:true})

           


        } else {
            
            this.setState({
                nonValid: false
            })

        }

      

    }

    changeHandler = (e) => {

        this.setState({
            [e.target.name]: e.target.value
        })

    }


    render(){
        
        if(this.state.show){
            setTimeout(function(){ window.location.reload();  }, 400);
            
        }

  
        return(
            <Aux>
                
                <div className="ContractFade" style={{background: 'white', height: '2500px', width: '100%'}}>
                <SpinnerB />
                </div> 

                <div className="Contract" style={{display: this.state.valid ? 'none' : 'block'}}>
                    <div className="ContractImg" style={{backgroundImage: 'url(' + Desk + ')'}}></div>
                    <div className="ContractDiv" style={{display: this.state.accept ? 'none' : 'block'}}>

                        <div className="ContractTxt" >

<h5 style={{textAlign: 'left'}}>INUP, obrt za ra??unalne i druge usluge, vl. Leon Cvrtila, Zagreb, Jurja Njavre 29 (u daljnjem tekstu; INUP)</h5>


<h3 style={{textAlign: 'center', marginTop: '1%', letterSpacing: '3px'}}>P   R   A   V   I   L   A</h3>
<h5 style={{textAlign: 'center'}}>za aplikaciju Desk Association</h5>

<h4>Predmet</h4> 

<h5>??lanak 1.</h5>

<p>
Predmet ovih Pravila je Internet aplikacija koja slu??i za u??lanjenje i evidenciju ??lanova odre??ene organizacije (u daljnjem tekstu; Desk Association).
</p>

<p>
Desk Association se sastoji od dva dijela: <br />
???	ePristupnica ??? slu??i za u??lanjenje u odre??enu organizaciju,<br />
???	Baza podataka ??? koristi se kako bi se vodila evidencija ??lanova odre??ene organizacije. 
</p>

<p>
Potpuni opis Desk Association-a nalazi se unutar priru??nika za kori??tenje.
</p>

<h5>??lanak 2.</h5>

<p>
Pristupnik je svaka fizi??ka osoba koja je popunila ePristupnica. Popunjavanjem i slanjem ePristupnice, pristupnik pristaje na Pravila koja je uspostavila organizacija kojoj pristupnik pristupa, a posebice vezano za za??titu podataka.
</p>

<p>
Korisnik je svaka organizacija koja je kupila Desk Association.
</p>


<h4>Prava na kori??tenje</h4>

<h5>??lanak 3.</h5>

<p>
Nakon uplate korisnik ima pravo na kori??tenje aplikacije Desk Association za cijelo vrijeme svog postojanja bez ikakvih dodatnih pla??anja.
</p>

<p>
Privatnost i kori??tenje podataka
</p>

<h5>??lanak 4.</h5>

<p>
INUP za vrijeme pristupa informacijama korisnika se obvezuje odnositi prema primljenim informacijama sa strogom povjerljivosti i tajnosti, ne otkriti ni jednoj tre??oj strani bilo koju od informacija primljenih od korisnika te ne iskoristiti ni jednu od tih informacija bez prethodne pisane suglasnosti korisnika.
</p>

<h4>Jamstvo</h4>

<h5>??lanak 5.</h5>

<p>
Korisnik ima pravo na povrat iznosa cijene Desk Association-a unutar 30 dana od uplate.
</p>

<h4>Podr??ka</h4>

<h5>??lanak 6.</h5>

<p>
Korisnik mo??e zatra??iti podr??ku INUP-a vezano za sva pitanja o kori??tenju i mogu??nostima Desk
Association-a putem sljede??eg mail-a: inup@inup.hr.
</p>

<h5>??lanak 7.</h5>

<p>
Korisnik mo??e povjeriti INUP-u tehni??ko odr??avanje ove aplikacije (??to se definira poslovnim dogovorom), ili u potpunosti preuzeti samostalno vo??enje i odr??avanje aplikacije u kojem slu??aju ??e INUP korisniku dati sve pristupne klju??eve.
</p>

<h5>??lanak 8.</h5>

<p>
Pru??atelj smje??taja ove aplikacije (server) daje besplatnu mogu??nost kori??tenja servera, a koju mogu??nost pru??atelj ima pravo izmijeniti u kojem slu??aju INUP ne mo??e preuzeti tro??kove.
</p>

<p>
Pohranjivanje podataka na aplikaciji nije neograni??eno.
</p>

<h4>Autorsko pravo</h4>

<h5>??lanak 9.</h5>

<p>
Sva autorska prava pripadaju INUP-u, odnosno korisnik ni ti tre??a strana ne smije kopirati izgled i/ili funkcionalnost ove aplikacije.
</p>

<h4>Zaklju??ne odredbe</h4>

<h5>??lanak 10.</h5>

<p>
Ova pravila podlije??u zakonima Republike Hrvatske. Originalni tekst ovih pravila je verzija na hrvatskom jeziku.
</p>

<p>
Izmjene i dopune ovih pravila mogu??e su samo od autora aplikacije koja ??e u pisanom digitalno obliku biti dostupna na aplikaciji Desk Association.
</p>

<h5>??lanak 11.</h5>

<p>
Prijavom na aplikaciju Desk Association korisnik prihva??a ova pravila i ne mo??e ih naknadno osporavati. 
</p>


                        </div>

                        <div className="ContractBtn" onClick={this.acceptHandler}>PRIHVA??AM PRAVILA</div>

                    </div>

                    <div className="ContractInfo" style={{display: this.state.accept ? 'block' : 'none'}}>

                        <h5 style={{display: (this.state.nonValid === false) ? 'block' : 'none', textAlign: 'center', marginTop: '4%'}}>Provjerite jeste li popunili sva polja.</h5>

                        <div className="ContractForm">
                            <input onChange={(e) => this.changeHandler(e)} value={this.state.name} placeholder="Ime" name="name" />
                            <input onChange={(e) => this.changeHandler(e)} value={this.state.surname} placeholder="Prezime" name="surname" />
                            <input onChange={(e) => this.changeHandler(e)} value={this.state.organization} placeholder="Naziv organizacije" name="organization" />
                        </div>

                        <div className="ContractBtn" onClick={this.doneHandler}>ZAVR??I</div>

                    </div>

                </div>


            </Aux>
        )}

}

const mapStateToProps = state => {         // to se povezuje sa initialState u reducers/auth.js
    return{
        isAuth: state.auth.token 
    }
}

export default connect(mapStateToProps)(Contract);