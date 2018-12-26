import React from 'react';
import '../styles.css'
import loginService from '../services/login'
import messageService from '../services/messages'

class RegisterForm extends React.Component {

	constructor() {
		super()
		this.state = {
			username: '',
			password: ''
		}
	}

	register = async (event) => {
		event.preventDefault()
		try {
			const user = await loginService.register({
				username: this.state.username,
				password: this.state.password
			})
			this.setState({ username: '', password: '' })
			window.location.replace("http://localhost:3000/login");
		} catch (exception) {
			alert(exception)
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
					<h2 class="sr-only">Registration</h2>
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
						<button class="btn btn-primary btn-block" type="submit" onClick={this.register}>Register</button>
					</div>
					<a href='/login'>Already registered? Click here to login.</a>
					<br/>
					<a href='/'>Back to main page</a>
				</form>
			</div>
		);
	}
}

export default RegisterForm;
