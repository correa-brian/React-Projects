import React, { Component } from 'react'
import ListItem from '../components/ListItem'
import api from '../utils/api'
import store from '../stores/store'
import actions from '../actions/actions'
import { connect } from 'react-redux'

class StartupList extends Component {

	constructor(props, context){
		super(props, context)
		this.state = {
			startup: {
				name:'',
				location:'',
				description:''
			}
		}
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
				<li key={i}>(startup.name</li>
			)
		})

		return (
			<div className="list-box">
				<ol>
					{list}
				</ol>
	
				<h2>Add Startup</h2>
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

