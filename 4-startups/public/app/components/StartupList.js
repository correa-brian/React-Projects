import React, { Component } from 'react'
import ListItem from '../components/ListItem'
import api from '../utils/api'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'

class StartupList extends Component {

	constructor(props, context){
		super(props, context)
		this.updateStartup = this.updateStartup.bind(this)
		this.createStartup = this.createStartup.bind(this)
		this.state = {
			startup: {
				name:'',
				founder:'',
				url:''
			}
		}
	}

	updateStartup(event){
		console.log('updateStartup: '+event.target.id+' = '+event.target.value)
		var copy = Object.assign({}, this.state.startup)
		copy[event.target.id] = event.target.value 
		this.setState({
			startup: copy
		})
	}

	createStartup(){
		console.log('Create Startup: '+JSON.stringify(this.state.startup))
		api.handlePost('/api/startup', this.state.startup, function(err, response){
			if(err){
				alert(err.message)
				return
			}
			console.log('STARTUP CREATED: '+JSON.stringify(response))
			store.dispatch(actions.startupCreated(response.results))
		})
	}

	componentDidMount(){
		console.log("componentDidMount")
		api.handleGet('/api/startup', {}, function(err, response){
			if(err){
				alert(err.message)
				return
			}
			store.dispatch(actions.startupsReceived(response.results))
		})
	}

	render(){
		var list = this.props.startups.map(function(startup, i){
			return(
				<li key={i}>{startup.name}</li>
			)
		})

		return (
			<div className="list-box">
				Startup List
				<ol>
					{list}
				</ol>
	
				<h2>Add Startup</h2>
				<input onChange={this.updateStartup} type="text" id="name" placeholder="Name" /><br />
				<input onChange={this.updateStartup} type="text" id="founder" placeholder="Founder" /><br />
				<input onChange={this.updateStartup} type="text" id="url" placeholder="URL" /><br />
				<button onClick={this.createStartup}>Add</button>
			</div>
			)
	}

}

const stateToProps = function(state){
	console.log('stateToProps: '+JSON.stringify(state))
	return {
		startups: state.startupReducer.startupsArray
	}
}

export default connect (stateToProps)(StartupList)

