import React from 'react';
import '../styles.css'
import loginService from '../services/login'
import messageService from '../services/messages'
import protocol from '../Protocol'

class LoginForm extends React.Component {

	constructor() {
		super()
		this.state = {
			username: '',
			password: ''
		}
	}

	login = async (event) => {
		event.preventDefault()

		try {
			const user = await loginService.login({
				username: this.state.username,
				password: this.state.password
			})
			window.localStorage.setItem('loggedUser', JSON.stringify(user))
			window.location.replace(protocol + "://localhost:3000");
		} catch (exception) {
			console.log(exception)
		}
	}

	handleChange = (event) => {
		this.setState({ [event.target.name]: event.target.value })
	}

	render() {
		console.log(this.state.username + ' ' + this.state.password)
		return (
			<div class="login-dark">
				<form method="post">
					<h1 class="sr-only">Insecure cyberbase app</h1>
					<h2 class="sr-only">Login</h2>
					<div class="illustration">
						<i class="icon ion-ios-locked-outline"></i>
					</div>
					<div class="form-group">
						<input value={this.state.username} onChange={this.handleChange} class="form-control" type="username" name="username" placeholder="Username" />
					</div>
					<div class="form-group">
						<input value={this.state.password} onChange={this.handleChange} class="form-control" type="password" name="password" placeholder="Password" />
					</div>
					<div class="form-group">
						<button class="btn btn-primary btn-block" type="submit" onClick={this.login}>Log In</button>
					</div>
					<a href='/register'>No account? Click here to register.</a>
					<br/>
					<a href='/'>Back to main page</a>
				</form>
			</div>
		);
	}
}

export default LoginForm;
