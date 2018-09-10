import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';

class TaskForm extends Component {

  constructor(props){
    super(props);
      this.state = {
        id:'',
        name: '',
        status: false
    }
  }

  componentWillMount(){
    if(this.props.itemEditing && this.props.itemEditing.id !== null){
      this.setState({
        id: this.props.itemEditing.id,
        name: this.props.itemEditing.name,
        status: this.props.itemEditing.status
      });
    }else{
      this.onClear();
    }
  }

  componentWillReceiveProps(nextProps){
    if(nextProps && nextProps.itemEditing){//su dung khi chuyen tu them -> edit
      this.setState({
        id: nextProps.itemEditing.id,
        name: nextProps.itemEditing.name,
        status: nextProps.itemEditing.status
      });
    }else {
      this.onClear();
    };
  }

 
  onCloseForm = () => {
    this.props.onCloseForm();
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    if(name === 'status'){
      value = target.value === 'true' ? true : false;
    }
    this.setState({
      [name]: value
    });
  }

  onSave = (event) => { 
    event.preventDefault();
    // this.props.onSubmit(this.state);
    //them du lieu
    this.props.onSaveTask(this.state);
    //clear và close form
    this.onClear();
    this.onCloseForm();
  }

  onClear = () => {
    this.setState({
      id: '',
      name: '',
      status: false
    });
  }

  render() {
    var {id} = this.state;
    if(!this.props.isDisplayForm) return null;
    return (
      <div className="panel panel-warning">
        <div className="panel-heading">
          <h3 className="panel-title">
            {id !== '' ? 'Cập Nhật Công Việc' : 'Thêm Công Việc' }
            <span
              className="fa fa-times-circle text-right" aria-hidden="true"
              onClick={this.onCloseForm}
            ></span>
          </h3>
        </div>
        <div className="panel-body">
        {/*đặt submit ở form*/}
          <form onSubmit={this.onSave}>
            <div className="form-group">
              <label>Tên :</label>
              <input 
                  className="form-control" 
                  type="text" 
                  name="name"
                  value={this.state.name}
                  onChange={this.onChange}
              />
            </div>
            <label>Trạng Thái :</label>
            <select 
                  className="form-control" 
                  required="required"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
            >
              <option value={true}>Kích Hoạt</option>
              <option value={false}>Ẩn</option>
            </select>
            <br />
            <div className="text-center">
              <button type="submit" className="btn btn-warning">Lưu Lại</button>&nbsp;
              <button type="button" className="btn btn-danger" onClick={this.onClear}>Hủy Bỏ</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
      isDisplayForm : state.isDisplayForm,
      itemEditing: state.itemEditing
  }
};

const mapDispatchToProps = (dispatch, props) => {
  return {
    onSaveTask : (task) => {
        dispatch(actions.saveTask(task));
    },
    onCloseForm : () => {
      dispatch(actions.closeForm());
    }
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(TaskForm);
