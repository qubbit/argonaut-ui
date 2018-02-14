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
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleResetPassword = (data) => {
    return this.props.resetPassword({ ...data, token: this.props.params.token }, this.context.router);
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
