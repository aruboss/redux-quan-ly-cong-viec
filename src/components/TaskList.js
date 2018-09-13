import React, { Component } from 'react';
import TaskItem from './TaskItem';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskList extends Component {
  constructor(props){
    super(props);
    this.state={
      filterName: '',
      filterStatus: -1 //all: -1,active: 1, deactive: 0
    }
  }

  onChange = (event)=>{//đổ value bằng name khi có sự kiện thay đổi
      var target = event.target;
      var name = target.name;
      var value = target.value;
      var filter = {
            name : name==='filterName'?value:this.state.filterName,
            status : name==='filterStatus'?value:this.state.filterStatus
      };
      this.props.onFilterTable(filter);
         
      this.setState({
        [name]: value
      });
  }

  render() {
    console.log(this.props.tasks);
    var {tasks, filterTable} = this.props;
    console.log(filterTable);
    //filter on Table
      if(filterTable.name){
        tasks = tasks.filter((task)=>{
          return task.name.toLowerCase().indexOf(filterTable.name) !== -1;
        });
      }
      tasks = tasks.filter((task)=>{
          if(filterTable.status===-1){
              return task;
          }else{
            return task.status === (filterTable.status===1?true:false);   
          }
        }); 
    var {filterName, filterStatus} = this.state;
    var elmTasks = tasks.map((item,index)=>{
      return <TaskItem 
                key={index} 
                index={index} 
                task={item} 
             />
    });
    return (
          <table className="table table-bordered table-hover">
            <thead>
              <tr>
                <th className="text-center">STT</th>
                <th className="text-center">Tên</th>
                <th className="text-center">Trạng Thái</th>
                <th className="text-center">Hành Động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td />
                <td>
                  <input 
                      className="form-control" 
                      type="text" 
                      name="filterName"
                      value={filterName}
                      onChange={this.onChange}
                  />
                </td>
                <td>
                  <select 
                      className="form-control" 
                      name="filterStatus"
                      value={filterStatus}
                      onChange={this.onChange}
                  >
                    <option value={-1}>Tất Cả</option>
                    <option value={0}>Ẩn</option>
                    <option value={1}>Kích Hoạt</option>
                  </select>
                </td>
                <td />
              </tr>
              {elmTasks}
            </tbody>
          </table>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks : state.tasks,  //danh sach cac todo
    filterTable : state.filterTable
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onFilterTable : (filter) => {
      dispatch(actions.filterTask(filter));
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskList);     
