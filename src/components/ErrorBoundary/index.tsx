import React, { Component } from 'react'

class ErrorBoundary extends Component {

  state = {
    hasError: false,
  }

  static getDerivedStateFromError = () => ({ hasError: true })

  render() {
    const { children } = this.props
    const { hasError } = this.state

    return hasError ? <h1>Algo deu errado!</h1> : children
  }

}

export default ErrorBoundary
