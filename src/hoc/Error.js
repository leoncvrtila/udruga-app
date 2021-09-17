import React from 'react'
import '../assets/css/error.scss'

const error = (props) => (

    <div className="errorWrap">
        <div className="Backdrop" style={{display: props.error ? 'flex' : 'none'}}>
        </div>
        <div className="Error" style={{display: props.error ? 'flex' : 'none'}}>
            <p>Greška mreže. Provjerite internetsku vezu pa pokušajte ponovo.</p>
            <button onClick={props.errorHandler}>Zatvori</button>
        </div>
    </div>
);

export default error;