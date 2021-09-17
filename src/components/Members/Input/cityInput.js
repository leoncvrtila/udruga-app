import React from 'react'
import '../../../assets/css/input.scss'

const cityInput = (props) => {

	let inputElement = null;

	if (props.elementType === 'citySelect') {

			inputElement = <div>
            <h4>{props.elementName}</h4>
            <select 
            className="InputElement" 
            value={props.value}
            onChange={props.changed}> 
                {props.citySelect.map(opt => (
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

export default cityInput;