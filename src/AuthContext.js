import React from 'react'
import { loginService } from './services'

export const AuthContext = React.createContext()

class AuthProvider extends React.Component {
  state = { isAuth: false, username: '', id: ''}

  constructor() {
    super()
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
    this.createUser = this.logout.bind(this)
  }

  login = async username => {
    this.setState({ username })
    try {
      const response = await loginService.login(username)
      console.log('login response', response)
      this.setState({ isAuth: true, id: response.id })
    }
    catch  (err) {
      // this.setState({
      //   errorMessage:
      //     err.status === 401
      //       ? "That user doesn't exist"
      //       : "We had an issue, try again later"
      // });
    console.log('login response error', err.response)
    this.setState({ isAuth: false })
    }
  }

  createUser = async username => {
    this.setState({ username })
    const response = await loginService.createUser(username)
    console.log('create response', response)
    this.setState({ isAuth: true, id: response.id })
  }

  logout() {
    this.setState({ isAuth: false })
  }

  render() {
    return (
      <AuthContext.Provider
        value={{
          isAuth: this.state.isAuth,
          username: this.state.username,
          login: this.login,
          createUser: this.createUser,
          logout: this.logout
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
