import constants from '../constants/constants'
import store from '../stores/store'

module.exports = {

	startupsReceived: function(startups){
		return {
			type: constants.STARTUPS_RECEIVED,
			startups: startups
		};
	},

	startupCreated: function(startup){
		return {
			type: constants.STARTUP_CREATED,
			startup: startup
		};
	},

	profilesReceived: function(profiles){
		return {
			type: constants.PROFILES_RECEIVED,
			profiles: profiles
		};
	},

	profileCreated: function(profile){
		return {
			type: constants.PROFILE_CREATED,
			profile: profile
		};
	}
};