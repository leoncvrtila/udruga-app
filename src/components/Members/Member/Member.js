import React, {Component} from 'react'
import axios from 'axios'
import Aux from '../../../hoc/Aux'
import Error from '../../../hoc/Error'

import {storage} from '../../../firebase/firebase'

import CountyInput from '../Input/countyInput'
import CityInput from '../Input/cityInput'
import TownshipInput from '../Input/townshipInput'
import QualificationInput from '../Input/qualificationInput'
import StatusInput from '../Input/statusInput'
import CentralCommitteeInput from '../Input/centralCommitteeInput'
import PresidencyInput from '../Input/presidencyInput'
import PresidentInput from '../Input/presidentInput'
import VicePresidentInput from '../Input/vicePresidentInput'
import SecretaryInput from '../Input/secretaryInput'
import SupervisoryBoardInput from '../Input/supervisoryBoardInput'

import placeholder from '../../../assets/images/placeholder.png'


class Member extends Component {                                            // modalni prozor koji se otvara klikom na clana



    state={
        form:[],
        valueCardNum: '',
        valueOib: '',           // vrijednosti su postavljene na '' tako da ukoliko dode do izmejene da se to spremi u state i onda posalje u bazu
        valueBirthday: '',
        valueCounty: '',
        valueCity: '',
        valueTownship: '',
        valueAddress: '',
        valueZipCode: '',
        valueTel: '',
        valueEmail: '',
        valueQualifications: '',
        valueStatus: '',
        valueProTitle: '',
        valueStudy: '',
        valueEmployment: '',
        valuePensioner: '',
        valueNogomet: '',
        valueRibolov: '',
        valueBela: '',
        valuePikado: '',
        valueHumanitarian: '',
        valueNoneInterest: '',
        valueCentralCommittee: '',
        valuePresidency: '',
        valuePresident: '',
        valueVicePresident: '',
        valueSecretary: '',
        valueSupervisoryBoard: '',
        valueDate: '',
        isInEditModeCardNum: false,
        isInEditModeOib: false,                                             // postaje true doubleClickom 
        isInEditModeBirthday: false,
        isInEditModeCounty: false,
        isInEditModeCity: false,
        isInEditModeTownship: false,
        isInEditModeAddress: false,
        isInEditModeZipCode: false,
        isInEditModeTel: false,
        isInEditModeEmail: false,
        isInEditModeQualifications: false,
        isInEditModeStatus: false,
        isInEditModeProTitle: false,
        isInEditModeStudy: false,
        isInEditModeEmployment: false,
        isInEditModePensioner: false,
        isInEditModeFieldOfInterest: false,
        isInEditModeCentralCommittee: false,
        isInEditModePresidency: false,
        isInEditModePresident: false,
        isInEditModeVicePresident: false,
        isInEditModeSecretary: false,
        isInEditModeSupervisoryBoard: false,
        nogomet: false,
        ribolov: false,
        bela: false,
        pikado: false,
        humanitarian: false,
        noneInterest: false,
        modal: false,
        radioValue: null,
        error: false,
        image: null, 							// slika koja se ucita kada se odabere 
		url: '', 								// url ucitane slike nakon sta se uploada na firebase
		percentage: null 						// postotak koji se prikaze prilikom postavljanja slike - da korisnik zna koliko treba
    }

    componentDidMount() {


        axios.get('https://udruga-desk.firebaseio.com/form.json')
          .then(response => {
              this.setState({form: response.data});
          })
          .catch(error => {
              if(error) {
                this.setState({error: true});
              }
            
        });  


        if(this.props.selectedMemberNogomet === 'Nogomet') {
            this.setState({
                nogomet: true,
                valueNogomet: 'Nogomet'
            })
        }

        if(this.props.selectedMemberBela === 'Bela') {
            this.setState({
                bela: true,
                valueBela: 'Bela'
            })
        }

        if(this.props.selectedMemberRibolov === 'Ribolov') {
            this.setState({
                ribolov: true,
                valueRibolov: 'Ribolov'
            })
        }

        if(this.props.selectedMemberPikado === 'Pikado') {
            this.setState({
                pikado: true,
                valuePikado: 'Pikado'
            })
        }


        if(this.props.selectedMemberHumanitarian === 'humanitarniRad') {
            this.setState({
                humanitarian: true,
                valueHumanitarian: 'humanitarniRad'
            })
        }
    }

    deleteMemberHandler = () => {
        /*axios.delete('https://udruga-desk.firebaseio.com/member/' + this.props.selectedMemberId + '.json')       // brisanje clana
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            if(error) {
                this.setState({error: true});
              }
        });  */

        axios.put('https://udruga-desk.firebaseio.com/member/' + this.props.selectedMemberId + '.json', {  // deaktivacija clana - prvo brisanje pa postavljanje active na 'ne' 
            cardNum:this.props.selectedMemberCardNum,
            imgUrl: this.props.selectedMemberImg,
            name: this.props.selectedMemberName,
            surname: this.props.selectedMemberSurname,
            oib: this.props.selectedMemberOib,
            sex: this.props.selectedMemberSex,
            birthdate: this.props.selectedMemberBirthday,
            stateOfBirth: this.props.selectedMemberStateOfBirth,
            county: this.props.selectedMemberCounty,
            city: this.props.selectedMemberCity,
            township: this.props.selectedMemberTownship,
            address: this.props.selectedMemberAddress,
            zipCode: this.props.selectedMemberZipCode,
            tel: this.props.selectedMemberTel,
            email: this.props.selectedMemberEmail,
            qualifications: this.props.selectedMemberQualifications,
            status: this.props.selectedMemberStatus,
            professionalTitle: this.props.selectedMemberProfessionalTitle,
            study: this.props.selectedMemberStudy,
            employment: this.props.selectedMemberEmployment,
            pensioner: this.props.selectedMemberPensioner,
            nogomet: this.props.selectedMemberNogomet,
			ribolov: this.props.selectedMemberRibolov,
			bela: this.props.selectedMemberBela,
            pikado: this.props.selectedMemberPikado,
            humanitarian: this.props.selectedMemberHumanitarian,
            active: 'Ne',
            centralCommittee:this.props.selectedMemberCentralCommittee,
            presidency: this.props.selectedMemberPresidency,
            president: this.props.selectedMemberPresident,
            vicePresident: this.props.selectedMemberVicePresident,
            secretary: this.props.selectedMemberSecretary,
            supervisoryBoard: this.props.selectedMemberSupervisoryBoard,
            date: this.props.selectedMemberDate,
            lastMembership: this.props.selectedMemberlastMembership
            })
            .then(response => {

            })
            .catch(error => {
                if(error) {
                    this.setState({error: true});
                  }
            });  

    }
    


    changeEditModeCardNum = () => {                                                     // mjenjanje edit modea onClick

        this.setState(prevState => ({
            isInEditModeCardNum: !prevState.isInEditModeCardNum
        }))

    }

    changeEditModeOib = () => {                                                                    

        this.setState(prevState => ({
            isInEditModeOib: !prevState.isInEditModeOib
        }))

    }

    changeEditModeBirthday = () => {

        this.setState(prevState => ({
            isInEditModeBirthday: !prevState.isInEditModeBirthday
        }))

    }

    changeEditModeResidence = () => {
        this.setState(prevState => ({
            isInEditModeCounty: !prevState.isInEditModeCounty,
            isInEditModeCity: !prevState.isInEditModeCity,
            isInEditModeTownship: !prevState.isInEditModeTownship
        }))
    }

    changeEditModeCounty = () => {

        this.setState(prevState => ({
            isInEditModeCounty: !prevState.isInEditModeCounty
        }))

    }

    changeEditModeCity = () => {

        this.setState(prevState => ({
            isInEditModeCity: !prevState.isInEditModeCity
        }))

    }

    changeEditModeTownship = () => {

        this.setState(prevState => ({
            isInEditModeTownship: !prevState.isInEditModeTownship
        }))

    }

    changeEditModeAddress = () => {

        this.setState(prevState => ({
            isInEditModeAddress: !prevState.isInEditModeAddress
        }))

    }

    changeEditModeZipCode = () => {

        this.setState(prevState => ({
            isInEditModeZipCode: !prevState.isInEditModeZipCode
        }))

    }

    changeEditModeTel = () => {

        this.setState(prevState => ({
            isInEditModeTel: !prevState.isInEditModeTel
        }))

    }

    changeEditModeEmail = () => {

        this.setState(prevState => ({
            isInEditModeEmail: !prevState.isInEditModeEmail
        }))

    }

    changeEditModeQualifications = () => {

        this.setState(prevState => ({
            isInEditModeQualifications: !prevState.isInEditModeQualifications
        }))

    }

    changeEditModeStatus = () => {

        this.setState(prevState => ({
            isInEditModeStatus: !prevState.isInEditModeStatus
        }))

    }

    changeEditModeProTitle = () => {

        this.setState(prevState => ({
            isInEditModeProTitle: !prevState.isInEditModeProTitle
        }))

    }

    changeEditModeStudy = () => {

        this.setState(prevState => ({
            isInEditModeStudy: !prevState.isInEditModeStudy
        }))

    }

    changeEditModeEmployment = () => {

        this.setState(prevState => ({
            isInEditModeEmployment: !prevState.isInEditModeEmployment
        }))

    }

    changeEditModePensioner = () => {

        this.setState(prevState => ({
            isInEditModePensioner: !prevState.isInEditModePensioner
        }))

    }

    changeEditModeFieldOfInterest = () => {

        this.setState(prevState => ({
            isInEditModeFieldOfInterest: !prevState.isInEditModeFieldOfInterest
        }))

    }

    changeEditModeCentralCommittee = () => {

        this.setState(prevState => ({
            isInEditModeCentralCommittee: !prevState.isInEditModeCentralCommittee
        }))

    }

    changeEditModePresidency = () => {

        this.setState(prevState => ({
            isInEditModePresidency: !prevState.isInEditModePresidency
        }))

    }

    changeEditModePresident = () => {

        this.setState(prevState => ({
            isInEditModePresident: !prevState.isInEditModePresident
        }))

    }

    changeEditModeVicePresident = () => {

        this.setState(prevState => ({
            isInEditModeVicePresident: !prevState.isInEditModeVicePresident
        }))

    }

    changeEditModeSecretary = () => {

        this.setState(prevState => ({
            isInEditModeSecretary: !prevState.isInEditModeSecretary
        }))

    }

    changeEditModeSupervisoryBoard = () => {

        this.setState(prevState => ({
            isInEditModeSupervisoryBoard: !prevState.isInEditModeSupervisoryBoard
        }))

    }

   
    updateCardNumValue = () => {                                                                          // upadateanje vrijednosti i postavljanje statea
        this.setState({
            isInEditModeCardNum: false,
            valueCardNum: this.refs.theCardNumInput.value
        })
    }
   
   
    updateOibValue = () => {                                                                                     
        this.setState({
            isInEditModeOib: false,
            valueOib: this.refs.theOibInput.value
        })
    
    }
    updateBirthdayValue = () => {
        this.setState({
            isInEditModeBirthday: false,
            valueBirthday: this.refs.theBirthdayInput.value
        })
    }

    updateCountyValue = () => {

        if(this.state.form.county.value !== 'Odaberi') {
            this.setState({
                isInEditModeCounty: false,
                valueCounty: this.state.form.county.value
            })
        } else {
            this.setState({
                isInEditModeCounty: false,
                valueCounty: this.props.selectedMemberCounty
            })
        }
        
    }

    updateCityValue = () => {

        if((this.state.form.city.value !== 'Odaberi') || (this.state.form.township.value !== 'Odaberi') || (this.props.selectedMemberTownship === true)){
            this.setState({
                isInEditModeCity: false,
                valueCity: this.state.form.city.value
            })
        } else {
            this.setState({
                isInEditModeCity: false,
                valueCity: this.props.selectedMemberCity
            })
        }
        
    }

    updateTownshipValue = () => {

        if((this.state.form.township.value !== 'Odaberi') || (this.state.form.city.value !== 'Odaberi') || (this.props.selectedMemberCity === true)) {
            this.setState({
                isInEditModeTownship: false,
                valueTownship: this.state.form.township.value
            })
        } else {
            this.setState({
                isInEditModeTownship: false,
                valueTownship: this.props.selectedMemberTownship
            })
        }
        
    }

    updateAddressValue = () => {
        this.setState({
            isInEditModeAddress: false,
            valueAddress: this.refs.theAddressInput.value
        })
    }

    updateZipCodeValue = () => {
        this.setState({
            isInEditModeZipCode: false,
            valueZipCode: this.refs.theZipCodeInput.value
        })
    }

    updateTelValue = () => {
        this.setState({
            isInEditModeTel: false,
            valueTel: this.refs.theTelInput.value
        })
    }

    updateEmailValue = () => {
        this.setState({
            isInEditModeEmail: false,
            valueEmail: this.refs.theEmailInput.value
        })
    }

    updateQualificationsValue = () => {

        if(this.state.form.qualifications.value !== 'Odaberi') {
            this.setState({
                isInEditModeQualifications: false,
                valueQualifications: this.state.form.qualifications.value
            })
        } else {
            this.setState({
                isInEditModeQualifications: false,
                valueQualifications: this.props.selectedMemberQualifications
            })
        }
        
    }

    updateStatusValue = () => {

        if(this.state.form.status.value !== 'Odaberi') {
            this.setState({
                isInEditModeStatus: false,
                valueStatus: this.state.form.status.value
            })
        } else {
            this.setState({
                isInEditModeStatus: false,
                valueStatus: this.props.selectedMemberStatus
            })
        }
        
    }

    updateProTitleValue = () => {
        this.setState({
            isInEditModeProTitle: false,
            valueProTitle: this.refs.theProTitleInput.value
        })
    }

    updateStudyValue = () => {
        this.setState({
            isInEditModeStudy: false,
            valueStudy: this.refs.theStudyInput.value
        })
    }

    updateEmploymentValue = () => {

        if(this.refs.theEmploymentInput.value !== 'Odaberi') {
            this.setState({
                isInEditModeEmployment: false,
                valueEmployment: this.refs.theEmploymentInput.value
            })
        } else {
            this.setState({
                isInEditModeEmployment: false,
                valueEmployment: this.props.selectedMemberEmployment
            })
        }
        
    }

    updatePensionerValue = () => {

        if(this.refs.thePensionerInput.value !== 'Odaberi') {
            this.setState({
                isInEditModePensioner: false,
                valuePensioner: this.refs.thePensionerInput.value
            })
        } else {
            this.setState({
                isInEditModePensioner: false,
                valuePensioner: this.props.selectedMemberPensioner
            })
        }
        
    }


    nogometHandler = () =>{                                                                                 // mjenja vrijednost polja interesa ali samo ako nije odabrano '/'

        if(this.state.noneInterest){
            this.setState(prevState=>({
                nogomet: false,
                valueNogomet: ''
            }))
        } else {
            this.setState(prevState=>({
                nogomet: !prevState.nogomet
            }))
        }

        if(this.state.nogomet) {
            this.setState({
                valueNogomet: 'Nogomet'
            })
        }

		

	}

	ribolovHandler = () =>{

        if(this.state.noneInterest){
            this.setState(prevState=>({
                ribolov: false,
                valueRibolov: ''
            }))
        } else {
            this.setState(prevState=>({
                ribolov: !prevState.ribolov
            }))
        }
        
        if(this.state.ribolov) {
            this.setState({
                valueRibolov: 'Ribolov'
            })
        }

	}

	belaHandler = () =>{

        if(this.state.noneInterest) {
            this.setState(prevState=>({
                bela: false,
                valueBela: ''
            }))
        } else {
            this.setState(prevState=>({
                bela: !prevState.bela
            }))
        }

        if(this.state.bela) {
            this.setState({
                valueBela: 'Bela'
            })
        }
		

	}

	pikadoHandler = () =>{

        if(this.state.noneInterest) {
            this.setState(prevState=>({
                pikado: false,
                valuePikado: ''
            }))
        } else {
            this.setState(prevState=>({
                pikado: !prevState.pikado
            }))
        }
        
        if(this.state.pikado) {
            this.setState({
                valuePikado: 'Pikado'
            })
        }

    }

    humanitarianHandler = () =>{

        if(this.state.noneInterest) {
            this.setState(prevState=>({
                humanitarian: false,
                valueHumanitarian: ''
            }))
        } else {
            this.setState(prevState=>({
                humanitarian: !prevState.humanitarian
            }))
        }
        
        if(this.state.humanitarian) {
            this.setState({
                valueHumanitarian: 'humanitarniRad'
            })
        }

    }
    
    noneInterestHandler = () =>{                                                                        // ukoliko je odabrano '/' onda sve drugo je false i ne moze biti true sve dok je to odabrano

        this.setState(prevState=>({
            noneInterest: !prevState.noneInterest,
            nogomet: false,
            ribolov: false,
            bela: false,
            pikado: false,
            humanitarian: false
        }))

        if(this.state.noneInterest !== true) {
            
            this.setState(prevState=>({
                nogomet: null,
                ribolov: null,
                bela: null,
                pikado: null,
                humanitarian: null
            }))
           
        }

        if(this.state.noneInterest) {
            this.setState({
                valueNoneInterest: '/'
            })
        }
		

	}


    updateFieldOfInterestValue = () => {                                                               // postavljanje state i zatvaranje edit modea ovisno o odabiru


        if(this.state.nogomet || this.state.ribolov || this.state.bela || this.state.pikado || this.state.humanitarian || this.state.noneInterest) {

            if(this.state.noneInterest) {
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valueNoneInterest: '/',
                    valueNogomet: '',
                    valueRibolov: '',
                    valueBela: '',
                    valuePikado: '',
                    valueHumanitarian: ''           
                })
            } else if(this.state.noneInterest !== true) {           // none interest
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valueNoneInterest: ''
                })
            }

            if(this.state.nogomet) {                                // nogomet
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valueNogomet: 'Nogomet'
                })
            } else if(this.state.nogomet !== true) {
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valueNogomet: ''
                })
            }
    
            if(this.state.ribolov) {                                // ribolov
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valueRibolov: 'Ribolov'
                })
            } else if(this.state.ribolov !== true) {
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valueRibolov: ''
                })
            }

            if(this.state.bela) {                                    // bela
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valueBela: 'Bela'
                })
            } else if(this.state.bela !== true) {
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valueBela: ''
                })
            }

            if(this.state.pikado) {                                   // pikado
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valuePikado: 'Pikado'
                })
            } else if(this.state.pikado !== true) {
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valuePikado: ''
                })
            }

            if(this.state.humanitarian) {                               // humanitarni rad
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valueHumanitarian: 'humanitarniRad'
                })
            } else if(this.state.humanitarian !== true) {
                this.setState({
                    isInEditModeFieldOfInterest: false,
                    valueHumanitarian: ''
                })
            }

        } else {
            this.setState({
                isInEditModeFieldOfInterest: false,
                valueNogomet: this.props.selectedMemberNogomet,
                valueRibolov: this.props.selectedMemberRibolov,
                valueBela: this.props.selectedMemberBela,
                valuePikado: this.props.selectedMemberPikado,
                valueHumanitarian: this.props.selectedMemberHumanitarian            
            })
        }
    
       
    }

    updateCentralCommitteeValue = () => {

        if(this.state.form.centralCommittee.value !== 'Odaberi') {
            this.setState({
                isInEditModeCentralCommittee: false,
                valueCentralCommittee: this.state.form.centralCommittee.value
            })
        } else {
            this.setState({
                isInEditModeCentralCommittee: false,
                valueCentralCommittee: this.props.selectedMemberCentralCommittee
            })
        }
        
    }

    updatePresidencyValue = () => {

        if(this.state.form.presidency.value !== 'Odaberi') {
            this.setState({
                isInEditModePresidency: false,
                valuePresidency: this.state.form.presidency.value
            })
        } else {
            this.setState({
                isInEditModePresidency: false,
                valuePresidency: this.props.selectedMemberPresidency
            })
        }
        
    }

    updatePresidentValue = () => {

        if(this.state.form.president.value !== 'Odaberi') {
            this.setState({
                isInEditModePresident: false,
                valuePresident: this.state.form.president.value
            })
        } else {
            this.setState({
                isInEditModePresident: false,
                valuePresident: this.props.selectedMemberPresident
            })
        }
        
    }

    updateVicePresidentValue = () => {

        if(this.state.form.vicePresident.value !== 'Odaberi') {
            this.setState({
                isInEditModeVicePresident: false,
                valueVicePresident: this.state.form.vicePresident.value
            })
        } else {
            this.setState({
                isInEditModeVicePresident: false,
                valueVicePresident: this.props.selectedMemberVicePresident
            })
        }
        
    }

    updateSecretaryValue = () => {

        if(this.state.form.secretary.value !== 'Odaberi') {
            this.setState({
                isInEditModeSecretary: false,
                valueSecretary: this.state.form.secretary.value
            })
        } else {
            this.setState({
                isInEditModeSecretary: false,
                valueSecretary: this.props.selectedMemberSecretary
            })
        }
        
    }

    updateSupervisoryBoardValue = () => {

        if(this.state.form.supervisoryBoard.value !== 'Odaberi') {
            this.setState({
                isInEditModeSupervisoryBoard: false,
                valueSupervisoryBoard: this.state.form.supervisoryBoard.value
            })
        } else {
            this.setState({
                isInEditModeSupervisoryBoard: false,
                valueSupervisoryBoard: this.props.selectedMemberSupervisoryBoard
            })
        }
        
    }

    countyChangedHandler = (event, formName) => {                                               // county

		
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

    inputChangedHandler = (event, formName) => {                                            // city, township, qualifications, status, fieldOfInterest
	   
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

    clickEmploymentHandler = (event, formName) => {                                         // employment

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

	clickPensionerHandler = (event, formName) => {                                          // pensioner

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

    exitMemberHandler = () => {

        const state = this.state

        if(                                                                             // provjerava je li doslo do izmjena u nekom podatku i ukoliko je onda brise odabranog clana i 
                                                                                        // salje istog sa novim podacima, ako nije nista promjenjeno onda samo izadi
            (state.url !== '') ||
            (state.valueCardNum !== '') ||
            (state.valueOib !== '') ||
            (state.valueBirthday !== '') ||
            (state.valueCounty !== '') ||
            (state.valueCity !== '') ||
            (state.valueTownship !== '') ||
            (state.valueAddress !== '') ||
            (state.valueZipCode !== '') ||
            (state.valueTel !== '') ||
            (state.valueEmail !== '') ||
            (state.valueQualifications !== '') ||
            (state.valueStatus !== '') ||
            (state.valueProTitle !== '') ||
            (state.valueStudy !== '') ||
            (state.valueEmployment !== '') ||
            (state.valuePensioner !== '') ||
            (state.valueCentralCommittee !== '') ||
            (state.valuePresidency !== '') ||
            (state.valuePresident !== '') ||
            (state.valueVicePresident !== '') ||
            (state.valueSecretary !== '') ||
            (state.valueSupervisoryBoard !== '') ||
            (state.valueNoneInterest !== '')
        ) {

        axios.put('https://udruga-desk.firebaseio.com/member/' + this.props.selectedMemberId + '.json', {                                                       // slanje novog clana
            cardNum: this.state.valueCardNum ? this.state.valueCardNum : this.props.selectedMemberCardNum,
            imgUrl: this.state.url ? this.state.url : this.props.selectedMemberImg,
            oib: this.state.valueOib ? this.state.valueOib : this.props.selectedMemberOib,
            name: this.props.selectedMemberName,
            surname: this.props.selectedMemberSurname,
            sex: this.props.selectedMemberSex,
            birthdate: this.state.valueBirthday ? this.state.valueBirthday : this.props.selectedMemberBirthday,
            stateOfBirth: this.props.selectedMemberStateOfBirth,
            county: this.state.valueCounty ? this.state.valueCounty : this.props.selectedMemberCounty,
            city: this.state.valueCity ? this.state.valueCity : this.props.selectedMemberCity,
            township: this.state.valueTownship ? this.state.valueTownship : this.props.selectedMemberTownship,
            address: this.state.valueAddress ? this.state.valueAddress : this.props.selectedMemberAddress,
            zipCode: this.state.valueZipCode ? this.state.valueZipCode : this.props.selectedMemberZipCode,
            tel: this.state.valueTel ? this.state.valueTel : this.props.selectedMemberTel,
            email: this.state.valueEmail ? this.state.valueEmail : this.props.selectedMemberEmail,
            qualifications: this.state.valueQualifications ? this.state.valueQualifications : this.props.selectedMemberQualifications,
            status: this.state.valueStatus ? this.state.valueStatus : this.props.selectedMemberStatus,
            active: 'da',
            professionalTitle: this.state.valueProTitle ? this.state.valueProTitle : this.props.selectedMemberProfessionalTitle,
            study: this.state.valueStudy ? this.state.valueStudy : this.props.selectedMemberStudy,
            employment: this.state.valueEmployment ? this.state.valueEmployment : this.props.selectedMemberEmployment,
            pensioner: this.state.valuePensioner ? this.state.valuePensioner : this.props.selectedMemberPensioner,
            nogomet: this.state.noneInterest ? '/' : this.state.valueNogomet,
            ribolov: this.state.noneInterest ? '/' : this.state.valueRibolov,
            bela: this.state.noneInterest ? '/' : this.state.valueBela,
            pikado: this.state.noneInterest ? '/' : this.state.valuePikado,
            humanitarian: this.state.noneInterest ? '/' : this.state.valueHumanitarian,
            centralCommittee: this.state.valueCentralCommittee ? this.state.valueCentralCommittee : this.props.selectedMemberCentralCommittee,
            presidency: this.state.valuePresidency ? this.state.valuePresidency : this.props.selectedMemberPresidency,
            president: this.state.valuePresident ? this.state.valuePresident : this.props.selectedMemberPresident,
            vicePresident: this.state.valueVicePresident ? this.state.valueVicePresident : this.props.selectedMemberVicePresident,
            secretary: this.state.valueSecretary ? this.state.valueSecretary : this.props.selectedMemberSecretary,
            supervisoryBoard: this.state.valueSupervisoryBoard ? this.state.valueSupervisoryBoard : this.props.selectedMemberSupervisoryBoard,
            date: this.props.selectedMemberDate,
            lastMembership: this.props.selectedMemberlastMembership
        })
        .then(response => {

        })
        .catch(error => {
            if(error) {
                this.setState({error: true});
              }
        });  

        this.setState({                                              // state se mora postaviti opet na null jer inace se u novom clanu pojavljivat podaci iz prethodno odabranog clana
            valueCardNum: '',
            valueOib: '',
            valueBirthday: '',
            valueCounty: '',
            valueCity: '',
            valueTownship: '',
            valueAddress: '',
            valueZipCode: '',
            valueTel: '',
            valueEmail: '',
            valueQualifications: '',
            valueStatus: '',
            valueProTitle: '',
            valueStudy: '',
            valueEmployment: '',
            valuePensioner: '',
            valueNogomet: '',
            valueRibolov: '',
            valueBela: '',
            valuePikado: '',
            valueHumanitarian: '',
            valueCentralCommittee: '',
            valuePresidency: '',         
            valuePresident: '',
            valueVicePresident: '',
            valueSecretary: '',
            valueSupervisoryBoard: '',
            image: null, 							 
		    url: '', 								
		    percentage: null 	
        })

        }
 
        if (                                   // ukoliko je otvoren i jedan prozor da se uredi podatak i ako nakon toga nije zatvoren onda pri izlasku iz modala zatvori prozor
            (this.state.isInEditModeCardNum === true) ||
            (this.state.isInEditModeOib === true) ||
            (this.state.isInEditModeBirthday === true) ||
            (this.state.isInEditModeCounty === true) ||
            (this.state.isInEditModeCity === true) ||
            (this.state.isInEditModeTownship === true) ||
            (this.state.isInEditModeAddress === true) ||
            (this.state.isInEditModeZipCode === true) ||
            (this.state.isInEditModeTel === true) ||
            (this.state.isInEditModeEmail === true) ||
            (this.state.isInEditModeQualifications === true) ||
            (this.state.isInEditModeStatus === true) ||
            (this.state.isInEditModeProTitle === true) ||
            (this.state.isInEditModeStudy === true) ||
            (this.state.isInEditModeEmployment === true) ||
            (this.state.isInEditModePensioner === true) ||
            (this.state.isInEditModeFieldOfInterest === true) ||
            (this.state.isInEditModeCentralCommittee === true) ||
            (this.state.isInEditModePresidency === true) ||
            (this.state.isInEditModePresident === true) ||
            (this.state.isInEditModeVicePresident === true) ||
            (this.state.isInEditModeSecretary === true) ||
            (this.state.isInEditModeSupervisoryBoard === true) 
        ) {

            this.setState({
                isInEditModeCardNum: false,
                isInEditModeOib: false,
                isInEditModeBirthday: false,
                isInEditModeCounty: false,
                isInEditModeCity: false,
                isInEditModeTownship: false,
                isInEditModeAddress: false,
                isInEditModeZipCode: false,
                isInEditModeTel: false,
                isInEditModeEmail: false,
                isInEditModeQualifications: false,
                isInEditModeStatus: false,
                isInEditModeProTitle: false,
                isInEditModeStudy: false,
                isInEditModeEmployment: false,
                isInEditModePensioner: false,
                isInEditModeFieldOfInterest: false,
                isInEditModeCentalCommittee: false,
                isInEditModePresidency: false,
                isInEditModePresident: false,
                isInEditModeVicePresident: false,
                isInEditModeSecretary: false,
                isInEditModeSupervisoryBoard: false
            })


        }

        

    }

    errorHandler = () => {
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }
   

    fileHandler = (e) => {

        if(e.target.files[0]) {											// postavljanje odabrane slike kao image state
            const image = e.target.files[0];
            this.setState(() => ({image}));
		}
    }

    
    uploadHandler = () => {

		
		
		const {image} = this.state;										//uploadanje slike na firebase
		const uploadTask = storage.ref(`${image.name}`).put(image);
		uploadTask.on('state_changed', 
		(snapshot) => {
				let percentage = Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100)
				this.setState({percentage: percentage})
		}, 
		(error) => { 													// error function
			console.log(error);
		}, 
		() => {
																		// complete funtion
		storage.ref('').child(image.name).getDownloadURL().then(url => {
			this.setState({url});
		})
		
		});  
    }

    render(){

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
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changedCounty={(event) => this.countyChangedHandler(event, formElement.id)}
            />
        ));

        let cityInput = formElementsArray.map(formElement => (
            <CityInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
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
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));


        let statusInput = formElementsArray.map(formElement => (
            <StatusInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        let centralCommitteeInput = formElementsArray.map(formElement => (
            <CentralCommitteeInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        let presidencyInput = formElementsArray.map(formElement => (
            <PresidencyInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        let presidentInput = formElementsArray.map(formElement => (
            <PresidentInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        let vicePresidentInput = formElementsArray.map(formElement => (
            <VicePresidentInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        let secretaryInput = formElementsArray.map(formElement => (
            <SecretaryInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));

        let supervisoryBoardInput = formElementsArray.map(formElement => (
            <SupervisoryBoardInput 
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
            />
        ));


        

        let fieldOfInterest = []                                                                          // array sa odabranim interesima (props)

        if(this.props.selectedMemberNogomet === 'Nogomet') {
            fieldOfInterest.push(this.props.selectedMemberNogomet)
        }

        if(this.props.selectedMemberRibolov === 'Ribolov') {
            fieldOfInterest.push(this.props.selectedMemberRibolov)
        }

        if(this.props.selectedMemberBela === 'Bela') {
            fieldOfInterest.push(this.props.selectedMemberBela)
        }

        if(this.props.selectedMemberPikado === 'Pikado') {
            fieldOfInterest.push(this.props.selectedMemberPikado)
        }

        if(this.props.selectedMemberHumanitarian === 'humanitarniRad') {
            fieldOfInterest.push('Humanitarni rad')
        }


        

        let fieldOfInterestNew = []                                                                      // novi array ako se promjeni value odabranih interesa

        if(this.state.valueNogomet === 'Nogomet') {
            fieldOfInterestNew.push(this.state.valueNogomet)
        }

        if(this.state.valueRibolov === 'Ribolov') {
            fieldOfInterestNew.push(this.state.valueRibolov)
        }

        if(this.state.valueBela === 'Bela') {
            fieldOfInterestNew.push(this.state.valueBela)
        }

        if(this.state.valuePikado === 'Pikado') {
            fieldOfInterestNew.push(this.state.valuePikado)
        }

        if(this.state.valueHumanitarian === 'humanitarniRad') {
            fieldOfInterestNew.push('Humanitarni rad')
        }


        const state = this.state
        let exitTitle = 'Izađi'

        if(                                                                            
                                                                                       
            (this.state.url !== '') ||
            (this.state.valueCardNum !== '') ||
            (this.state.valueOib !== '') ||
            (this.state.valueBirthday !== '') ||
            (this.state.valueCounty !== '') ||
            (this.state.valueCity !== '') ||
            (this.state.valueTownship !== '') ||
            (this.state.valueAddress !== '') ||
            (this.state.valueZipCode !== '') ||
            (this.state.valueTel !== '') ||
            (this.state.valueEmail !== '') ||
            (this.state.valueQualifications !== '') ||
            (this.state.valueStatus !== '') ||
            (this.state.valueProTitle !== '') ||
            (this.state.valueStudy !== '') ||
            (this.state.valueEmployment !== '') ||
            (this.state.valuePensioner !== '') ||
            (this.state.valueCentralCommittee !== '') ||
            (this.state.valuePresidency !== '') ||
            (this.state.valuePresident !== '') ||
            (this.state.valueVicePresident !== '') ||
            (this.state.valueSecretary !== '') ||
            (this.state.valueSupervisoryBoard !== '') ||
            (this.state.valueNoneInterest !== '')
        ) {

            exitTitle = 'Izađi i spremi'

         } else {
            exitTitle = 'Izađi'
         }
 

         let imgUrl  
         
         if(this.props.selectedMemberImg !== '/') {

             imgUrl= this.props.selectedMemberImg 

         } 
         
         if(this.state.url !== ''){

             imgUrl = this.state.url 

         } 
         
         if((this.props.selectedMemberImg !== '/') && (this.state.url === '')) {

             imgUrl = this.props.selectedMemberImg 
         }

         if((this.props.selectedMemberImg === '/') && (this.state.url !== '')) {

            imgUrl = this.state.url 
        }

        if((this.props.selectedMemberImg === '/') && (this.state.url === '')) {

            imgUrl = placeholder
        }


        let birthdate = []
        
        if(this.state.valueBirthday) {                                                              // pretvara **yyyy mm dd** u **dd mm yyyy**
            birthdate.push(this.state.valueBirthday)
            
           
        }

        let birthdateProp = []
        let valueB = null
        if(this.props.selectedMemberBirthday !== null) {                                                              // pretvara **yyyy mm dd** u **dd mm yyyy**
            birthdateProp.push(this.props.selectedMemberBirthday)

            valueB = birthdateProp[0].split('-').reverse().join('.')
           
        }
    
        console.log(valueB)

        return( 

            <Aux>

                    <div className="Backdrop" style={{display: this.props.selectedMember ? 'flex' : 'none'}}></div>

                    <div className="modalMemberWrap"  style={{display: this.props.selectedMember ? 'flex' : 'none'}}>
                        
                        <div className="modalMember">

                            <img src={imgUrl} alt="Uploaded file"/>
							<br />
							<input type="file" 
							onChange={this.fileHandler}
							name="file"
							className="inputfile"
							id="file"
							/>
							
							<label className="chooseImg" htmlFor="file">Odaberi sliku</label>
							<br />
							<p style={{textAlign: 'center', display: this.state.percentage ? 'block' : 'none'}}>Učitavanje slike: {this.state.percentage}%</p>
							<label className="chooseImg" onClick={this.uploadHandler} style={{display: this.state.image ? 'block' : 'none', marginLeft: 'auto', marginRight: 'auto'}}>Postavi odabranu sliku</label>
                            
                            <div className="modalMemberProp"><h4>Br. člana</h4><div className="modalMemberItem">{parseInt(this.props.selectedMemberValueId) + 1}</div></div>

                            <div className="modalMemberProp"><h4>Br. članske iskaznice</h4>{this.state.isInEditModeCardNum ? <div><input className="InputElement" type="number" defaultValue={this.state.valueCardNum ? this.state.valueCardNum : this.props.selectedMemberCardNum} ref="theCardNumInput"/>
                            <button onClick={this.updateCardNumValue}>✓</button><button onClick={this.changeEditModeCardNum}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeCardNum}>{this.state.valueCardNum ? this.state.valueCardNum : this.props.selectedMemberCardNum}</div>}</div> 

                            <div className="modalMemberProp"><h4>Ime</h4><div className="modalMemberItem">{this.props.selectedMemberName}</div></div>

                            <div className="modalMemberProp"><h4>Prezime</h4><div className="modalMemberItem">{this.props.selectedMemberSurname}</div></div>

                            <div className="modalMemberProp"><h4>OIB</h4>{this.state.isInEditModeOib ? <div><input className="InputElement" type="number" min="11" max='11' defaultValue={this.state.valueOib ? this.state.valueOib : this.props.selectedMemberOib} ref="theOibInput"/>
                            <button onClick={this.updateOibValue}>✓</button><button onClick={this.changeEditModeOib}>X</button></div> :
                            <div className="modalMemberItem" onClick={this.changeEditModeOib}>{this.state.valueOib ? this.state.valueOib : this.props.selectedMemberOib}</div>}</div>

                            <div className="modalMemberProp"><h4>Spol</h4><div className="modalMemberItem">{this.props.selectedMemberSex}</div></div>

                            <div className="modalMemberProp"><h4>Datum rođenja</h4>{this.state.isInEditModeBirthday ? <div><input className="InputElement" type="date" defaultValue={this.state.valueBirthday ? birthdate[0].split('-').reverse().join('.') : this.props.selectedMemberBirthday} ref="theBirthdayInput"/>
                            <button onClick={this.updateBirthdayValue}>✓</button><button onClick={this.changeEditModeBirthday}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeBirthday}>{this.state.valueBirthday ? birthdate[0].split('-').reverse().join('.') : valueB}</div>}</div> 

                            <div className="modalMemberProp"><h4>Država rođenja</h4><div className="modalMemberItem">{this.props.selectedMemberStateOfBirth}</div></div>

                            <div className="modalMemberProp"><h4>Županija stanovanja</h4>{this.state.isInEditModeCounty ? <div>{countyInput}
                            <button onClick={this.updateCountyValue}>✓</button><button onClick={this.changeEditModeCounty}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeResidence}>{this.state.valueCounty ? this.state.valueCounty : this.props.selectedMemberCounty}</div>}</div> 

                            <div className="modalMemberProp"><h4>Grad stanovanja</h4>{this.state.isInEditModeCity ? <div>{cityInput}
                            <button onClick={this.updateCityValue}>✓</button><button onClick={this.changeEditModeCity}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeResidence}>{this.state.valueCity ? this.state.valueCity : this.props.selectedMemberCity}</div>}</div> 

                            <div className="modalMemberProp"><h4>Općina stanovanja</h4>{this.state.isInEditModeTownship ? <div>{townshipInput}
                            <button onClick={this.updateTownshipValue}>✓</button><button onClick={this.changeEditModeTownship}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeResidence}>{this.state.valueTownship ? this.state.valueTownship : this.props.selectedMemberTownship}</div>}</div> 

                            <div className="modalMemberProp"><h4>Adresa stanovanja</h4>{this.state.isInEditModeAddress ? <div><input className="InputElement" type="text" defaultValue={this.state.valueAddress ? this.state.valueAddress : this.props.selectedMemberAddress} ref="theAddressInput"/>
                            <button onClick={this.updateAddressValue}>✓</button><button onClick={this.changeEditModeAddress}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeAddress}>{this.state.valueAddress ? this.state.valueAddress : this.props.selectedMemberAddress}</div>}</div> 

                            <div className="modalMemberProp"><h4>Poštanski broj</h4>{this.state.isInEditModeZipCode ? <div><input className="InputElement" type="number" defaultValue={this.state.valueZipCode ? this.state.valueZipCode : this.props.selectedMemberZipCode} ref="theZipCodeInput"/>
                            <button onClick={this.updateZipCodeValue}>✓</button><button onClick={this.changeEditModeZipCode}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeZipCode}>{this.state.valueZipCode ? this.state.valueZipCode : this.props.selectedMemberZipCode}</div>}</div> 

                            <div className="modalMemberProp"><h4>Telefon</h4>{this.state.isInEditModeTel ? <div><input className="InputElement" type="number" defaultValue={this.state.valueTel ? this.state.valueTel : this.props.selectedMemberTel} ref="theTelInput"/>
                            <button onClick={this.updateTelValue}>✓</button><button onClick={this.changeEditModeTel}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeTel}>{this.state.valueTel ? this.state.valueTel : this.props.selectedMemberTel}</div>}</div> 

                            <div className="modalMemberProp"><h4>Email</h4>{this.state.isInEditModeEmail ? <div><input className="InputElement" type="email" defaultValue={this.state.valueEmail ? this.state.valueEmail : this.props.selectedMemberEmail} ref="theEmailInput"/>
                            <button onClick={this.updateEmailValue}>✓</button><button onClick={this.changeEditModeEmail}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeEmail}>{this.state.valueEmail ? this.state.valueEmail : this.props.selectedMemberEmail}</div>}</div> 

                            <div className="modalMemberProp"><h4>Stručna sprema</h4>{this.state.isInEditModeQualifications ? <div>{qualificationInput}
                            <button onClick={this.updateQualificationsValue}>✓</button><button onClick={this.changeEditModeQualifications}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeQualifications}>{this.state.valueQualifications ? this.state.valueQualifications : this.props.selectedMemberQualifications}</div>}</div> 

                            

                            <div className="modalMemberProp"><h4>Stručno zvanje</h4>{this.state.isInEditModeProTitle ? <div><input className="InputElement" type="text" defaultValue={this.state.valueProTitle ? this.state.valueProTitle : this.props.selectedMemberProfessionalTitle} ref="theProTitleInput"/>
                            <button onClick={this.updateProTitleValue}>✓</button><button onClick={this.changeEditModeProTitle}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeProTitle}>{this.state.valueProTitle ? this.state.valueProTitle : this.props.selectedMemberProfessionalTitle}</div>}</div> 

                            <div className="modalMemberProp"><h4>Studij</h4>{this.state.isInEditModeStudy ? <div><input className="InputElement" type="text" defaultValue={this.state.valueStudy ? this.state.valueStudy : this.props.selectedMemberStudy} ref="theStudyInput"/>
                            <button onClick={this.updateStudyValue}>✓</button><button onClick={this.changeEditModeStudy}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeStudy}>{this.state.valueStudy ? this.state.valueStudy : this.props.selectedMemberStudy}</div>}</div> 

                            <div className="modalMemberProp"><h4>Zaposlenje</h4>{this.state.isInEditModeEmployment ? <div><select className="InputElement" defaultValue={this.state.valueEmployment ? this.state.valueEmployment : this.props.selectedMemberEmployment} ref="theEmploymentInput"><option>Da</option><option>Ne</option></select>
                            <button onClick={this.updateEmploymentValue}>✓</button><button onClick={this.changeEditModeEmployment}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeEmployment}>{this.state.valueEmployment ? this.state.valueEmployment : this.props.selectedMemberEmployment}</div>}</div> 

                            <div className="modalMemberProp"><h4>Umirovljenik</h4>{this.state.isInEditModePensioner ? <div><select className="InputElement" defaultValue={this.state.valuePensioner ? this.state.valuePensioner : this.props.selectedMemberPensioner} ref="thePensionerInput"><option>Da</option><option>Ne</option></select>
                            <button onClick={this.updatePensionerValue}>✓</button><button onClick={this.changeEditModePensioner}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModePensioner}>{this.state.valuePensioner ? this.state.valuePensioner : this.props.selectedMemberPensioner}</div>}</div> 

                            <div className="modalMemberProp"><h4>Polje interesa</h4>{this.state.isInEditModeFieldOfInterest ? <div>
                                <div className="fieldOfInterest">
									<label onClick={this.nogometHandler} className="chooseField" style={{background: this.state.nogomet ? '#343a40' : 'none', color:this.state.nogomet ? 'white' : 'black' }}>Nogomet</label>
									<label onClick={this.ribolovHandler} className="chooseField" style={{background: this.state.ribolov ? '#343a40' : 'none', color:this.state.ribolov ? 'white' : 'black' }}>Ribolov</label>
									<label onClick={this.belaHandler} className="chooseField" style={{background: this.state.bela ? '#343a40' : 'none', color:this.state.bela ? 'white' : 'black' }}>Bela</label>
									<label onClick={this.pikadoHandler} className="chooseField" style={{background: this.state.pikado ? '#343a40' : 'none', color:this.state.pikado ? 'white' : 'black' }}>Pikado</label>
                                    <label onClick={this.humanitarianHandler} className="chooseField" style={{background: this.state.humanitarian ? '#343a40' : 'none', color:this.state.humanitarian ? 'white' : 'black' }}>Humanitarni rad</label>
                                    <label onClick={this.noneInterestHandler} className="chooseField" style={{background: this.state.noneInterest ? '#343a40' : 'none', color:this.state.noneInterest ? 'white' : 'black' }}>/</label>
                                </div>
                            <button onClick={this.updateFieldOfInterestValue}>✓</button><button onClick={this.changeEditModeFieldOfInterest}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeFieldOfInterest}>{fieldOfInterestNew.length ? fieldOfInterestNew.join(', ') : '/'}</div>}</div> 

                            <div className="modalMemberProp"><h4>Središnji odbor</h4>{this.state.isInEditModeCentralCommittee ? <div>{centralCommitteeInput}
                            <button onClick={this.updateCentralCommitteeValue}>✓</button><button onClick={this.changeEditModeCentralCommittee}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeCentralCommittee}>{this.state.valueCentralCommittee ? this.state.valueCentralCommittee : this.props.selectedMemberCentralCommittee}</div>}</div> 

                            <div className="modalMemberProp"><h4>Predsjedništvo</h4>{this.state.isInEditModePresidency ? <div>{presidencyInput}
                            <button onClick={this.updatePresidencyValue}>✓</button><button onClick={this.changeEditModePresidency}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModePresidency}>{this.state.valuePresidency ? this.state.valuePresidency : this.props.selectedMemberPresidency}</div>}</div> 

                            <div className="modalMemberProp"><h4>Predsjednik</h4>{this.state.isInEditModePresident ? <div>{presidentInput}
                            <button onClick={this.updatePresidentValue}>✓</button><button onClick={this.changeEditModePresident}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModePresident}>{this.state.valuePresident ? this.state.valuePresident : this.props.selectedMemberPresident}</div>}</div> 

                            <div className="modalMemberProp"><h4>Dopredsjednik</h4>{this.state.isInEditModeVicePresident ? <div>{vicePresidentInput}
                            <button onClick={this.updateVicePresidentValue}>✓</button><button onClick={this.changeEditModeVicePresident}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeVicePresident}>{this.state.valueVicePresident ? this.state.valueVicePresident : this.props.selectedMemberVicePresident}</div>}</div> 

                            <div className="modalMemberProp"><h4>Tajnik</h4>{this.state.isInEditModeSecretary ? <div>{secretaryInput}
                            <button onClick={this.updateSecretaryValue}>✓</button><button onClick={this.changeEditModeSecretary}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeSecretary}>{this.state.valueSecretary ? this.state.valueSecretary : this.props.selectedMemberSecretary}</div>}</div> 

                            <div className="modalMemberProp"><h4>Nadzorni odbor</h4>{this.state.isInEditModeSupervisoryBoard ? <div>{supervisoryBoardInput}
                            <button onClick={this.updateSupervisoryBoardValue}>✓</button><button onClick={this.changeEditModeSupervisoryBoard}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeSupervisoryBoard}>{this.state.valueSupervisoryBoard ? this.state.valueSupervisoryBoard : this.props.selectedMemberSupervisoryBoard}</div>}</div> 

                            <div className="modalMemberProp"><h4>Zadnja članarina</h4><div className="modalMemberItem">{
                            this.props.selectedMemberlastMembership ? this.props.selectedMemberlastMembership.split('/').reverse().join('.') : '/' 
                            }</div></div>

                            <div className="modalMemberProp"><h4>Datum upisa</h4><div className="modalMemberItem">{this.props.selectedMemberDate}</div></div>

                        </div>

                        <div className="modalMemberBtns">
                            <button onClick={() => {this.props.exitMemberHandler(); this.exitMemberHandler()}}>{exitTitle}</button>
                            <button onClick={() => {this.props.exitMemberHandler(); this.deleteMemberHandler()}}>Deaktiviraj člana</button>
                        </div>

                    </div>

                    <Error
                    error={this.state.error}
                    errorHandler={this.errorHandler}
                    />
            </Aux>
        );

    }



}


export default Member;

/*
 <div className="modalMemberProp"><h4>Status</h4>{this.state.isInEditModeStatus ? <div>{statusInput}
                            <button onClick={this.updateStatusValue}>✓</button><button onClick={this.changeEditModeStatus}>X</button></div> : 
                            <div className="modalMemberItem" onClick={this.changeEditModeStatus}>{this.state.valueStatus ? this.state.valueStatus : this.props.selectedMemberStatus}</div>}</div>
*/