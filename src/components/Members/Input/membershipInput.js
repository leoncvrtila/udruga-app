import React from 'react'
import '../../../assets/css/input.scss'

const membershipInput = (props) => {

	let inputElement = null;

	if (props.elementType === 'membershipSelect') {

			inputElement = <div>
            <h4>{props.elementName}</h4>
            <select 
            className="InputElement" 
            value={props.value}
            onChange={props.changed}> 
                {props.elementConfig.options.map(opt => (
                    <option key={opt.value} value={opt.displayValue}>
                        {opt.value}
                    </option>
                ))}
            </select>
            </div>


	}

	return(
		
	<div className="Input">
		{inputElement}
	</div>

	
	);
};

export default membershipInput;