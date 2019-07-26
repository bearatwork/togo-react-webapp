import React from "react"
import { AuthContext } from '../AuthContext'
import Login from './login'

const LoginWrapper = (props) => (
    <AuthContext.Consumer>
      {({ ...renderProps }) => <Login {...renderProps} {...props}/>}
    </AuthContext.Consumer>
  )

export default LoginWrapper;