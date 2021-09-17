import React from 'react'
import '../../../assets/css/input.scss'

const employmentBtns = (props) => {

	let inputElement = null;

	if (props.elementType === 'employmentBtns') {

			inputElement = <div className="formBtnsWrap">
            <h4 className="btnsTittle">{props.elementName}</h4>
                <div className="formBtns">
                        
                {props.employmentOpt.options.map(opt => (
                <div 
                className="formButtons"
                {...props.employmentOpt}
                key={opt.id}
                ><input type="radio" name="radio1" id={opt.id} checked={props.radioValue}/><label htmlFor={opt.id} onClick={props.clickEmployment}>{opt.value}</label></div>
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

export default employmentBtns;