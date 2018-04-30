import axios from 'axios'
import qs from 'qs'
import Discord from 'discord.js'
import express from 'express'
import bodyParser from 'body-parser'
import next from 'next'
import dotenv from 'dotenv'
dotenv.config()

const client = new Discord.Client()

const SERVER_ID = process.env.SERVER_ID
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const token = process.env.TOKEN

const TAGS = [
  'Blades',
  'Regulators (FO1)',
  'Unity',
  'Brotherhood of Steel',
  'Followers of the Apocalypse',
  'Raider Gangs',
  'Enclave',
  'Shi',
  'Unity',
  'Vault City',
  'Tanker Vagrants',
  'Raider Gangs',
  'Enclave',
  "Lyon's Pride",
  'Regulators (FO3)',
  'Tunnel Snakes',
  "Reilly's Rangers",
  'Talon Company',
  'Children of the Atom',
  'BoS - Outcasts',
  'Raider Gangs',
  'Independent Vegas (Yes Man)',
  'Mr. House',
  "Caesar's Legion",
  'New California Republic',
  'Followers of the Apocalypse',
  'Kings',
  'Great Khans',
  'Boomers',
  'Brotherhood of Steel',
  'Raider Gangs',
  'Sorrows',
  'Twisted Hairs',
  'Railroad',
  'Minutemen',
  'Institute',
  "Maxson's Pride",
  'Atom Cats',
  'Children of the Atom',
  'Raider Gangs',
  'Midwest Chapter',
  'Sem Especificação',
  '+18',
  '-18'
]

client.on('ready', () => {
  console.log(`> Bot iniciado`)
})

function addMembership(member) {
  const GUILD = client.guilds.find('id', SERVER_ID)
  if (member.roles.find('name', 'Vault Trainee'))
    member.addRole(GUILD.roles.find('name', 'Vault Dweller').id).then(() => {
      member.removeRole(GUILD.roles.find('name', 'Vault Trainee').id)
    })
}

function handleTags(member, tag) {
  const GUILD = client.guilds.find('id', SERVER_ID)
  if (TAGS.includes(tag)) {
    let userTags = member.roles.filterArray(i => TAGS.includes(i.name))
    if (tag === 'Sem Especificação') {
      for (let tag of userTags) {
        if (tag.name === '+18' || tag.name === '-18') continue
        member.removeRole(GUILD.roles.find('name', tag.name).id)
      }
      member.addRole(GUILD.roles.find('name', 'Sem Especificação').id)
      return
    }
    if (tag === '+18' || tag === '-18') {
      if (member.roles.find('name', '-18')) {
        member.removeRole(GUILD.roles.find('name', '-18').id).then(() => {
          member.addRole(GUILD.roles.find('name', tag).id)
        })
      } else if (member.roles.find('name', '+18')) {
        member.removeRole(GUILD.roles.find('name', '+18').id).then(() => {
          member.addRole(GUILD.roles.find('name', tag).id)
        })
      } else {
        member.addRole(GUILD.roles.find('name', tag).id)
      }
      return
    }
    if (member.roles.find('name', 'Sem Especificação')) {
      member.removeRole(GUILD.roles.find('name', 'Sem Especificação').id)
    }
    if (member.roles.find('name', tag)) {
      member.removeRole(GUILD.roles.find('name', tag).id)
    } else {
      member.addRole(GUILD.roles.find('name', tag).id)
    }
  } else {
    console.log(member.name, '#', member.discriminator, '- Tag não reconhecida')
  }
}

client.login(token)

const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()

nextApp.prepare().then(() => {
  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.get('/callback', (req, res) => {
    axios({
      method: 'post',
      url: 'https://discordapp.com/api/oauth2/token',
      data: qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: req.query.code || req.body.code || req.params.code,
        redirect_uri: process.env.NOW_URL
          ? 'https://vault130.now.sh/callback'
          : 'http://localhost:3000/callback'
      }),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then(response => {
        const { access_token, refresh_token } = response.data
        res.redirect(
          301,
          process.env.NOW_URL
            ? 'https://vault130.now.sh' +
              '/?code=' +
              access_token +
              '&refresh=' +
              refresh_token
            : 'http://localhost:3000/?code=' +
              access_token +
              '&refresh=' +
              refresh_token
        )
      })
      .catch(err => {
        console.log(err)
        res.send({ error: true })
      })
  })

  app.post('/refresh', (req, res) => {
    axios({
      method: 'post',
      url: 'https://discordapp.com/api/oauth2/token',
      data: qs.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'refresh_token',
        refresh_token: req.body.refresh_token,
        redirect_uri: process.env.NOW_URL
          ? 'https://vault130.now.sh' + '/callback'
          : 'http://localhost:3000/callback'
      }),
      headers: { 'content-type': 'application/x-www-form-urlencoded' }
    })
      .then(response => {
        const { access_token, refresh_token } = response.data
        res.send({ access_token: access_token, refresh_token: refresh_token })
      })
      .catch(err => {
        console.log(err)
        res.send({ error: true })
      })
  })

  app.get('/userTags/:userid', (req, res) => {
    if (req.params.userid) {
      axios({
        method: 'GET',
        url: `https://discordapp.com/api/v6/guilds/${SERVER_ID}/members/${
          req.params.userid
        }`,
        headers: {
          Authorization: 'Bot ' + token
        }
      }).then(({ data }) => {
        let tags = []
        for (let tag of data.roles) {
          tags.push(
            client.guilds.find('id', SERVER_ID).roles.find('id', tag).name
          )
        }
        res.send(tags)
      })
    } else {
      res.send(req.body)
    }
  })

  app.get('/userRoles/:userid', (req, res) => {
    axios({
      method: 'GET',
      url: `https://discordapp.com/api/v6/guilds/${SERVER_ID}/members/${
        req.params.userid
      }`,
      headers: {
        Authorization: 'Bot ' + token
      }
    })
      .then(({ data }) => {
        res.send(data.roles)
      })
      .catch(err => res.send('error'))
  })

  app.post('/handleTags', (req, res) => {
    if (req.body.token) {
      axios({
        method: 'GET',
        url: `https://discordapp.com/api/v6/users/@me`,
        headers: {
          Authorization: 'Bearer ' + req.body.token
        }
      }).then(({ data }) => {
        const member = client.guilds
          .find('id', SERVER_ID)
          .members.find('id', data.id)
        if (member.roles.find('name', 'Vault Trainee')) addMembership(member)
        handleTags(member, req.body.tag)
        res.send(member)
      })
    } else {
      res.send(req.body)
    }
  })

  app.get('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(3000, err => {
    if (err) throw err
    console.log(`> Web service ready on http://localhost:${3000}`)
  })
})
