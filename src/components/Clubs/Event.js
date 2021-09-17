import React, {Component} from 'react'
import axios from 'axios'

import {connect} from 'react-redux'

import Error from '../../hoc/Error'
import Aux from '../../hoc/Aux'

class Event extends Component {

    state={
        events:[],
        active: 'da',
        error: false
    }

    componentDidMount() {


        axios.get('https://udruga-desk.firebaseio.com/events.json?auth=' + this.props.isAuth)
          .then(response => {
            const fetchedEvents = []
            for(let key in response.data) {                                         // iz beckenda dobivam object pa ga moram pretvorit u array
                fetchedEvents.push({                                                // key je id tj odredeni member
                    ...response.data[key],
                    id: key
                
                }) 
            }
              this.setState({events: fetchedEvents});
          })
          .catch(error => {
            this.setState({error: true});
        });  
    }

    deactiveEvenet = (id, title, date) => {

        axios.delete('https://udruga-desk.firebaseio.com/events/' + id + '.json?auth=' + this.props.isAuth)    // brisanje clana
        .then(response => {
            console.log(response.data);
        });

        axios.post('https://udruga-desk.firebaseio.com/events.json?auth=' + this.props.isAuth, {
                date: date,
                title: title,
                active: 'ne'
            })
            .then(response => {

            })
            .catch(error => {
                this.setState({error: true});
            });  

        setTimeout(() => {
            axios.get('https://udruga-desk.firebaseio.com/events.json?auth=' + this.props.isAuth)
            .then(response => {
            const fetchedEvents = []
            for(let key in response.data) {                                      // iz beckenda dobivam object pa ga moram pretvorit u array
                fetchedEvents.push({                                            // key je id tj odredeni member
                    ...response.data[key],
                    id: key
                
                }) 
            }
                this.setState({events: fetchedEvents});
            })
            .catch(error => {
                this.setState({error: true});
            });  
        },500)


    }

    errorHandler = () => {
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }



    render(){

        let filteredEvents = this.state.events.filter(                                                      // u toj varijabli se nalaze filtrirani clanovi 
            (event) => {
                return  event.active.toLowerCase().indexOf(this.state.active.toLowerCase()) !== -1          // filtrira samo one clanove koji nisu platili clanarinu
    
        }
    )

        let events = filteredEvents.map(e => {                                                              // aktivni dogadaji

            return <tr className="Event" key={e.id}>
                        <td>{e.date}</td><td>{e.title}</td><td><button  onClick={() => this.deactiveEvenet(e.id, e.title, e.date)}>Obriši</button></td>
                    </tr>
   
        });



        
        return(
            <Aux>
                <div className="Events">
                    <h2>Događaji</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>
                                    Datum
                                </th>
                                <th>
                                    Naziv
                                </th>
                                <th>
                                    Obriši
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                                {events.length ? events : <td colSpan="3">Nema zakazanih događaja.</td>}
                        </tbody>
                    </table>
                </div>

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

export default connect(mapStateToProps)(Event);