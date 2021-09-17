import React, {Component} from 'react'
import Aux from '../../hoc/Aux'


import mail from '../../assets/images/mail.png'

class NotificationForm extends Component {                  // sluzi za slanje mailova


    state={
        email:false
    }

    sendEmailHandler = () => {
        this.setState(preState=>({
            email: !preState.email
        }))
    }

    render(){
        return(

        <Aux>
            <div className="SendEmail" onClick={this.sendEmailHandler}><img src={mail} alt="Email"/></div>
            <div className="NotificationForm" style={{display: this.state.email ? 'flex' : 'none'}}>
                <form onSubmit={this.props.submitHandler}>
                    <div>
                        <h2>Pošalji obavijest</h2>
                        <p>Naziv:</p>
                        <input className="formInput" placeholder="Subject" onChange={(e) => this.props.changeHandler(e)} name="subject" value={this.props.subject}/> <br />
                        <div className="bodiesEmailBtns"> 
                            <p>Za:</p>
                            <div onClick={this.props.centralCommittee} style={{background: this.props.centralCommitteeState ? '#64c1a8' : '#343a40'}}>Središnji odbor</div>
                            <div onClick={this.props.presidency} style={{background: this.props.presidencyState ? '#64c1a8' : '#343a40'}}>Predsjedništvo</div>
                            <div onClick={this.props.supervisoryBoard} style={{background: this.props.supervisoryBoardState ? '#64c1a8' : '#343a40'}}>Nadzorni odbor</div>
                        </div>
                        <input className="formInput" placeholder="Email" name={this.props.emails} value={this.props.emails} style={{display: 'none'}}/> <br />
                        <p>Poruka:</p>
                        <textarea className="InputElement" onChange={(e) => this.props.changeHandler(e)} name="msg" value={this.props.textareaValue}></textarea> <br />
                        <button type="submit" onClick={this.props.submitClickHandler} name={this.props.emails}>Pošalji</button>
                    </div>
                </form>
            </div>
        </Aux>

        )
    }


}

export default NotificationForm