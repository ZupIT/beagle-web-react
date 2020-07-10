import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import Routes from 'routes'
import { theme } from 'core/constants/theme'
import GlobalStyle from 'components/commons.styled'

const AppComponent = () => (
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </ThemeProvider>
)

render(<AppComponent />, document.getElementById('root'))
