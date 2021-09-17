import React, {Component} from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom';

import {connect} from 'react-redux'
import Aux from '../../hoc/Aux'

import {Redirect} from 'react-router-dom'

import * as action from '../../store/actions/auth'
import Input from '../Input/Input'
import '../../assets/css/auth.scss'
import Spinner from '../Spinner/Spinner'
import Desk from '../../assets/images/desk.jpg'

class Auth extends Component {


    state={
        controls: {

            email: {
				elementType: 'input',
				elementConfig: {
					type: 'email',
					placeholder: 'Korisničko ime'
				},
				value: '',
				validation: {
                    required: true,
                    isEmail: true
				},
				valid: false,
				touched: false
            },

            password: {
				elementType: 'input',
				elementConfig: {
					type: 'password',
					placeholder: 'Lozinka'
				},
				value: '',
				validation: {
                    required: true,
                    minLenght: 6
				},
				valid: false,
				touched: false
			}
        }, 
        isSingup: false,
        members: []
    }

    componentDidMount(){


       
    }


    checkValidity(value,rules) {                                            // provjeravanje tocnosti
		
		let isValid = true;
		
		if(rules.required) {
			isValid = value.trim() !== '' && isValid;
		}
		
		if(rules.minLength) {
			isValid = value.length >= rules.minLength && isValid;
		}
		
		if(rules.maxLength) {
			isValid = value.length <= rules.maxLength && isValid;
        }
        
        if(rules.isNumeric) {
            const pattern = /^\d+$/;
            isValid = pattern.test(value) && isValid
        }
		
		return isValid;
	}


    inputChangedHandler = (event, controlName) => {                       // onChange input
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({controls: updatedControls});
    }

    submitHandler = (event) => {                                          // kad se klikne login
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSingup)
    }

    switchHandler = () => {                                              // switchanje izmedu login i singup 
        this.setState(prevState => {
            return {
                isSingup: !prevState.isSingup
            }
        })
    }

render(){
    
    const formElementsArray = [];                                        // prolazi kroz controls i object pretvara u array
		for (let key in this.state.controls) {
			formElementsArray.push({
				id: key,
				config: this.state.controls[key]
			});
		}
        
    let form = formElementsArray.map(formElement => (
        <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
        />
    ));

    if (this.props.loading) {
        form = <Spinner />
    }

    let errorMsg = null;

    if (this.props.error) {
        errorMsg = (
            <p className="ErrorMsg">{this.props.error.message ? 'Provjerite jeste li sve točno upisali.' : null}</p>
        );
    }                                                                   // error.message dolazi iz beckenda od firebasea


    let authRedirect = null;
    if(this.props.isAuth) {                                             // ako je ulogiran moze pristupiti main - to je postavljeno defaultno
        authRedirect = <Redirect to="/main"/>
    }

    return (

        <Aux>

            <img src={Desk} alt="Desk" className="Desk"/>

            <div className="Login">
                {authRedirect}
                
                <form onSubmit={this.submitHandler}>
                {errorMsg}
                {form}

                    <button type="submit" className="AuthButton">PRIJAVA</button>

                </form>
            </div>
        </Aux>

    );
}

}

const mapStateToProps = state => {                                 // dolazim do globalnog sateta
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {                             // izvrsavam globalno akcije
    return {
        onAuth: (email, password, isSingup) => dispatch(action.auth(email, password, isSingup))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);  // poveze se sa globalnim stateom i globalnim akcijama


/* 

* to je gumb za registriranje novih korisnika ali prvo se treba stavit u stateu true na isSingup

                <button 
                onClick={this.switchHandler}
                >SWITCH TO {this.state.isSingup ? 'SIGNIN' : 'SINGUP'}</button>

*/