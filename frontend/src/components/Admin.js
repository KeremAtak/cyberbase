import React from 'react';
import '../styles.css'
import messageService from '../services/messages'

class Admin extends React.Component {

    constructor() {
        super()
        this.state = {
            messages: [],
            logs: [],
            user: window.localStorage.getItem('loggedUser')
        }
    }

    componentWillMount() {
        messageService
            .getAll()
            .then(messages => {
                this.setState({ messages })
            })

    }

    viewMessages = () => {
        let messagesToRender = [];
        let messages = this.state.messages
        for (let i = 0; i < messages.length; i++) {
            messagesToRender.push(<li>{messages[i].content} ({messages[i].user.username}, id: {messages[i].id})<button type="submit" id={i} onClick={() => this.deleteMessage(messages[i].id)}>Delete</button></li>)
        }
        return messagesToRender
    }

    deleteMessage = (id) => {
        messageService.remove(id)
    }

    render() {
        return (
            <div class="login-dark">
                <form>
                    <h1 class="sr-only">Insecure cyberbase app</h1>
                    <h2 class="sr-only">Admin tools</h2>
                    <div class="illustration">
                        <i class="icon ion-ios-locked-outline"></i>
                    </div>
                    Messages:
                    <ul>
                        {this.viewMessages()}
                    </ul>
                    Logs:
                    <ul>
                        {this.viewLogs()}
                    </ul>
                    <a href='/'>Back to main page</a>
                </form>
            </div >
        );
    }
}

export default Admin;
