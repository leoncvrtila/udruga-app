import React, {Component} from 'react'
import axios from 'axios'

import Aux from '../../../hoc/Aux'
import Error from '../../../hoc/Error'


class  MemberItem extends Component {                                                               // memberitem dobiva vrijednosti iz searchmembers i onda ih mapirano ispisuje
    

    state={
        error: false
    }

    deactiveHandler = (e) => {


        axios.put('https://udruga-desk.firebaseio.com/member/' + e.target.name + '.json', {
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
            lastMembership: this.props.lastMembership,
            active: 'Ne',
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

    errorHandler = () => {
        this.setState(prevState=>({
            error: !prevState.error
        }))
    }

    render() {

        let fieldOfInterest = []                                                                        // u array se spremaju svi interesi clana 

        if(this.props.nogomet === 'Nogomet') {
            fieldOfInterest.push('Nogomet')
        }

        if(this.props.ribolov === 'Ribolov') {
            fieldOfInterest.push('Ribolov')
        }

        if(this.props.bela === 'Bela') {
            fieldOfInterest.push('Bela')
        }

        if(this.props.pikado === 'Pikado') {
            fieldOfInterest.push('Pikado')
        }

        if(this.props.humanitarian === 'humanitarniRad') {
            fieldOfInterest.push('Humanitarni rad')
        }

        let birthdate = []
        
        if(this.props.birthdate) {                                                              // pretvara **yyyy mm dd** u **dd mm yyyy**
            birthdate.push(this.props.birthdate)
            
           
        }
       
        let lastMembership = this.props.lastMembership ? this.props.lastMembership.split('/').reverse().join('.') : '/'

        return (

            <Aux>

                <tr className="MemberItem" >
                    <td onClick={this.props.selectedMember}>{(this.props.valueId === '0' ) ? 1 : parseInt(this.props.valueId) + 1}</td>
                    <td onClick={this.props.selectedMember}>{this.props.cardNum}</td>
                    <td onClick={this.props.selectedMember}>{this.props.name}</td>
                    <td onClick={this.props.selectedMember}>{this.props.surname}</td>
                    <td onClick={this.props.selectedMember}>{this.props.oib}</td>
                    <td onClick={this.props.selectedMember}>{this.props.county}</td>
                    <td onClick={this.props.selectedMember}>{this.props.address}</td>
                    <td onClick={this.props.selectedMember}>{this.props.tel}</td>
                    <td onClick={this.props.selectedMember}>{this.props.email}</td>
                    <td onClick={this.props.selectedMember}>{lastMembership}</td>
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

/*
                    <td className="DeleteButtonTd" ><button onClick={(e) => {this.deactiveHandler(e); this.props.refreshMemberState()}} name={this.props.id}>Deaktiviraj</button></td>

*/