import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import TodoAction from '../store/actions/todoAction';

let mapStateToProps = (state) => {
  // console.log(state.toDoReducer.todos)
  return {
    todos: state.toDoReducer.todos

  }
}
let mapDispatchToProps = (dispatch) => {
  return {
    addToDo: (data) => { dispatch(TodoAction.addToDo(data)) },
    getToDos: () => { dispatch(TodoAction.getToDo()) },
    deleteToDo: (data) => { dispatch(TodoAction.deleteToDo(data)) },
    completedToDo: (data) => { dispatch(TodoAction.completedToDo(data)) },
    updateToDo: (data) => { dispatch(TodoAction.updateToDo(data)) } // { key , val }
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo: '',
      flage: true
    }
    this.props.getToDos();

  }

  addToDo = (e) => {
    e.preventDefault();
    this.props.addToDo({ todo: this.state.todo, isCompleted: false })
    this.setState({ todo: '' })

  }
  render() {
    // console.log(this.props.d)


    return (
      <div className="App">
        <h1>ToDo App with React-Redux-Firebase </h1>
        <h2>Muhammad Nasir  <br />Roll No : 7240</h2>
        <div>
          <input type='text' value={this.state.todo} onChange={(e) => { this.setState({ todo: e.target.value }) }} />
          <button onClick={this.addToDo}>Add todo</button>
        </div>

        <ol>
          {Object.keys(this.props.todos).map((key, index) => {
            let val = this.props.todos[key];
            console.log(val)
            return (
              <Item
                key={key}
                todo={val}
                deleteToDo={this.props.deleteToDo}
                completedToDo={this.props.completedToDo}
                index={key}
                updateToDo={this.props.updateToDo}
              />

            )
          })}
        </ol>
      </div>
    );
  }
}
class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      flage: true,
      todo: this.props.todo.todo
    }

  }
  toggleState = () => {
    this.setState({ flage: !this.state.flage })
  }
  render() {
    return (
      <div>
        {this.state.flage ?
          <li>
            {(this.props.todo.todo)}
            <button onClick={() => this.props.completedToDo(this.props.index)}>{this.props.todo.isCompleted ? 'Complete' : 'InCompleted'}</button>
            <button onClick={() => { this.props.deleteToDo({ key: this.props.index }) }}>DeleteToDo</button>
            <button onClick={this.toggleState}>Edit</button>
          </li> : <li>
            <input type='text' value={this.state.todo} onChange={(e) => {
              e.preventDefault();
              this.setState({ todo: e.target.value })
            }}
            />
            <button onClick={(e) => {
              e.preventDefault();
              this.props.updateToDo({ key: this.props.index, val: this.state.todo })
              this.setState({ flage: !this.state.flage })
            }}>Update</button>
          </li>}
      </div>
    )
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)






