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
  Transition,
  Container
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

const SITE_URL = process.env.NOW_URL
  ? process.env.SITE_URL
  : 'http://localhost:3000'
const CLIENT_ID = process.env.CLIENT_ID

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
      loading: true
    }
  }

  componentDidMount() {
    document.title = 'Vault130: G.O.A.T'
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
      refreshToken().then(data => {
        this.loadInfo()
      })
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
    return (
      <Container>
        {(this.state.loggedin &&
          this.state.user && (
            <React.Fragment>
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
            </React.Fragment>
          )) || (
          <div>
            <center>
              <Image src="/static/vault.jpg" size="medium" />
              <h1>
                Olá, caro Vault Dweller! <br /> Seja bem-vindo ao G.O.A.T. do
                Vault 130.
              </h1>
              <p>
                Aqui você escolherá as tags de facções que serão aplicadas a
                você para assim identificarmos a quem você mais oferece apoio na
                franquia.
              </p>{' '}
              <p>Você pode escolher quem quiser, e mudar sempre que desejar.</p>{' '}
              Lembrando que, é essencial que você escolha somente quem você
              apoia de verdade, e que não abuse das tags.<br />
              <br />
              <a
                href={`https://discordapp.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${SITE_URL}/callback&response_type=code&scope=identify%20guilds`}
              >
                <Button color="green" inverted size="massive">
                  Entrar com o Discord
                </Button>
              </a>
            </center>
          </div>
        )}
        <style jsx global>
          {`
          body {
            display: flex;
            background-color: #121212;
            justify-content: center;
            color: #1bff80;
            font-family: 'Roboto', sans-serif;
            background-repeat: no-repeat;
            background-attachment: fixed;
          }
          .container {
            padding: 10px;
          }
          .login {
            display: flex; /* establish flex container */
            flex-direction: column; /* make main axis vertical */
            justify-content: center; /* center items vertically, in this case */
            align-items: center; /* center items horizontally, in this case */
            height: 100vh;
          }
          .notMember {
            display: flex; /* establish flex container */
            align-items: center; /* center items horizontally, in this case */
          }
            }
          `}
        </style>
      </Container>
    )
  }
}
