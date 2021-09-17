import React from 'react'
import '../../../assets/css/input.scss'

const townshipInput = (props) => {

	let inputElement = null;

	if (props.elementType === 'townshipSelect') {

			inputElement = <div>
            <h4>{props.elementName}</h4>
            <select 
            className="InputElement" 
            value={props.value}
            onChange={props.changed}> 
                {props.townshipSelect.map(opt => (
                    <option key={opt.value} value={opt.displayValue}>
                        {opt.displayValue}
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

export default townshipInput;


