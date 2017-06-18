// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import MailForm from '../../components/MailForm';
import {
  connectToChannel,
  leaveChannel,
  sendMail
} from '../../actions/team';
import { Pagination } from '../../types';

class Admin extends Component {

  handleMail = (data) => this.props.sendMail(data);

  render() {
    return (
      <div style={{ display: 'flex', flex: '1' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
          <MailForm onSubmit={this.handleMail} />
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    currentUser: state.session.currentUser
  }),
  { connectToChannel,
    leaveChannel,
    sendMail
  }
)(Admin);
