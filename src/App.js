import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
import { connect } from 'react-redux';
import * as actions from './actions/index';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      taskEditing: null,
      keyword: '',//phuc vụ tìm kiếm 
      sortBy: 'name',
      sortValue: 1
    }

  }
// //gọi khi component của mình đc gán vào (khi load lại trang)
//   componentWillMount(){
//       if(localStorage && localStorage.getItem('tasks')){
//         var tasks = JSON.parse(localStorage.getItem('tasks'));
//         this.setState({
//           tasks: tasks
//         });
//       }
//   }


    onToggleForm = () => { //Thêm task
      var {itemEditing} = this.props;
      if(itemEditing && itemEditing.id !== ''){
          this.props.onOpenForm();
      }else{
          this.props.onToggleForm();
      };
      
      this.props.onClearTask({
            id : '',
            name: '',
            status: false
      });
      
    }

    onShowForm = () => {
       this.setState({
        isDisplayForm: true
      });
    }

    
    findIndex = (id) => {
      var {tasks} = this.state;
      var result = -1;
      tasks.forEach((task,index)=>{
        if(task.id===id){
          result=index;
        }
      });
      return result;
    }

    onUpdate = (id) => {
      var {tasks} = this.state;
      var index = this.findIndex(id);
      var taskEditing =tasks[index];
      this.setState({//lấy ra thông tin đã nhập, lưu toàn bộ vào mảng tên là taskEditing
        taskEditing: taskEditing
      }); 
      this.onShowForm();
    }


    onSearch = (keyword) => {
      this.setState({
        keyword: keyword
      });
    }

    onSort = (sortBy, sortValue) => {
      this.setState({
        sortBy: sortBy,
        sortValue: sortValue
      });
    }

  render() {
    var {sortBy, sortValue} = this.state;

    var {isDisplayForm} = this.props;
    // if(filter){
    
    // if(keyword){
    //     tasks = tasks.filter((task)=>{
    //       return task.name.toLowerCase().indexOf(keyword) !== -1;
    //     });
    //   }
    //   if(sortBy==='name'){
    //     tasks.sort((a,b)=>{
    //       if(a.name>b.name) return sortValue;
    //       else if(a.name<b.name) return -sortValue;
    //       else return 0;
    //     });
    //   }else{
    //      tasks.sort((a,b)=>{
    //       if(a.status>b.status) return -sortValue;
    //       else if(a.status<b.status) return sortValue;
    //       else return 0;
    //     });
    //   }
    return (
      <div>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Title Page</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css" integrity="sha384-1q8mTJOASx8j1Au+a5WDVnPi2lkFfwwEAa8hDDdjZlpLegxhjVME1fgjWPGmkzs7" crossOrigin="anonymous" />
        <div className="container">
          <div className="text-center">
            <h1>Quản Lý Công Việc</h1>
            <hr />
          </div>
          <div className="row">
            <div className={isDisplayForm?"col-xs-4 col-sm-4 col-md-4 col-lg-4":''}>
            {/*Form*/}
              <TaskForm />
            </div>
            <div className={isDisplayForm?"col-xs-8 col-sm-8 col-md-8 col-lg-8":"col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={this.onToggleForm}
              >
                <span className="fa fa-plus mr-5" />Thêm Công Việc
              </button>
                {/*tìm kiếm và sắp xếp */}
                <TaskControl 
                      onSearch={this.onSearch} 
                      onSort={this.onSort}
                      sortBy={sortBy}
                      sortValue={sortValue}
                />
              <div className="row mt-15">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                  <TaskList 
                      onUpdate={this.onUpdate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => { //state này là state lấy từ trên store xuống
  return {
      isDisplayForm : state.isDisplayForm,
      itemEditing: state.itemEditing
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onToggleForm : () => {
      dispatch(actions.toggleForm());
    },
    onClearTask : (task) => {
      dispatch(actions.editTask(task));
    },
    onOpenForm : () => {
      dispatch(actions.openForm());
    }
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
