import React, { Component } from 'react'
import Router from 'next/router'
import * as Auth from '../utils/auth'
import { Dimmer, Loader } from 'semantic-ui-react'

class index3 extends Component {
  componentDidMount() {
    document.title = 'Vault 130'
    if (Auth.getToken() || localStorage.getItem('regras')) {
      Router.push('/goat')
      return
    }
    if (!Auth.getToken() && !localStorage.getItem('regras')) {
      Router.push('/regras')
    }
  }
  render() {
    return (
      <Dimmer active>
        <Loader inverted size="big">
          Carregando...
        </Loader>
      </Dimmer>
    )
  }
}

export default index3
