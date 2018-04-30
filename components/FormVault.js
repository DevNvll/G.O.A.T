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
  'Children of the Atom',
  'Raider Gangs',
  'Midwest Chapter',
  'Sem Especificação',
  'Sem Especificação',
  '+18',
  '-18'
]

const TagCategories = {
  'Fallout 1': [
    'Blades',
    'Regulators (FO1)',
    'Unity',
    'Brotherhood of Steel',
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
    "Lyon's Pride",
    'Regulators (FO3)',
    'Tunnel Snakes',
    "Reilly's Rangers",
    'Talon Company',
    'Children of the Atom',
    'BoS - Outcasts',
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
    'Brotherhood of Steel',
    'Raider Gangs',
    'Sorrows',
    'Twisted Hairs'
  ],
  'Fallout 4': [
    'Railroad',
    'Minutemen',
    'Institute',
    "Maxson's Pride",
    'Atom Cats',
    'Children of the Atom',
    'Raider Gangs'
  ],
  'Fallout Tactics': ['Midwest Chapter']
}

export default class TagsForm extends React.Component {
  constructor() {
    super()
    this.state = {
      form: {},
      error: false,
      sent: false,
      tags: [],
      loading: true
    }
  }
  componentDidMount() {
    axios({
      method: 'GET',
      url: `/userTags/${this.props.userid}`
    }).then(({ data }) => {
      this.setState({ tags: data.filter(i => TAGS.includes(i)) })
      this.setState({ loading: false })
    })
  }
  handleSubmit(e) {}
  handleClose() {
    location.reload()
  }
  handleChange = (answ, tag) => {
    if (!this.state.tags.includes(tag.value))
      this.setState({
        tags: [
          ...this.state.tags.filter(i => i !== 'Sem Especificação'),
          tag.value
        ]
      })
    else {
      this.setState({ tags: this.state.tags.filter(i => i !== tag.value) })
    }
    axios({
      method: 'POST',
      url: `/handleTags`,
      data: { tag: tag.value, token: getToken() }
    })
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
          <Segment style={{ margin: '50px' }} loading={this.state.loading}>
            <Form.Group unstackable>
              {Object.keys(TagCategories).map(game => {
                return (
                  <div style={{ paddingRight: '10px' }} key={game}>
                    <Form.Field>
                      <label>{game}</label>
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
          <Segment style={{ margin: '50px' }} loading={this.state.loading}>
            <Form.Field>
              <label>Idade</label>
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
            </Form.Field>
          </Segment>
        </Form>
      </React.Fragment>
    )
  }
}
