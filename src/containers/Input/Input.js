import React from 'react'
import '../../assets/css/input.scss'

const input = (props) => {

	let inputElement = null;

	if (props.elementType === 'input') {		// auth input elementi
			inputElement = <div>
				<h4>{props.elementName}</h4>
				<input 
					className="InputElement" 
					{...props.elementConfig} 
					value={props.value}
					onChange={props.changed}
					/>
				</div>
	}

	return(
		
	<div className="Input">
		{inputElement}
	</div>

	
	);
};

export default input;