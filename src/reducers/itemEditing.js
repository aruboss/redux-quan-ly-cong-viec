import * as types from './../constants/ActionTypes';

var initialState = {
	id: '',
	name: '',
	status: false
}; //giá trị mặc định là 1 object

var myReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.EDIT_TASK:
			return action.task;
		default: return state;
	}
};

export default myReducer;