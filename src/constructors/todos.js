import React, { Component } from "react";
import { todoService } from "../services";
import { AuthConsumer } from '../AuthContext'
import { AuthStore } from "../stores/auth.store";

export default class Todos extends Component {
  constructor() {
    super();
    this.state = {
      newTodoDescription: "",
      todos: [],
      username: AuthStore.getUserName()
    };
  }

  async componentDidMount() {
    try {
      const todos = await todoService.getTodos();
      this.setState({
        todos
      });
    } catch (ex) {
      console.log(ex);
    }
  }

  render() {
    return (
      <div>
        <AuthConsumer>
          {({ isAuth, login, logout }) => (
              {isAuth :
                <div className="header">
                  <ul>
                    <button onClick={logout}>logout</button>
                    <div>{this.state.username}</div>
                    <button
                      type="button"
                      className="btn btn-primary"
                    >
                      Logout
                    </button>
                  </ul>
                </div>
              }
          )}
        </AuthConsumer>

        <div className="content-wrapper">
          <div className="list-header">
            <div className="toggle-all">
              <i className="fal fa-chevron-double-down fa-2x"></i>
            </div>
          </div>
          <ul>
            {this.state.todos.map((todo, i) => (
              <li key={todo.id}>
                <div className="todoItemView">
                  <input
                    className="toggle"
                    type="checkbox"
                  />
                  <label>
                    {todo.description}
                  </label>
                  <button className="remove" onClick={this.props.remove}></button>
                </div>

              </li>
            ))}
          </ul>
        </div>
      </div >
    );
  }
}
