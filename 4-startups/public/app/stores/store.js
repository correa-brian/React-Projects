import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import startupReducer from '../reducers/startupReducer'
import profileReducer from '../reducers/profileReducer'

//Combine Reducers
var reducers = combineReducers({
	startupReducer: startupReducer,
	profileReducer: profileReducer
});

//Create Store
var store = createStore(
	reducers,
	applyMiddleware(thunk)
);

export default store;