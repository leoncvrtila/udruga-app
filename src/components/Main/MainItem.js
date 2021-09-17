import React, {Component} from 'react'
import '../../assets/css/main.css'


class MainItem extends Component {                              // prikazuje boxove sa statistickim podacima


    render() {

        let number = null                                       // prikazi onaj broj koji je filtriran u Main.js ovisno o value

        if (this.props.itemValue === 'active'){
            number = this.props.activeNum
        } else if (this.props.itemValue === 'deactive'){
            number = this.props.deactiveNum 
        } else if (this.props.itemValue === 'events') {
            number = this.props.eventNum 
        } else if (this.props.itemValue === 'all') {
            number = this.props.all 
        }


        return(

            <div className="MainItem" style={{
                backgroundImage: 'url(' + this.props.img +')'
            }}>
                <p>{number}</p>
                <h5>Broj {this.props.itemName}</h5>
            </div>

        )
    }

}


export default MainItem;