import React, {Component} from 'react'


class  MemberItem extends Component {                   // vrijednosti o pojedinom clanu koje ce se prikazat unutar svakog kluba

     render() {

        return (

        
            <tr className="MemberItem" >
                <td>{this.props.name}</td>
                <td>{this.props.surname}</td>
                <td>{this.props.birthdate}</td>
                <td>{this.props.county}</td>
                <td>{this.props.city}</td>
                <td>{this.props.township}</td>
                <td>{this.props.address}</td>
                <td>{this.props.tel}</td>
                <td>{this.props.email}</td> 
            </tr>
        
        )
    }

} 


export default MemberItem;