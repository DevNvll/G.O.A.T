import React from 'react'
import url from 'url'
import axios from 'axios'
import {
  Image,
  Item,
  Button,
  Icon,
  Loader,
  Segment,
  Dimmer,
  Transition
} from 'semantic-ui-react'
import {
  refreshToken,
  setToken,
  getToken,
  getInfo,
  logout,
  checkMembership
} from '../utils/auth'

import Profile from '../components/Profile'
import Form from '../components/FormVault'

function getUrlParams(search) {
  let hashes = search.slice(search.indexOf('?') + 1).split('&')
  return hashes.reduce((params, hash) => {
    let [key, val] = hash.split('=')
    return Object.assign(params, { [key]: decodeURIComponent(val) })
  }, {})
}

export default class Index extends React.Component {
  constructor() {
    super()
    this.state = {
      loggedin: false,
      member: false,
      loading: true,
      url: ''
    }
  }

  componentDidMount() {
    document.title = 'Vault130: G.O.A.T'
    const authurl = process.env.NOW_URL
      ? 'https://discordapp.com/api/oauth2/authorize?client_id=439233107976257572&redirect_uri=https://vault130.now.sh/callback' +
        '&response_type=code&scope=identify%20guilds'
      : 'https://discordapp.com/api/oauth2/authorize?client_id=439233107976257572&redirect_uri=http://localhost:3000/callback' +
        '&response_type=code&scope=identify%20guilds'
    this.setState({ url: authurl })
    const { code, refresh } = getUrlParams(window.location.search)
    const token = getToken()
    if (code && refresh) {
      localStorage.setItem('token', code)
      localStorage.setItem('refresh', refresh)
      this.setState({ loggedin: true })
      this.loadInfo()
      history.replaceState({}, 'Vault130: G.O.A.T - Tags', '/')
    } else if (token) {
      this.setState({ loggedin: true })
      this.loadInfo()
    } else {
      this.setState({ loading: false })
    }
  }
  loadInfo() {
    getInfo()
      .then(({ data }) => {
        this.setState({ user: data })
        document.title =
          'Vault130: G.O.A.T - ' + data.username + '#' + data.discriminator
        checkMembership().then(result => {
          if (result) {
            this.setState({ member: true })
            this.setState({ loading: false })
          } else {
            this.setState({ loading: false })
          }
        })
      })
      .catch(err => console.log(err))
  }
  onLogout() {
    logout()
    this.setState({ loggedin: false })
    document.title = 'Vault130: G.O.A.T - Tags'
  }
  render() {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader inverted size="big">
            Carregando
          </Loader>
        </Dimmer>
      )
    }
    if (process.env.NOW_URL) {
    }
    return (
      <div>
        {(this.state.loggedin &&
          this.state.user && (
            <div>
              <Profile
                avatar={`https://cdn.discordapp.com/avatars/${
                  this.state.user.id
                }/${this.state.user.avatar}.png`}
                username={
                  this.state.user.username + '#' + this.state.user.discriminator
                }
                onLogout={this.onLogout.bind(this)}
              />
              {(this.state.member && (
                <Form
                  userid={this.state.user.id}
                  pendente={this.state.isPending}
                />
              )) || <h1>Você não é membro do servidor</h1>}
            </div>
          )) || (
          <div className="login">
            <center>
              <h1>Vault130 - G.O.A.T</h1>
            </center>
            <a href={this.state.url}>
              <Button color="blue" size="massive">
                Entrar com o Discord
              </Button>
            </a>
          </div>
        )}
        <style jsx global>
          {`
            html {
              height: 100%;
            }
            * {
              box-sizing: border-box;
            }

            body {
              display: flex;
              background-color: #f2f2f2;
              justify-content: center;
              font-family: 'Roboto', sans-serif;

              height: 100%;

              background-repeat: no-repeat;
              background-attachment: fixed;
            }
            .login {
              display: flex; /* establish flex container */
              flex-direction: column; /* make main axis vertical */
              justify-content: center; /* center items vertically, in this case */
              align-items: center; /* center items horizontally, in this case */
              height: 100vh;
            }
          `}
        </style>
      </div>
    )
  }
}
