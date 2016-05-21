import React, { Component } from 'react'
import ListItem from '../components/ListItem'
import api from '../utils/api'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'

class ProfileList extends Component {

	constructor(props, context){
		super(props, context)
		this.updateProfile = this.updateProfile.bind(this)
		this.createProfile = this.createProfile.bind(this)
		this.state = {
			profile: {
				firstName:'',
				lastName:'',
				email:''
			}
		}
	}

	updateProfile(event){
		console.log('updateProfile: '+event.target.id+' = '+event.target.value)
		var copy = Object.assign({}, this.state.profile)
		copy[event.target.id] = event.target.value
		this.setState({
			profile: copy
		})
	}

	createProfile(){
		console.log('Create Profile: '+JSON.stringify(this.state.profile))
		api.handlePost('/api/profile', this.state.profile, function(err, response){
			if(err){
				alert(err.message)
				return
			}
			console.log('PROFILE CREATED: '+JSON.stringify(response))
			store.dispatch(actions.profileCreated(response.results))
		})
	}

	componentDidMount(){
		console.log('componentDidMount')
		api.handleGet('/api/profile', {}, function(err, response){
			if(err){
				alert(err.message)
				return
			}
			store.dispatch(actions.profilesReceived(response.results))
		})
	}

	render(){
		var list = this.props.profiles.map(function(profile, i){
			return(
				<li key={i}>{profile.firstName}</li>
			)
		})

		return (
			<div className="list-box">
				Profile List
				<ol>
					{list}
				</ol>

				<h2>Add Profile</h2>
				<input onChange={this.updateProfile} type="text" id="firstName" placeholder="First Name" /><br />
				<input onChange={this.updateProfile} type="text" id="lastName" placeholder="Last Name" /><br />
				<input onChange={this.updateProfile} type="text" id="email" placeholder="Email" /><br />
				<button onClick={this.createProfile}>Add</button>
			</div>
		)
	}
}

const stateToProps = function(state){
	console.log('stateToProps: '+JSON.stringify(state))
	return {
		profiles: state.profileReducer.profilesArray
	}
}

export default connect (stateToProps)(ProfileList)
