import React, {Component} from 'react';

import down from '../../../assets/images/down.svg'
import up from '../../../assets/images/up.svg'

import firebase from '../../../firebase/firebase';
import 'firebase/firestore';

import {connect} from 'react-redux'

import MemberItem from '../Member/MemberItem'
import * as axios from 'axios'
import Aux from '../../../hoc/Aux'
import Error from '../../../hoc/Error'

import CountyInput from './countyInput'
import CityInput from './cityInput'
import TownshipInput from './townshipInput'
import QualificationInput from './qualificationInput'
import StatusInput from './statusInput'
import SexBtns from './sexBtns'
import EmploymentBtns from './employmentBtns'
import PensionerBtns from './pensionerBtns'
import Member from '../Member/Member'
import NotificationForm from '../../Notifications/NotificationForm'


class SearchMember extends Component {


    state={
        form:[],
        members:[],
        titles:[             
                                                           // table titles
            {name: 'Br. člana'},
            {name: 'Br. članske iskaznice'},
            {name: 'Ime'},
            {name: 'Prezime'},
            {name: 'OIB'},
            //{name: 'Datum rođenja'},
            //{name: 'Država rođenja'},
            {name: 'Županija stanovanja'},
            //{name: 'Grad stanovanja'},
            //{name: 'Općina stanovanja'},
            {name: 'Adresa stanovanja'},
            //{name: 'Poštanski broj'},
            {name: 'Telefon'},
            {name: 'Email'},
            {name: 'Zadnja članarina'},
            //{name: 'Stručna sprema'},
            //{name: 'Status'},
            //{name: 'Stručno zvanje'},
            //{name: 'Studij'},
            //{name: 'Zaposlenje'},
            //{name: 'Umirovljenik'},
            //{name: 'Polje interesa'},
            //{name: 'Središnji odbor'},
            //{name: 'Predsjedništvo'},
            //{name: 'Predsjednik'},
            //{name: 'Dopredsjednik'},
            //{name: 'Tajnik'},
            //{name: 'Nadzorni odbor'},
            //{name: 'Datum upisa'}
        ],
        searchValue: '',                                                    // vrijednost search inputa
        boxesHandler: false,
        advancedSearch: false,
        radioValue: null,
        selectedMemberCardNum: null,
        selectedMemberImg: null,                                            // odabrani element odredenog clana 
        selectedMemberId: null,
        selectedMemberValueId: null,
        selectedMemberOib: null,
        selectedMemberName: null,
        selectedMemberSurname: null,
        selectedMemberSex: null,
        selectedMemberBirthday: null,
        selectedMemberStateOfBirth: null,
        selectedMemberCounty: null,
        selectedMemberCity: null,
        selectedMemberTownship: null,
        selectedMemberAddress: null,
        selectedMemberZipCode: null,
        selectedMemberTel: null,
        selectedMemberEmail: null,
        selectedMemberQualifications: null,
        //selectedMemberStatus: null,
        selectedMemberProfessionalTitle: null,
        selectedMemberStudy: null,
        selectedMemberEmployment: null,
        selectedMemberPensioner: null,
        selectedMemberNogomet: null,
        selectedMemberRibolov: null,
        selectedMemberBela: null,
        selectedMemberPikado: null,
        selectedMemberHumanitarian: null,
        selectedMemberActive: null,
        selectedMemberCentralCommittee: null,
        selectedMemberPresidency: null,
        selectedMemberPresident: null,
        selectedMemberVicePresident: null,
        selectedMemberSecretary: null,
        selectedMemberSupervisoryBoard: null,
        selectedMemberDate: null,
        selectedMemberlastMembership: null,
        activeValue: 'Da',                                                  // pretrazivanje clanova prema aktivnosti
        modal: false,                                                       // modalni prozor koji se otvara klikom na clana
        subject: '',                                                        // za slanje mailova
        email: '',
        msg: '',
        error: false,
        nogometClick: false,
        belaClick: false,
        ribolovClick: false,
        pikadoClick: false,
        humanitarianClick: false
        }
    


    componentDidMount() {


        axios.all([
            axios.get('https://udruga-desk.firebaseio.com/member.json?auth=' + this.props.isAuth),
            axios.get('https://udruga-desk.firebaseio.com/form.json')
          ])
          .then(response => {
            const fetchedMembers = []
            for(let key in response[0].data) {                             // iz beckenda dobivam object pa ga moram pretvorit u array
                fetchedMembers.push({                                      // key je id tj odredeni member
                    ...response[0].data[key],
                    id: key
                
                }) 
            }

          this.setState({
              members: fetchedMembers, 
              form: response[1].data
            });
 
          });
    }

    exportToXml = () => {

        var a = document.body.appendChild(
            document.createElement("a")
         );
        a.download = "newfile.xml";
        a.href = "data:text/xml," + document.getElementById("xml").innerText;
        a.click(); //Trigger a click on the element
    }



    changeHandler = (e) => {

        this.setState({[e.target.name]:e.target.value})                   // odabrani name njegov value
    
    
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


	countyChangedHandler = (event, formName) => {                       // county

		
		const updatedForm = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
				value: event.target.value,
				valueId: this.state.form.county.elementConfig.options[event.target.selectedIndex].id,
                touched: true
            }
		};
		
        this.setState({form: updatedForm}); 

	}

    inputChangedHandler = (event, formName) => {                    // city, township, qualifications, status, fieldOfInterest

		const updatedForm = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
				value: event.target.value,
                touched: true
            }
        };
        

		this.setState({form: updatedForm}); 

    }


	clickSexHandler = (event, formName) => {                      // sex

		const updatedForm = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
                value: event.target.innerText,
                touched: true
            }
		};
		
		this.setState({form: updatedForm,radioValue: null}); 

	}

	clickEmploymentHandler = (event, formName) => {              // employment

		const updatedForm = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
                value: event.target.innerText,
                touched: true
            }
		};
		
		this.setState({form: updatedForm,radioValue: null}); 
	}

	clickPensionerHandler = (event, formName) => {              // pensioner

		const updatedForm = {
            ...this.state.form,
            [formName]: {
                ...this.state.form[formName],
                value: event.target.innerText,
                touched: true
            }
		};
		
        this.setState({form: updatedForm,radioValue: null}); 
    }
    

    searchChange(e) {
        
        this.setState({
            searchValue: e.target.value.substr(0,20), searchTouched: true})
    }

    boxesHandler = () => {
        this.setState({boxesHandler: true})
    }

    advancedSearch = () => {
        this.setState(prevState => ({advancedSearch: !prevState.advancedSearch}))
    }

    clearAllHandler = () => {

        axios.get('https://udruga-desk.firebaseio.com/form.json')        // kada se stisne ocisti ponovo se napravi rueqest
         .then(response => {

           this.setState({
               form: response.data, 
               radioValue: false,  // radio je prvo null pa false pa null 
               nogometClick: false,
               belaClick: false,
               ribolovClick: false,
               pikadoClick: false,
               humanitarianClick: false
            });     

         })
         .catch(error => {
            if(error) {
               this.setState({error: true});
              }
        });      
    }
                                                                        // prosljeduju se vrijednosti kliknutog clana i postavljaju se kao state pa se onda prosljeduju u Member.js
    selectedMemberHandler = (imgUrl, id, oib, name, surname, sex, birthdate, stateOfBirth, county, city, township, address, zipCode, tel, 
        email, qualifications, status, professionalTitle, study, employment, pensioner, fieldOfInterest, active,
        centralCommittee, presidency, president, vicePresident, secretary, supervisoryBoard, date, nogomet, ribolov, bela, pikado, humanitarian, cardNum, valueId, lastMembership) => 
        {        
        this.setState(prevState=>({
            selectedMemberImg: imgUrl,
            selectedMemberId: id, 
            selectedMemberValueId: valueId,
            selectedMemberOib: oib,   
            selectedMemberName: name,   
            selectedMemberSurname: surname,   
            selectedMemberSex: sex,   
            selectedMemberBirthday: birthdate,      
            selectedMemberStateOfBirth: stateOfBirth,   
            selectedMemberCounty: county,   
            selectedMemberCity: city,   
            selectedMemberTownship: township,   
            selectedMemberAddress: address,   
            selectedMemberZipCode: zipCode,   
            selectedMemberTel: tel,   
            selectedMemberEmail: email,   
            selectedMemberQualifications: qualifications,   
            //selectedMemberStatus: status,   
            selectedMemberProfessionalTitle: professionalTitle,   
            selectedMemberStudy: study,   
            selectedMemberEmployment: employment,   
            selectedMemberPensioner: pensioner,   
            selectedMemberFieldOfInterest: fieldOfInterest,
            selectedMemberActive: active,
            selectedMemberCentralCommittee: centralCommittee,
            selectedMemberPresidency: presidency,
            selectedMemberPresident: president,
            selectedMemberVicePresident: vicePresident,
            selectedMemberSecretary: secretary,
            selectedMemberSupervisoryBoard: supervisoryBoard,
            selectedMemberDate: date,
            selectedMemberNogomet: nogomet,
            selectedMemberRibolov: ribolov,
            selectedMemberBela: bela,
            selectedMemberlastMembership: lastMembership,
            selectedMemberPikado: pikado,
            selectedMemberHumanitarian: humanitarian,
            selectedMemberCardNum: cardNum,
            modal: !prevState.modal
              
        }));


    }

    exitMemberHandler = () => {


        this.setState(prevState=>(({modal: !prevState.modal})));


        setTimeout(() => {

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
                                                         // error modal
            if(error) {
                //this.setState({error: true});
              }
        });  

        }, 400);   
    }

    
    deleteAllHandler = () => {
        axios.delete('https://udruga-desk.firebaseio.com/member.json')       // brisanje svih clanova
                .then(response => {
                    console.log(response.data);
        });

        setTimeout(() => {

            axios.get('https://udruga-desk.firebaseio.com/member.json')
              .then(response => {
            
                const fetchedMembers = []
                for(let key in response.data) {                             // iz beckenda dobivam object pa ga moram pretvorit u array
                    fetchedMembers.push({                                   // key je id tj odredeni member
                        ...response.data[key],
                        id: key
                    
                    }) 
                }

                this.setState({members: fetchedMembers});
        })
        .catch(error => {
            if(error) {
                //this.setState({error: true});
              }
        });  

        }, 600);   
    }

    refreshMemberState = () => {
        setTimeout(() => {

            axios.get('https://udruga-desk.firebaseio.com/member.json')
              .then(response => {
            
                const fetchedMembers = []
                for(let key in response.data) {                         // iz beckenda dobivam object pa ga moram pretvorit u array
                    fetchedMembers.push({                               // key je id tj odredeni member
                        ...response.data[key],
                        id: key
                    
                    }) 
                }

                this.setState({members: fetchedMembers});
        })
        .catch(error => {
            if(error) {
               // this.setState({error: true});
              }
        });  

        }, 600);  
    }
    

    errorHandler = () => {
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }

    footballHandler = () => {

        this.setState(prevState=>({
            nogometClick: !prevState.nogometClick
        }))

       
    }

    fishingHandler = () => {

        this.setState(prevState=>({
            ribolovClick: !prevState.ribolovClick
        }))

        
    }

    cardHandler = () => {

        this.setState(prevState=>({
            belaClick: !prevState.belaClick
        }))

        
    }

    dartHandler = () => {

        this.setState(prevState=>({
            pikadoClick: !prevState.pikadoClick
        }))

      
    }

    humanitarianHandler = () => {

        this.setState(prevState=>({
            humanitarianClick: !prevState.humanitarianClick
        }))

    }

    
	
    render() {

        
        

        let nogomet = ''
        let ribolov = ''
        let bela = ''
        let pikado = ''
        let humanitarian = ''

        if(this.state.nogometClick){

            nogomet = 'nogomet'

        } else if (!this.state.nogometClick) {

            nogomet = ''
        }

        if(this.state.ribolovClick){

            ribolov = 'ribolov'

        } else if (!this.state.ribolovClick) {

            ribolov = ''
        }

        if(this.state.belaClick){

            bela = 'bela'

        }else if (!this.state.belaClick) {

            bela = ''
        }

        if(this.state.pikadoClick){
           
            pikado = 'pikado'

        } else if (!this.state.pikadoClick) {

            pikado = ''
        }

        if(this.state.humanitarianClick){

            humanitarian = 'humanitarniRad'

        } else if (!this.state.humanitarianClick) {

            humanitarian = ''
        }

    
                                                                                    // prolazi kroz cijeli form i pretvara objects u array
        const formElementsArray = [];                                      
        for (let key in this.state.form) {
            formElementsArray.push({
                id: key,
                config: this.state.form[key]
                
            });
        }
    
        let countyInput = formElementsArray.map(formElement => (
            <CountyInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementName={formElement.config.elementName}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changedCounty={(event) => this.countyChangedHandler(event, formElement.id)}
            />
        ));

        let cityInput = formElementsArray.map(formElement => (
            <CityInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementName={formElement.config.elementName}
                elementConfig={formElement.config.elementConfig}
                citySelect={this.state.form.county.elementConfig.options[this.state.form.county.valueId].city} // to je lista gradova ciji je popis unutar objekta od zupanija
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        let townshipInput = formElementsArray.map(formElement => (
            <TownshipInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementName={formElement.config.elementName}
                elementConfig={formElement.config.elementConfig}
                townshipSelect={this.state.form.county.elementConfig.options[this.state.form.county.valueId].township}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));
        

        let qualificationInput = formElementsArray.map(formElement => (
            <QualificationInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementName={formElement.config.elementName}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));


        let statusInput = formElementsArray.map(formElement => (
            <StatusInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementName={formElement.config.elementName}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        let fieldOfInterestInput = <div className="FieldOfInterest">
                    <h4>Polje interesa</h4>
                    <div>
                        <label className="interestBtns" onClick={this.footballHandler} style={{background: this.state.nogometClick ? '#343a40' : 'white', color: this.state.nogometClick ? 'white' : 'black'}}>Nogomet</label>
                        <label className="interestBtns" onClick={this.fishingHandler} style={{background: this.state.ribolovClick ? '#343a40' : 'white', color: this.state.ribolovClick ? 'white' : 'black'}}>Ribolov</label>
                        <label className="interestBtns" onClick={this.cardHandler} style={{background: this.state.belaClick ? '#343a40' : 'white', color: this.state.belaClick ? 'white' : 'black'}}>Bela</label>
                        <label className="interestBtns" onClick={this.dartHandler} style={{background: this.state.pikadoClick ? '#343a40' : 'white', color: this.state.pikadoClick ? 'white' : 'black'}}>Pikado</label>
                        <label className="interestBtns" onClick={this.humanitarianHandler} style={{background: this.state.humanitarianClick ? '#343a40' : 'white', color: this.state.humanitarianClick ? 'white' : 'black'}}>Humanitarni rad</label>
                    </div>
        </div>;

        let sexBtns = formElementsArray.map(formElement => (
            <SexBtns 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementName={formElement.config.elementName}
                elementConfig={formElement.config.elementConfig}
                sexOpt={formElement.config.sexOpt}
                value={formElement.config.value}
                innerValue={formElement.config.value}
                radioValue={this.state.radioValue}
                clickSex={(event) => this.clickSexHandler(event, formElement.id)}
            />
        ));


        let employmentBtns = formElementsArray.map(formElement => (
            <EmploymentBtns 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementName={formElement.config.elementName}
                elementConfig={formElement.config.elementConfig}
                employmentOpt={formElement.config.employmentOpt}
                value={formElement.config.value}
                radioValue={this.state.radioValue}
                clickEmployment={(event) => this.clickEmploymentHandler(event, formElement.id)}
            />
        ));


        let pensionerBtns = formElementsArray.map(formElement => (
            <PensionerBtns 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementName={formElement.config.elementName}
                elementConfig={formElement.config.elementConfig}
                pensionerOpt={formElement.config.pensionerOpt}
                value={formElement.config.value}
                radioValue={this.state.radioValue}
                clickPensioner={(event) => this.clickPensionerHandler(event, formElement.id)}
            />
        ));

        let state = this.state.members

        const fetchedMembers = []
        for(let key in state) {                             
            fetchedMembers.push({                                     
                ...state[key],
                valueId: key
            
            }) 
        }
    
        let filteredMembers = fetchedMembers.filter(
            (member) => {
                return  member.active.toLowerCase().indexOf(this.state.activeValue.toLowerCase()) !== -1 // filttrira ih prvo da vidi jesu li uopce aktivni

            }
        )

        if (this.state.searchTouched) {

            filteredMembers = fetchedMembers.filter(
                (member) => {
                    return  member.oib.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.surname.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.sex.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.birthdate.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.stateOfBirth.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.county.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.city.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.township.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.address.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.zipCode.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.tel.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.email.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.professionalTitle.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 ||
                            member.study.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1 
    
                }
            )

        } else if (this.state.boxesHandler) {     
                                                            // ako je taj div true onda je napredno pretrazivenje omoguceno
            filteredMembers = fetchedMembers.filter(                                          
                (member) => {
                    return  member.active.toLowerCase().indexOf(this.state.activeValue.toLowerCase()) !== -1 &&
                            member.county.toLowerCase().indexOf(this.state.form.county.value.toLowerCase()) !== -1 &&
                            member.city.toLowerCase().indexOf(this.state.form.city.value.toLowerCase()) !== -1 &&
                            member.township.toLowerCase().indexOf(this.state.form.township.value.toLowerCase()) !== -1 &&
                            member.qualifications.toLowerCase().indexOf(this.state.form.qualifications.value.toLowerCase()) !== -1 &&
                            member.sex.toLowerCase().indexOf(this.state.form.sex.value.toLowerCase()) !== -1 &&
                            member.employment.toLowerCase().indexOf(this.state.form.employment.value.toLowerCase()) !== -1 &&
                            member.pensioner.toLowerCase().indexOf(this.state.form.pensioner.value.toLowerCase()) !== -1  &&     
                            member.nogomet.toLowerCase().indexOf(nogomet.toLowerCase()) !== -1  && 
                            member.bela.toLowerCase().indexOf(bela.toLowerCase()) !== -1  &&           
                            member.ribolov.toLowerCase().indexOf(ribolov.toLowerCase()) !== -1  && 
                            member.pikado.toLowerCase().indexOf(pikado.toLowerCase()) !== -1 &&
                            member.humanitarian.toLowerCase().indexOf(humanitarian.toLowerCase()) !== -1
                        
                        }
            )

        } else if(this.state.searchValue === '') {
            filteredMembers = fetchedMembers.filter(
                (member) => {
                    return  member.active.toLowerCase().indexOf(this.state.activeValue.toLowerCase()) !== -1 // filttrira ih prvo da vidi jesu li uopce aktivni
    
                }
            )
        }


        
        let memberItem = null                                                                               // to je svaki clan 

        if (this.state.advancedSearch === true) {                                                           // to je filtriranje za napredno pretrazivanje

            memberItem = filteredMembers.map((i) => {                                                       // sljanje vrijednosti u memberitem kak bi ga mogao ucitat u tablic
                return(  <MemberItem 
                          key={i.id}
                          valueId={i.valueId}
                          cardNum={i.cardNum}
                          imgUrl={i.imgUrl}
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
                          id={i.id}
                          centralCommittee={i.centralCommittee}
                          presidency={i.presidency}
                          president={i.president}
                          vicePresident={i.vicePresident}
                          secretary={i.secretary}
                          supervisoryBoard={i.supervisoryBoard}
                          date={i.date}
                          lastMembership={i.lastMembership}
                          nogomet={i.nogomet}
                          ribolov={i.ribolov}
                          bela={i.bela}
                          pikado={i.pikado}
                          humanitarian={i.humanitarian}
                          refreshMemberState={this.refreshMemberState}
                          selectedMember={() => this.selectedMemberHandler(                             // onClick - kada se klikne na odredenog clana onda se podatci koji su oznaceni prebacuju u modal (Member.js)
                              i.imgUrl, i.id, i.oib, i.name, i.surname, i.sex, i.birthdate, i.stateOfBirth, i.county, i.city, 
                              i.township, i.address, i.zipCode, i.tel, i.email, i.qualifications, i.status, i.professionalTitle, i.study, i.employment, 
                              i.pensioner, i.fieldOfInterest, i.active, i.centralCommittee, i.presidency, i.president, i.vicePresident,
                              i.secretary, i.supervisoryBoard, i.date, i.nogomet, i.ribolov, i.bela, i.pikado, i.humanitarian, i.cardNum, i.valueId, i.lastMembership
                           )}
                      />
                 
                  )
              });


        } else {

            memberItem = filteredMembers.map((i) => {                                                       // filtriranje za normalan search
                return(  <MemberItem 
                        key={i.id}
                        valueId={i.valueId}
                        cardNum={i.cardNum}
                        imgUrl={i.imgUrl}
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
                        id={i.id}
                        centralCommittee={i.centralCommittee}
                        presidency={i.presidency}
                        president={i.president}
                        vicePresident={i.vicePresident}
                        secretary={i.secretary}
                        supervisoryBoard={i.supervisoryBoard}
                        date={i.date}
                        lastMembership={i.lastMembership}
                        nogomet={i.nogomet}
                        ribolov={i.ribolov}
                        bela={i.bela}
                        pikado={i.pikado}
                        humanitarian={i.humanitarian}
                        refreshMemberState={this.refreshMemberState}
                        selectedMember={() => this.selectedMemberHandler(
                            i.imgUrl, i.id, i.oib, i.name, i.surname, i.sex, i.birthdate, i.stateOfBirth, i.county, i.city, 
                            i.township, i.address, i.zipCode, i.tel, i.email, i.qualifications, i.status, i.professionalTitle, i.study, i.employment, 
                            i.pensioner, i.fieldOfInterest, i.active, i.centralCommittee, i.presidency, i.president, i.vicePresident,
                            i.secretary, i.supervisoryBoard, i.date, i.nogomet, i.ribolov, i.bela, i.pikado, i.humanitarian, i.cardNum, i.valueId, i.lastMembership
                        )}
                />
                 
                  )
              });

        }


        const emails = Object.keys(filteredMembers).map(function(key) {                                     // mail-ovi kojima se salje obavijest o placanju clanarine
            return filteredMembers[key].email;
          });

     
        let titles = this.state.titles.map((item) => {
            return (
                <th key={item.name}>
                    {item.name}
                </th>
            )

            })


            let xmlMap = this.state.members.map(i => {
                return <p>
                        {'<row>'}
                            <p>{'<ime>' + i.name +'</ime>'}</p>
                            <p>{'<prezime>' + i.nsurnameame +'</prezime>'}</p>
                            <p>{'<oib>' + i.oib +'</oib>'}</p>
                            <p>{'<datumrodenja>' + i.birthdate +'</datumrodenja>'}</p>
                            <p>{'<drzavarodenja>' + i.stateOfBirth +'</drzavarodenja>'}</p>
                            <p>{'<spol>' + i.sex +'</spol>'}</p>
                            <p>{'<zupanija>' + i.county +'</zupanija>'}</p>
                            <p>{'<grad>' + i.city +'</grad>'}</p>
                            <p>{'<opcina>' + i.township +'</opcina>'}</p>
                            <p>{'<adresa>' + i.address +'</adresa>'}</p>
                            <p>{'<postanskibroj>' + i.zipCode +'</postanskibroj>'}</p>
                            <p>{'<email>' + i.email +'</email>'}</p>
                            <p>{'<telefon>' + i.tel +'</telefon>'}</p>
                            <p>{'<zaoposlenje>' + i.employment +'</zaoposlenje>'}</p>
                            <p>{'<umirovljenik>' + i.pensioner +'</umirovljenik>'}</p>
                            <p>{'<strucnasprema>' + i.qualifications +'</strucnasprema>'}</p>
                            <p>{'<studij>' + i.study +'</studij>'}</p>
                            <p>{'<strucnozvanje>' + i.professionalTitle +'</strucnozvanje>'}</p>
                            <p>{'<bela>' + ((i.bela === 'Bela') ? 'Da' : 'Ne') +'</bela>'}</p>
                            <p>{'<humanitarnirad>' + ((i.humanitarian === 'Humanitarni rad') ? 'Da' : 'Ne') +'</humanitarnirad>'}</p>
                            <p>{'<nogomet>' + ((i.nogomet === 'Nogomet') ? 'Da' : 'Ne') +'</nogomet>'}</p>
                            <p>{'<pikado>' + ((i.pikado === 'Pikado') ? 'Da' : 'Ne') +'</pikado>'}</p>
                            <p>{'<ribolov>' + ((i.ribolov === 'Ribolov') ? 'Da' : 'Ne') +'</ribolov>'}</p>
                            <p>{'<predsjenik>' + ((i.president === 'Predsjednik') ? 'Da' : 'Ne') +'</predsjenik>'}</p>
                            <p>{'<dopresjednik>' + ((i.vicePresident === 'Dopredsjednik') ? 'Da' : 'Ne' )+'</dopresjednik>'}</p>
                            <p>{'<clansredisnjegodbora>' + ((i.centralCommittee === 'Član središnjeg odbora') ? 'Da' : 'Ne') +'</clansredisnjegodbora>'}</p>
                            <p>{'<clanpredsjednistva>' + ((i.presidency === 'Član predsjedništva') ? 'Da' : 'Ne') +'</clanpredsjednistva>'}</p>
                            <p>{'<tajnik>' + ((i.secretary === 'Tajnik')? 'Da' : 'Ne') +'</tajnik>'}</p>
                            <p>{'<clannadzornogodbora>' + ((i.supervisoryBoard === 'Član nadzornog odbora') ? 'Da' : 'Ne') +'</clannadzornogodbora>'}</p>
                            <p>{'<datumupisa>' + i.date +'</datumupisa>'}</p>
                            <p>{'<aktivanclan>' + i.active +'</aktivanclan>'}</p>
                            <p>{'<zadnjaclanarina>' + i.lastMembership +'</zadnjaclanarina>'}</p>
                            <p>{'<brojiskaznice>' + i.cardNum +'</brojiskaznice>'}</p>
                        {'</row>'}
                    </p>
            })

            let xml = <p>
                {'<?xml version="1.0" encoding="UTF-8" ?>' + '<root>' + '</root>'}
            </p>



        return(

           

            <Aux>
                <div className="searchBox">
                    
                    <div className="Search">
                        <input type="text" className="InputSearch" placeholder="Pretraži..."  value={this.state.searchValue} onChange={(e) => this.searchChange(e)} />
                    </div>

                    <div className="searchBoxesWrap">
                        <div className="advancedSearch" onClick={this.advancedSearch}>{this.state.advancedSearch ? <img style={{height:'30px',width:'48px'}} src={up}/> : <img style={{height:'30px',width:'48px'}} src={down}/>} <span style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>Napredno pretraživanje</span> </div>
                            <div className="searchBoxes" onClick={this.boxesHandler} style={{display: this.state.advancedSearch ? 'flex' : 'none'}}>
                                {countyInput}
                                {cityInput}
                                {townshipInput}
                                {qualificationInput}
                                {
                                //statusInput
                                }
                                {fieldOfInterestInput}
                                {sexBtns}
                                {employmentBtns}
                                {pensionerBtns}
                                <button onClick={this.clearAllHandler}>Očisti sve</button>
                            </div>
                    </div>

                    <div onClick={this.exportToXml} style={{maxWidth:'10%', background: '#69cc9e', padding: '7px', color: 'white', borderRadius: '5px', textAlign:'center', cursor: 'pointer'}}>
                        Prebaci u Excel
                    </div>

                    <div id="xml" style={{display: 'none'}}>
                    {'<?xml version="1.0" encoding="UTF-8" ?>' + '<root>'}{xmlMap}{'</root>'}
                    </div>

                </div>


                <div className="tableWrap">

                    <table style={{width: '100%'}}>
                        <thead>
                            <tr>
                                {titles}
                            </tr>
                        </thead>
                        {filteredMembers.length ? 
                            <tbody>
                                {memberItem}
                            </tbody> 
                            : <tbody><tr style={{textAlign: 'center',background: 'none'}}><td colSpan="13" style={{borderRight: '0px'}}>Nema aktivnih članova.</td></tr></tbody>
                        }
                    </table>

                </div>

                <Member                                                                         // modalni prozor kad se odabere neki clan
                    key={this.state.selectedMemberId}                                           // salju se podaci iz MemberItema da se zna o kojem se clanu radi i onda se to salje u funkciju i onda se mjenja state koji je tu podesen
                    selectedMemberCardNum={this.state.selectedMemberCardNum}
                    selectedMemberValueId={this.state.selectedMemberValueId}
                    selectedMemberImg={this.state.selectedMemberImg}
                    selectedMemberId={this.state.selectedMemberId}
                    selectedMemberOib={this.state.selectedMemberOib}
                    selectedMemberName={this.state.selectedMemberName}
                    selectedMemberSurname={this.state.selectedMemberSurname}
                    selectedMemberSex={this.state.selectedMemberSex}
                    selectedMemberBirthday={this.state.selectedMemberBirthday}
                    selectedMemberStateOfBirth={this.state.selectedMemberStateOfBirth}
                    selectedMemberCounty={this.state.selectedMemberCounty}
                    selectedMemberCity={this.state.selectedMemberCity}
                    selectedMemberTownship={this.state.selectedMemberTownship}
                    selectedMemberAddress={this.state.selectedMemberAddress}
                    selectedMemberZipCode={this.state.selectedMemberZipCode}
                    selectedMemberTel={this.state.selectedMemberTel}
                    selectedMemberEmail={this.state.selectedMemberEmail}
                    selectedMemberQualifications={this.state.selectedMemberQualifications}
                    //selectedMemberStatus={this.state.selectedMemberStatus}
                    selectedMemberProfessionalTitle={this.state.selectedMemberProfessionalTitle}
                    selectedMemberStudy={this.state.selectedMemberStudy}
                    selectedMemberEmployment={this.state.selectedMemberEmployment}
                    selectedMemberPensioner={this.state.selectedMemberPensioner}
                    selectedMemberNogomet={this.state.selectedMemberNogomet}
                    selectedMemberRibolov={this.state.selectedMemberRibolov}
                    selectedMemberBela={this.state.selectedMemberBela}
                    selectedMemberPikado={this.state.selectedMemberPikado}
                    selectedMemberHumanitarian={this.state.selectedMemberHumanitarian}
                    selectedMemberCentralCommittee={this.state.selectedMemberCentralCommittee}
                    selectedMemberPresidency={this.state.selectedMemberPresidency}
                    selectedMemberPresident={this.state.selectedMemberPresident}
                    selectedMemberVicePresident={this.state.selectedMemberVicePresident}
                    selectedMemberSecretary={this.state.selectedMemberSecretary}
                    selectedMemberSupervisoryBoard={this.state.selectedMemberSupervisoryBoard}
                    selectedMemberDate={this.state.selectedMemberDate}
                    selectedMemberlastMembership={this.state.selectedMemberlastMembership}
                    selectedMember={this.state.modal}
                    exitMemberHandler={this.exitMemberHandler}
                />

                <NotificationForm 
                    subject={this.state.subject}
                    textareaValue={this.state.msg}
                    emails={Object(emails)}
                    submitHandler={this.submitHandler}
                    changeHandler={(e) => this.changeHandler(e)}
                    submitClickHandler={this.submitClickHandler}
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


export default connect(mapStateToProps)(SearchMember);

/*
                                <th className="DeleteButtonTh"><button>Deaktivacija</button></th>

*/