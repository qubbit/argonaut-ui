// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { resetPassword } from '../../actions/session';
import ResetPasswordForm from '../../components/ResetPasswordForm';
import Navbar from '../../components/Navbar';

type Props = {
  resetPassword: () => void,
  errors: Array<string>,
}

class ForgotPassword extends Component {
  props: Props

  handleResetPassword = (data) => {
    return this.props.resetPassword({ ...data, token: this.props.params.token }, this.props.history);
  }

  render() {
    return (
      <div style={{ flex: '1' }}>
        <Navbar />
        <ResetPasswordForm onSubmit={this.handleResetPassword} errors={this.props.errors} />
      </div>
    );
  }
}

export default connect(
  (state) => ({
    errors: state.session.forgotPasswordErrors,
  }),
  { resetPassword }
)(ForgotPassword);
