import React, { Component } from 'react'
import Router from 'next/router'
import { Container } from 'semantic-ui-react'

import ManualRegras from '../components/ManualRegras'
import ManualTags from '../components/ManualTags'
import ManualKarma from '../components/ManualKarma'
import ManualNetwork from '../components/ManualNetwork'
import ManualPipboy from '../components/ManualPipboy'
import ManualTheStrip from '../components/ManualTheStrip'

const Stepper = ({ step, next }) => {
  switch (step) {
    case 0:
      return <ManualRegras next={next} />
    case 1:
      return <ManualTags next={next} />
    case 2:
      return <ManualKarma next={next} />
    case 3:
      return <ManualNetwork next={next} />
    case 4:
      return <ManualPipboy next={next} />
    case 5:
      return <ManualTheStrip next={next} />
  }
}

class index2 extends Component {
  constructor() {
    super()
    this.state = {
      step: 0
    }
  }

  handleNext() {
    if (this.state.step === 5) {
      Router.push('/goat')
      localStorage.setItem('regras', 'true')
      return
    }
    this.setState({ step: this.state.step + 1 })
  }
  render() {
    return (
      <Container>
        <Stepper step={this.state.step} next={this.handleNext.bind(this)} />

        <style jsx global>{`
          @font-face {
            font-family: pipboy;
            src: url(./static/monofonto.ttf);
          }
          ::selection,
          ::-moz-selection {
            background-color: #0bff80 !important;
          }
          body {
            display: flex;
            background-color: #121212;
            justify-content: center;
            color: #1bff80;
            font-family: 'Roboto', sans-serif;
            background-repeat: no-repeat;
            background-attachment: fixed;
            font-family: pipboy;
          }
          .container {
            padding-top: 50px;
          }
          .ui.inverted.green.button,
          .ui.inverted.green.buttons .button {
            background-color: transparent;
            box-shadow: 0 0 0 2px #1bff80 inset !important;
            color: #1bff80;
            font-family: pipboy;
          }
          .ui.inverted.green.button:hover,
          .ui.inverted.green.buttons .button:hover {
            background-color: #1bff80;
          }
        `}</style>
      </Container>
    )
  }
}

export default index2
