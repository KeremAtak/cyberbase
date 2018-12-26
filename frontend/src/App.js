import React from 'react';
import './styles.css'
import Home from './components/Home'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import messageService from './services/messages'
import Admin from './components/Admin'
import ProtectedRoute from './ProtectedRoute'
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

class App extends React.Component {

	constructor() {
		super()
		this.state = {
			messages: [],
			newMessage: '',
			user: null
		}
	}


	componentWillMount() {
		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			console.log(user.access)
			this.setState({ user })
			messageService.setToken(user.token)
		}
	}

	render() {

		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/login" component={LoginForm} />
					<Route exact path="/register" component={RegisterForm} />
					{/* <ProtectedRoute path="/admin" component={Admin} /> */}
					<Route exact path="/admin" component={Admin} />
				</Switch>
			</Router>
		);
	}
}

export default App;

