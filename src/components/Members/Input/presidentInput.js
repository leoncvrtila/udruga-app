import React from 'react'
import '../../../assets/css/input.scss'

const presidentInput = (props) => {

	let inputElement = null;

		if(props.elementType === 'presidentSelect'){

			inputElement = <div>
				<h4>{props.elementName}</h4>
				<select 
				className="InputElement" 
				value={props.value}
				onChange={props.changed}> 
					{props.elementConfig.options.map(opt => (
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

export default presidentInput;