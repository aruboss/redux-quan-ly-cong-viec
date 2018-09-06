import * as types from './../constants/ActionTypes';

// random ra 1 số bất kỳ 
var   s4 = () => {
      return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

var   generateID = () => {
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' +s4() + s4() +s4();   
    }

var	findIndex = (tasks, id) => {
	      var result = -1;
	      tasks.forEach((task,index)=>{
	        if(task.id===id){
	          result=index;
	        }
	      });
	      return result;
	    }


var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
	switch(action.type){
		case types.LIST_ALL:
			return state;
		case types.ADD_TASK:
			var newTask = {
				id: generateID(),
				name: action.task.name,
				status: action.task.status === 'true' ? true: false
			}
			state.push(newTask);
			localStorage.setItem('tasks',JSON.stringify(state));
			return [...state]; //trả về state mới
		case types.UPDATE_STATUS_TASK: 
			var id = action.id;
		    var index = findIndex(state, id);
		    state[index] = {
		    	...state[index],
		    	status: !state[index].status
		    };
		    localStorage.setItem('tasks',JSON.stringify(state));
			return [...state]; //trả về state mới
		default: return state;
	}
};

export default myReducer;