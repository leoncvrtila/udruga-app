import React, {Component} from 'react'
import Aux from '../../../hoc/Aux'


import calendar from '../../../assets/images/calendar.png'

class CreateEvent extends Component {                       // kreiranje evenata untar klubova


    state={
        notification:false
    }

    sendNotificationHandler = () => {
        this.setState(preState=>({
            notification: !preState.notification
        }))
    }

    render() {
        return(

            <Aux>
                <div className="AddEvent" onClick={this.sendNotificationHandler}><img src={calendar} alt="Kreiraj event"/></div>
                <div className="CreateEventWrap" style={{display: this.state.notification ? 'flex' : 'none'}}> 
                    <div className="CreateEvent">
                        <div>
                            <h2>Kreiraj događaj</h2>
                            <p>Datum događaja:</p>
                            <input type="date" name="eventDate" onChange={(e) => this.props.changeHandler(e)} value={this.props.eventDate}/>
                            <p>Naziv događaja:</p>
                            <input type="text" name="eventTitle" onChange={(e) => this.props.changeHandler(e)} value={this.props.eventTitle}/>
                            <button onClick={this.props.eventHandler}>Kreiraj</button>
                        </div>
                    </div>
                </div>
            </Aux>

        )
    }

}


export default CreateEvent