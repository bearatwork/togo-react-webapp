import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { loginService } from "../services";
import { AuthStore } from "../stores/auth.store";
import { AuthConsumer } from '../AuthContext'

export default class Login extends Component {
  constructor() {
    super();
    this.loginSubmit = this.loginSubmit.bind(this);
    this.createUser = this.createUser.bind(this);
    this.usernameChanged = this.usernameChanged.bind(this);
    this.state = { username: "" };
  }

  async loginSubmit(event) {
    event.preventDefault();
    this.clearErrorMessage();
    const { username } = this.state;
    try {
      const user = await loginService.login(username);
      AuthStore.updateState(user);
      AuthConsumer.isAuth = true;
      // this.setState({ toTodos: true });
    } catch (err) {
      this.setState({
        errorMessage:
          err.status === 401
            ? "That user doesn't exist"
            : "We had an issue, try again later"
      });
    }
  }

  async createUser(event) {
    event.preventDefault();
    this.clearErrorMessage();
    const { username } = this.state;
    try {
      const user = await loginService.createUser(username);
      AuthStore.updateState(user);
      this.setState({
        toTodos: true
      });
    } catch (err) {
      this.setState({
        errorMessage:
          err.status === 400
            ? "That username already exists"
            : "We had an issue, try again later"
      });
    }
  }

  usernameChanged(event) {
    this.setState({
      username: event.target.value
    });
  }

  clearErrorMessage() {
    this.setState({
      errorMessage: null
    });
  }

  render() {
    // if (this.state.toTodos === true) {
    //   return <Redirect to="/todos" push />;
    // }

    const errorContainer = this.state.errorMessage ? (
      <p>{this.state.errorMessage}</p>
    ) : null;

    return (
      <AuthConsumer>
        {({ isAuth, login, logout }) => (
          <div style={{ marginTop: 50 }}>
            <div className="content-wrapper">
              {errorContainer}
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={this.usernameChanged}
                    className="form-control"
                  />
                </div>

                {isAuth ? (
                  <ul>
                    <button onClick={logout}>logout test</button>
                  </ul>
                ) : (
                    <button onClick={login}>login test</button>
                  )}


                <button
                  type="submit"
                  className="btn btn-primary"
                  onClick={this.loginSubmit}
                >
                  Login
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.createUser}
                >
                  Create
          </button>
              </form>
            </div>
          </div>
        )}
      </AuthConsumer>
    );
  }
}
