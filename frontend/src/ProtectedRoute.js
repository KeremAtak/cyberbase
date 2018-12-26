import React from 'react';
import { Route, Redirect } from "react-router-dom";

class ProtectedRoute extends React.Component {

    constructor() {
        super()
        this.state = {
            user: null
        }
    }

    componentWillMount() {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            console.log(user)
            this.setState({ user })
        }
    }

    userIsAdmin = () => {
        if (this.state.user !== null) {
            if (this.state.user.username === "admin") {
                return true
            }
        }
        return false
    }

    render() {
        const { component: Component, ...props } = this.props

        return (
            <Route
                {...props}
                render={props => (
                    this.userIsAdmin() ?
                        <Component {...props} /> :
                        <Redirect to='/' />
                )}
            />
        )
    }
}

export default ProtectedRoute