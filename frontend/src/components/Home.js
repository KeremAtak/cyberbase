import React from 'react';
import '../styles.css'
import messageService from '../services/messages'

class Home extends React.Component {

	constructor() {
		super()
		this.state = {
			messages: [],
			newMessage: '',
			user: null
		}
	}

	componentWillMount() {
		messageService
			.getAll()
			.then(messages => {
				this.setState({ messages })
			})

		const loggedUserJSON = window.localStorage.getItem('loggedUser')
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			console.log(user)
			this.setState({ user })
			messageService.setToken(user.token)
		}
	}

	logOut = (event) => {
		event.preventDefault()
		try {
			window.localStorage.removeItem('loggedUser')
			this.setState({
				user: null
			})
		} catch (error) {
			alert(error)
		}
	}

	handleChange = (event) => {
		this.setState({ newMessage: event.target.value })
	}

	addNewMessage = async (event) => {
		event.preventDefault()
		const messageObject = {
			content: this.state.newMessage,
			date: new Date(),
			user: this.state.user,
		}
		messageService.create(messageObject)
			.then(newMessage => {
				this.setState({
					messages: this.state.messages.concat(newMessage),
					newMessage: ''
				})
			})
	}

	helloUser = () => {
		return (
			<div>
				{
					this.userIsLoggedIn()
				? <h3>Good day, {this.state.user.username} </h3>
						: "Hello visitor"
				}
			</div>
		)
	}

	addNewMessageForm = () => {
		return (
			<div>
				{
					this.userIsLoggedIn()
						?
						<div>
							<div class="form-group">
								<input value={this.state.newMessage} onChange={this.handleChange} class="form-control" type="text" name="message" placeholder="..." />
							</div>
							<div class="form-group">
								<button class="btn btn-primary btn-block" type="submit" onClick={this.addNewMessage}>Add new message</button>
							</div>
						</div>
						: "You may add your own comments once you log in"
				}
			</div>
		)
	}

	viewLoginButtons = () => {
		return (
			<div>
				{
					this.userIsLoggedIn()
						? <button className="btn2 btn-6 btn-6a" onClick={this.logOut}>Log out</button>
						: <div>
							<a className="btn2 btn-6 btn-6a" href='/login'>Log in</a>
							<a className="btn2 btn-6 btn-6a" href='/register'>Register</a>
						</div>
				}
			</div>
		)
	}

	viewAdmin = () => {
		if (this.userIsAdmin()) {
			return <a className="btn2 btn-6 btn-6a" href='/admin'>Admin tools</a>
		}
	}

	userIsLoggedIn = () => {
		if (this.state.user !== null) {
			return true
		}
		return false;
	}

	userIsAdmin = () => {
        if (this.state.user !== null) {
            if (this.state.user.username === "admin") {
                return true
            }
        }
        return false
    }

	viewMessages = () => {
		let messagesToRender = [];
		let messages = this.state.messages
		for (let i = 0; i < messages.length; i++) {
			messagesToRender.push(<li>{messages[i].content} ({messages[i].user.username}, id: {messages[i].id})</li>)
		}
		return messagesToRender
	}

	render() {
		console.log(this.state.newMessage)
		return (
			<div class="login-dark">
				<form>
					<h1 class="sr-only">Insecure cyberbase app</h1>
					<div>{this.helloUser()}</div>
					<div class="illustration">
						<i class="icon ion-ios-locked-outline"></i>
					</div>
					<ul>
						{this.viewMessages()}
					</ul>
					{this.addNewMessageForm()}
					{this.viewLoginButtons()}
					{this.viewAdmin()}
				</form>
			</div>
		);
	}
}

export default Home;
