// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/session';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import Navbar from '../../components/Navbar';

type Props = {
  forgotPassword: () => void,
  errors: Array<string>,
}

class ForgotPassword extends Component {
  props: Props

  handleForgotPassword = (data) => this.props.forgotPassword(data, this.props.history);

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <ForgotPasswordForm onSubmit={this.handleForgotPassword} errors={this.props.errors} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    errors: state.session.forgotPasswordErrors,
  }),
  { forgotPassword }
)(ForgotPassword);
