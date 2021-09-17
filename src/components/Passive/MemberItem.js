import React, {Component} from 'react'
import axios from 'axios'
import Error from '../../hoc/Error'
import Aux from '../../hoc/Aux'



class  MemberItem extends Component {


    state={
        error: false
    }
   
    activeHandler = (e) => {

        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0'); 			//January is 0!
        let yyyy = today.getFullYear();

        today =  yyyy + '/' + mm + '/' + dd; 


        
        axios.put('https://udruga-desk.firebaseio.com/member/' + this.props.id + '.json', {                                       // slanje aktivnog clana
            cardNum: this.props.cardNum,
            imgUrl: this.props.imgUrl,
            name: this.props.name,
            surname: this.props.surname,
            oib: this.props.oib,
            sex: this.props.sex,
            birthdate: this.props.birthdate,
            stateOfBirth: this.props.stateOfBirth,
            county: this.props.county,
            city: this.props.city,
            township: this.props.township,
            address: this.props.address,
            zipCode: this.props.zipCode,
            tel: this.props.tel,
            email: this.props.email,
            qualifications: this.props.qualifications,
            status: this.props.status,
            professionalTitle: this.props.professionalTitle,
            study: this.props.study,
            employment: this.props.employment,
            pensioner: this.props.pensioner,
            nogomet: this.props.nogomet,
			ribolov: this.props.ribolov,
			bela: this.props.bela,
            pikado: this.props.pikado,
            humanitarian: this.props.humanitarian,
            lastMembership: today,
            active: 'Da',
            assembly: this.props.assembly,
            centralCommittee:this.props.centralCommittee,
            presidency: this.props.presidency,
            president: this.props.president,
            vicePresident: this.props.vicePresident,
            secretary: this.props.secretary,
            supervisoryBoard: this.props.supervisoryBoard,
            date: this.props.date
            })
            .then(response => {

            })
            .catch(error => {
                this.setState({error: true});
            });

    }
    
    deleteHandler = (e) => {
        axios.delete('https://udruga-desk.firebaseio.com/member/' + this.props.id + '.json')            // brisanje clana
        .then(response => {
            console.log(response.data);
        });
    }



    errorHandler = () => {                                                                             // error modal
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }

    render() {

        let fieldOfInterest = []
        

        if(this.props.nogomet === 'Nogomet') {
            fieldOfInterest.push(this.props.nogomet)
        }

        if(this.props.ribolov === 'Ribolov') {
            fieldOfInterest.push(this.props.ribolov)
        }

        if(this.props.bela === 'Bela') {
            fieldOfInterest.push(this.props.bela)
        }

        if(this.props.pikado === 'Pikado') {
            fieldOfInterest.push(this.props.pikado)
        }

        if(this.props.humanitarian === 'humanitarniRad') {
            fieldOfInterest.push('Humanitarni Rad')
        }

        let birthdate = []
        
        if(this.props.birthdate) {                                                              // pretvara **yyyy mm dd** u **dd mm yyyy**
            birthdate.push(this.props.birthdate)
            
           
        }

        let lastMembership = this.props.lastMembership ? this.props.lastMembership.split('/').reverse().join('.') : '/'


        return (

        <Aux>
            <tr className="MemberItem" >
                <td className="TableButtonTd" >
                    <button onClick={(e) =>{ this.activeHandler(e); this.props.refreshMemberState()}} name={this.props.id}>Aktiviraj</button>
                </td>
                <td className="DeactiveDeleteButtonTd">
                    <button onClick={(e) =>{ this.deleteHandler(e); this.props.refreshMemberState()}} name={this.props.id}>Obriši</button>
                </td>
                <td>{this.props.name}</td>
                <td>{this.props.surname}</td>
                <td>{this.props.oib}</td>
                <td>{this.props.sex}</td>
                <td>{birthdate[0].split('-').reverse().join('.')}</td>
                <td>{this.props.stateOfBirth}</td>
                <td>{this.props.county}</td>
                <td>{this.props.city}</td>
                <td>{this.props.township}</td>
                <td>{this.props.address}</td>
                <td>{this.props.zipCode}</td>
                <td>{this.props.tel}</td>
                <td>{this.props.email}</td>
                <td>{lastMembership}</td>
                <td>{this.props.qualifications}</td>
                <td>{this.props.professionalTitle}</td>
                <td>{this.props.study}</td>
                <td>{this.props.employment}</td>
                <td>{this.props.pensioner}</td>
                <td>{fieldOfInterest.length ? fieldOfInterest.join(', ') : '/'} </td>
                <td>{this.props.centralCommittee}</td>
                <td>{this.props.presidency}</td>
                <td>{this.props.president}</td>
                <td>{this.props.vicePresident}</td>
                <td>{this.props.secretary}</td>
                <td>{this.props.supervisoryBoard}</td>
                <td>{this.props.cardNum}</td>
                <td>{this.props.date}</td>
            </tr>

            <Error
                error={this.state.error}
                errorHandler={this.errorHandler}
            />

        </Aux>
        
        )
    }

} 


export default MemberItem;