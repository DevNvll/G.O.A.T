import React from 'react'
import { Button, Item, Image } from 'semantic-ui-react'

export default class Profile extends React.Component {
  render() {
    return (
      <div className="profile">
        <Image
          size="tiny"
          src={this.props.avatar}
          avatar
          floated="left"
          verticalAlign="top"
        />
        <React.Fragment>
          <span className="username">
            {this.props.username}
            <br />
            <Button
              style={{ marginTop: '10px' }}
              content="Sair"
              icon="right arrow"
              labelPosition="right"
              size="mini"
              compact
              primary
              negative
              onClick={() => this.props.onLogout()}
            />
          </span>
        </React.Fragment>

        <style jsx>{`
          .profile {
            display: -ms-flexbox;
            display: -webkit-flex;
            display: flex;
            -ms-flex-align: center;
            -webkit-align-items: center;
            -webkit-box-align: center;
            align-items: center;
            justify-content: center;
            padding-top: 10px;
          }
          .profile .username {
            font-weight: bold;
            font-size: 1.6em;
            margin-top: -10px;
          }
          @media only screen and (max-width: 600px) {
            .logoutBtn {
              text-align: center;
            }
          }
        `}</style>
      </div>
    )
  }
}
