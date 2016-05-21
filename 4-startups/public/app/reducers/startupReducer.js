import constants from '../constants/constants'

var initialState = {
	startups: { },
	startupsArray: []
};

export default function(state = initialState, action){
	switch (action.type){
		
		case constants.STARTUPS_RECEIVED:
			var newState = Object.assign({}, state);
			newState['startupsArray'] = action.startups
			var s = {}
			for (var i=0; i<action.startups.length; i++){
				var startup = action.startups[i]
				s[startup._id] = startup
			}

			newState['startups'] = s

			return newState;

		default:
			return state;
	}
};