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

<h5 style={{textAlign: 'left'}}>INUP, obrt za računalne i druge usluge, vl. Leon Cvrtila, Zagreb, Jurja Njavre 29 (u daljnjem tekstu; INUP)</h5>


<h3 style={{textAlign: 'center', marginTop: '1%', letterSpacing: '3px'}}>P   R   A   V   I   L   A</h3>
<h5 style={{textAlign: 'center'}}>za aplikaciju Desk Association</h5>

<h4>Predmet</h4> 

<h5>Članak 1.</h5>

<p>
Predmet ovih Pravila je Internet aplikacija koja služi za učlanjenje i evidenciju članova određene organizacije (u daljnjem tekstu; Desk Association).
</p>

<p>
Desk Association se sastoji od dva dijela: <br />
•	ePristupnica – služi za učlanjenje u određenu organizaciju,<br />
•	Baza podataka – koristi se kako bi se vodila evidencija članova određene organizacije. 
</p>

<p>
Potpuni opis Desk Association-a nalazi se unutar priručnika za korištenje.
</p>

<h5>Članak 2.</h5>

<p>
Pristupnik je svaka fizička osoba koja je popunila ePristupnica. Popunjavanjem i slanjem ePristupnice, pristupnik pristaje na Pravila koja je uspostavila organizacija kojoj pristupnik pristupa, a posebice vezano za zaštitu podataka.
</p>

<p>
Korisnik je svaka organizacija koja je kupila Desk Association.
</p>


<h4>Prava na korištenje</h4>

<h5>Članak 3.</h5>

<p>
Nakon uplate korisnik ima pravo na korištenje aplikacije Desk Association za cijelo vrijeme svog postojanja bez ikakvih dodatnih plaćanja.
</p>

<p>
Privatnost i korištenje podataka
</p>

<h5>Članak 4.</h5>

<p>
INUP za vrijeme pristupa informacijama korisnika se obvezuje odnositi prema primljenim informacijama sa strogom povjerljivosti i tajnosti, ne otkriti ni jednoj trećoj strani bilo koju od informacija primljenih od korisnika te ne iskoristiti ni jednu od tih informacija bez prethodne pisane suglasnosti korisnika.
</p>

<h4>Jamstvo</h4>

<h5>Članak 5.</h5>

<p>
Korisnik ima pravo na povrat iznosa cijene Desk Association-a unutar 30 dana od uplate.
</p>

<h4>Podrška</h4>

<h5>Članak 6.</h5>

<p>
Korisnik može zatražiti podršku INUP-a vezano za sva pitanja o korištenju i mogućnostima Desk
Association-a putem sljedećeg mail-a: inup@inup.hr.
</p>

<h5>Članak 7.</h5>

<p>
Korisnik može povjeriti INUP-u tehničko održavanje ove aplikacije (što se definira poslovnim dogovorom), ili u potpunosti preuzeti samostalno vođenje i održavanje aplikacije u kojem slučaju će INUP korisniku dati sve pristupne ključeve.
</p>

<h5>Članak 8.</h5>

<p>
Pružatelj smještaja ove aplikacije (server) daje besplatnu mogućnost korištenja servera, a koju mogućnost pružatelj ima pravo izmijeniti u kojem slučaju INUP ne može preuzeti troškove.
</p>

<p>
Pohranjivanje podataka na aplikaciji nije neograničeno.
</p>

<h4>Autorsko pravo</h4>

<h5>Članak 9.</h5>

<p>
Sva autorska prava pripadaju INUP-u, odnosno korisnik ni ti treća strana ne smije kopirati izgled i/ili funkcionalnost ove aplikacije.
</p>

<h4>Zaključne odredbe</h4>

<h5>Članak 10.</h5>

<p>
Ova pravila podliježu zakonima Republike Hrvatske. Originalni tekst ovih pravila je verzija na hrvatskom jeziku.
</p>

<p>
Izmjene i dopune ovih pravila moguće su samo od autora aplikacije koja će u pisanom digitalno obliku biti dostupna na aplikaciji Desk Association.
</p>

<h5>Članak 11.</h5>

<p>
Prijavom na aplikaciju Desk Association korisnik prihvaća ova pravila i ne može ih naknadno osporavati. 
</p>


                        </div>

                        <div className="ContractBtn" onClick={this.acceptHandler}>PRIHVAĆAM PRAVILA</div>

                    </div>

                    <div className="ContractInfo" style={{display: this.state.accept ? 'block' : 'none'}}>

                        <h5 style={{display: (this.state.nonValid === false) ? 'block' : 'none', textAlign: 'center', marginTop: '4%'}}>Provjerite jeste li popunili sva polja.</h5>

                        <div className="ContractForm">
                            <input onChange={(e) => this.changeHandler(e)} value={this.state.name} placeholder="Ime" name="name" />
                            <input onChange={(e) => this.changeHandler(e)} value={this.state.surname} placeholder="Prezime" name="surname" />
                            <input onChange={(e) => this.changeHandler(e)} value={this.state.organization} placeholder="Naziv organizacije" name="organization" />
                        </div>

                        <div className="ContractBtn" onClick={this.doneHandler}>ZAVRŠI</div>

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