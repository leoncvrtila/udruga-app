import React from 'react'
import '../../../assets/css/input.scss'

const sexBtns = (props) => {

	let inputElement = null;

	if (props.elementType === 'sexBtns') {

			inputElement = <div className="formBtnsWrap">
            <h4 className="btnsTittle">{props.elementName}</h4>
             <div className="formBtns">
            
            {props.sexOpt.options.map(opt => (
                <div 
                className="formButtons"
                {...props.sexOpt}
                key={opt.id}
                ><input type="radio" name="radio0" id={opt.id} checked={props.radioValue}/><label htmlFor={opt.id} onClick={props.clickSex} >{opt.value}</label></div>
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

export default sexBtns;