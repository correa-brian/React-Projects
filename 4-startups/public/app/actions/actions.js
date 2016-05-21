import constants from '../constants/constants'
import store from '../stores/store'

module.exports = {

	startupsReceived: function(startups){
		return {
			type: constants.STARTUPS_RECEIVED,
			startups: startups
		};
	}
};