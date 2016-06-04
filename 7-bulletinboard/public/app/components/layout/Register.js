import React, { Component } from 'react'
import api from '../../utils/api'

class Register extends Component {

	constructor(props, context){
		super(props, context)
		this.updateUser = this.updateUser.bind(this)
		this.register = this.register.bind(this)
		this.login = this.login.bind(this)
		this.state = {
			user: {
				firstName: '',
				lastName: '',
				email: '',
				password: ''
			}
		}
	}

	updateUser(event){
		console.log('updateUser: '+event.target.id+' == '+event.target.value)
		var updatedUser = Object.assign({}, this.state.user)
		updatedUser[event.target.id] = event.target.value
		this.setState({
			user: updatedUser
		})

	}

	register(event){
		event.preventDefault()
		console.log('updateUser: '+JSON.stringify(this.state.user))
		api.handlePost('/api/profile', this.state.user, function(err, response){
			if(err){
				alert(err.message)
				return
			}
			console.log('Profile Created: '+JSON.stringify(response))
			window.location.href = '/account'
		})
	}

	login(event){
		event.preventDefault()
		console.log("LOGIN: "+JSON.stringify(this.state.user))
		api.handlePost('/account/login', this.state.user, function(err, response){
			if(err){
				alert(err.message)
				return
			}
			// console.log('Profile Created: '+JSON.stringify(response))
			window.location.href = '/account'
		})
	}

	render(){
		return (
			<div>
				<h2> Sign Up</h2>
				<input type="text" onChange={this.updateUser} id="firstName" placeholder="First Name"/><br />
				<input type="text" onChange={this.updateUser} id="lastName" placeholder="Last Name"/><br />
				<input type="text" onChange={this.updateUser} id="email" placeholder="Email"/><br />
				<input type="password" onChange={this.updateUser} id="password" placeholder="Password"/><br />
				<button onClick={this.register}>Register</button>

				<h2> Log In</h2>
				
				<input type="text" onChange={this.updateUser} id="email" placeholder="Email"/><br />
				<input type="password" onChange={this.updateUser} id="password" placeholder="Password"/><br />
				<button onClick={this.login}>Login</button>
			</div>
		)
	}
}

export default Register