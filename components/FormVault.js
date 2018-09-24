import React from 'react'
import {
  Button,
  Form,
  Segment,
  Radio,
  Message,
  Dimmer,
  Header,
  Icon,
  Checkbox
} from 'semantic-ui-react'
import axios from 'axios'
import { getToken, checkRole } from '../utils/auth'

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
  'Kings',
  'BoS - Outcasts',
  'Raider Gangs',
  'Independent Vegas (Yes Man)',
  'Mr. House',
  "Caesar's Legion",
  'New California Republic',
  'Followers of the Apocalypse',
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
  'Outcasts',
  'Children of the Atom',
  'Raider Gangs',
  'Midwest Chapter',
  'Sem Especificação',
  'Sem Especificação',
  '+18',
  '-18',
  'Brotherhood of Steel (First Chapter)',
  "Brotherhood of Steel (Lyon's Pride)",
  'Brotherhood of Steel (Mojave Chapter)',
  "Brotherhood of Steel (Maxson's Pride)",
  'Brotherhood of Steel (Midwest Chapter)',
  'Brotherhood of Steel (Outcasts)',
  'Credit Check: The Strip',
  'Credit Check: The Tops',
  'Credit Check: Gomorrah',
  'Credit Check: Ultra-Luxe'
]

const TagCategories = {
  'Fallout 1': [
    'Blades',
    'Regulators (FO1)',
    'Unity',
    'Brotherhood of Steel (First Chapter)',
    'Followers of the Apocalypse',
    'Raider Gangs'
  ],
  'Fallout 2': [
    'Enclave',
    'Shi',
    'Vault City',
    'Tanker Vagrants',
    'Raider Gangs'
  ],
  'Fallout 3': [
    'Enclave',
    "Brotherhood of Steel (Lyon's Pride)",
    'Regulators (FO3)',
    'Tunnel Snakes',
    "Reilly's Rangers",
    'Talon Company',
    'Children of the Atom',
    'Brotherhood of Steel (Outcasts)',
    'Raider Gangs'
  ],
  'Fallout: New Vegas': [
    'Independent Vegas (Yes Man)',
    'Mr. House',
    "Caesar's Legion",
    'New California Republic',
    'Followers of the Apocalypse',
    'Kings',
    'Great Khans',
    'Boomers',
    'Brotherhood of Steel (Mojave Chapter)',
    'Raider Gangs',
    'Sorrows',
    'Twisted Hairs'
  ],
  'Fallout 4': [
    'Railroad',
    'Minutemen',
    'Institute',
    "Brotherhood of Steel (Maxson's Pride)",
    'Atom Cats',
    'Children of the Atom',
    'Raider Gangs'
  ],
  'Fallout Tactics': ['Brotherhood of Steel (Midwest Chapter)']
}

export default class TagsForm extends React.Component {
  constructor() {
    super()
    this.state = {
      form: {},
      error: false,
      sent: false,
      tags: [],
      strip: [],
      loading: true
    }
  }
  componentDidMount() {
    axios({
      method: 'GET',
      url: `/userTags/${this.props.userid}`
    }).then(({ data }) => {
      console.log(data)

      this.setState({ tags: data.filter(i => TAGS.includes(i)) }, () => {
        if (data.includes('Credit Check: The Strip')) {
          this.setState(
            {
              tags: [
                ...this.state.tags,
                'Credit Check: The Tops',
                'Credit Check: Gomorrah',
                'Credit Check: Ultra-Luxe'
              ].filter(t => t !== 'Credit Check: The Strip')
            },
            () => console.log(this.state.tags)
          )
        }
      })
      this.setState({ loading: false })
    })
  }
  handleSubmit(e) {}
  handleClose() {
    location.reload()
  }
  handleChange = (answ, tag) => {
    if (!this.state.tags.includes(tag.value))
      this.setState(
        {
          tags: [
            ...this.state.tags.filter(i => i !== 'Sem Especificação'),
            tag.value
          ]
        },
        this.handleStrip
      )
    else {
      this.setState(
        { tags: this.state.tags.filter(i => i !== tag.value) },
        this.handleStrip
      )
    }
    axios({
      method: 'POST',
      url: `/handleTags`,
      data: { tag: tag.value, token: getToken() }
    })
  }

  handleStrip = (prevProps, prevState) => {
    if (
      this.state.tags.filter(
        r => r.startsWith('Credit Check:') && r !== 'Credit Check: The Strip'
      ).length === 3
    ) {
      axios({
        method: 'POST',
        url: `/handleTags`,
        data: { tag: 'Credit Check: The Strip', token: getToken() }
      })
    }
  }

  handleSemEspec() {
    this.setState({
      tags: [
        ...this.state.tags.filter(i => i === '+18' || i === '-18'),
        'Sem Especificação'
      ]
    })

    axios({
      method: 'POST',
      url: `/handleTags`,
      data: { tag: 'Sem Especificação', token: getToken() }
    })
  }
  handleAge(e, { value }) {
    if (value === '+18') {
      this.setState({
        tags: [...this.state.tags.filter(i => i !== '-18'), '+18']
      })
    } else if (value === 'NoAge') {
      this.setState({
        tags: [...this.state.tags.filter(i => i !== '+18' && i !== '-18')]
      })
    } else {
      this.setState({
        tags: [...this.state.tags.filter(i => i !== '+18'), '-18']
      })
    }
    axios({
      method: 'POST',
      url: `/handleTags`,
      data: { tag: value, token: getToken() }
    })
  }
  render() {
    return (
      <React.Fragment>
        <Form onSubmit={this.handleSubmit.bind(this)}>
          <Segment
            style={{ margin: '50px' }}
            loading={this.state.loading}
            raised
            inverted
          >
            <Form.Group unstackable>
              {Object.keys(TagCategories).map(game => {
                return (
                  <div
                    style={{
                      paddingRight: '10px',
                      paddingBottom: '10px',
                      color: '#1bff80'
                    }}
                    key={game}
                  >
                    <Form.Field>
                      <label style={{ color: '#1bff80' }}>
                        <b>> {game}</b>
                      </label>
                      {TagCategories[game].map(tag => {
                        return (
                          <Form.Field
                            control={Checkbox}
                            label={tag}
                            value={tag}
                            key={tag}
                            checked={this.state.tags.includes(tag)}
                            onChange={this.handleChange.bind(this)}
                          />
                        )
                      })}
                    </Form.Field>
                  </div>
                )
              })}
            </Form.Group>
            <div style={{ textAlign: 'center' }}>
              <Form.Field
                control={Checkbox}
                label="Sem Especificação"
                value="Sem Especificação"
                checked={this.state.tags.includes('Sem Especificação')}
                onChange={this.handleSemEspec.bind(this)}
              />
            </div>
          </Segment>
          <Segment
            style={{ margin: '50px' }}
            inverted
            loading={this.state.loading}
          >
            <Form.Field>
              <label style={{ color: '#1bff80' }}>> Idade</label>
              <Form.Field
                control={Radio}
                label="-18"
                value="-18"
                name="idade"
                checked={this.state.tags.includes('-18')}
                onChange={this.handleAge.bind(this)}
              />
              <Form.Field
                control={Radio}
                label="+18"
                value="+18"
                name="idade"
                checked={this.state.tags.includes('+18')}
                onChange={this.handleAge.bind(this)}
              />
              <Form.Field
                control={Radio}
                label="Prefiro não responder"
                value="NoAge"
                name="idade"
                checked={
                  !this.state.tags.includes('+18') &&
                  !this.state.tags.includes('-18')
                }
                onChange={this.handleAge.bind(this)}
              />
            </Form.Field>
          </Segment>
          <Segment
            style={{ margin: '50px' }}
            inverted
            loading={this.state.loading}
          >
            <Form.Field>
              <label style={{ color: '#1bff80' }}>> The Strip</label>
              <Form.Field
                control={Checkbox}
                label="Gostaria de participar do The Tops"
                value="Credit Check: The Tops"
                key={0}
                checked={this.state.tags.includes('Credit Check: The Tops')}
                onChange={this.handleChange.bind(this)}
              />
              <Form.Field
                control={Checkbox}
                label="Gostaria de participar da Gomorrah"
                value="Credit Check: Gomorrah"
                key={1}
                checked={this.state.tags.includes('Credit Check: Gomorrah')}
                onChange={this.handleChange.bind(this)}
              />
              <Form.Field
                control={Checkbox}
                label="Gostaria de participar do Ultra-Luxe"
                value="Credit Check: Ultra-Luxe"
                key={2}
                checked={this.state.tags.includes('Credit Check: Ultra-Luxe')}
                onChange={this.handleChange.bind(this)}
              />
            </Form.Field>
          </Segment>
        </Form>
        <style jsx global>{`
          .field label {
            color: #1bff80 !important;
          }
          .segment {
            padding: 20px !important;
          }
        `}</style>
      </React.Fragment>
    )
  }
}
