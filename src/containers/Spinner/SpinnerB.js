import React from 'react'
import './Spinner.css'

const spinnerB = (props) => (
	<div style={{ display: (props.valid === true) ? 'block' : 'block', zIndex: '1111', position: 'absolute', marginLeft: '47%', marginTop: '8%'}} className="Loader">Loading...</div>
);

export default spinnerB;