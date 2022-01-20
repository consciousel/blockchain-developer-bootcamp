import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.css'
import App from './components/App'
import configureStore from './store/configureStore'
import * as serviceWorker from './serviceWorker'

const store = configureStore()

ReactDOM.render(
	<Provider store={configureStore()}>
		<App />
	</Provider>, 
	document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls. 
// Lear more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()


 