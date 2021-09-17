import React from 'react'
import '../../../assets/css/input.scss'

const pensionerBtns = (props) => {

	let inputElement = null;

	if (props.elementType === 'pensionerBtns') {

			inputElement = <div className="formBtnsWrap">
            <h4 className="btnsTittle">{props.elementName}</h4>
                <div className="formBtns">
                        
                {props.pensionerOpt.options.map(opt => (
                <div 
                className="formButtons"
                {...props.pensionerOpt}
                key={opt.id}
                ><input type="radio" name="radio2" id={opt.id} checked={props.radioValue}/><label htmlFor={opt.id} onClick={props.clickPensioner}>{opt.value}</label></div>
                ))}
                </div>
            </div>

	}

	return(
		
	<div className="Input">
		{inputElement}
	</div>

	
	);
};

export default pensionerBtns;