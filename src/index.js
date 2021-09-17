import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import NotFoundPage from './NotFoundPage'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter, Route} from 'react-router-dom'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware, combineReducers} from 'redux'
import thunk from 'redux-thunk';
import reducer from './store/reducers/auth'

const reduce = combineReducers({
	auth: reducer
})

//const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;

const store = createStore(reduce, applyMiddleware(thunk));

const app = (

	<Provider store={store}>
		<BrowserRouter>
				<App />
		</BrowserRouter>
	</Provider>

);

ReactDOM.render( app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();