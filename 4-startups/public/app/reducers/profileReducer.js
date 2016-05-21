import constants from '../constants/constants'

var initialState = {
	profiles: {},
	profilesArray: []
};

export default function(state = initialState, action){
	switch (action.type){
		
		case constants.PROFILES_RECEIVED:
			var newState = Object.assign({}, state);
			newState['profilesArray'] = action.profiles
			var p = {}
			for (var i=0; i<action.profiles.length; i++){
				var profile = action.profiles[i]
				p[profile._id] = profile
			}

			newState['profiles'] = p

			return newState;

		case constants.PROFILE_CREATED:
			var newState = Object.assign({}, state);
			var profile = action.profile

			var p = Object.assign([], newState.profilesArray);
			p.push(profile)
			newState['profilesArray'] = p

			return newState;

		default:
			return state;
	}
};