import React, {Component} from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios'

import '../assets/css/login.scss'

class Login extends Component {


render(){
    

    return (

        <div className="Login">
            <form onSubmit={this.submitHandler}>
                <input name="username" placeholder="Korisničko ime" type="text" />
                <input name="password" placeholder="Lozinka" type="text" />
                <button type="submit">prijava</button>
            </form>
        </div>

    );
}

}

export default Login;