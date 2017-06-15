// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { forgotPassword } from '../../actions/session';
import ForgotPasswordForm from '../../components/ForgotPasswordForm';
import Navbar from '../../components/Navbar';

type Props = {
  forgotPassword: () => void,
  errors: Array<string>,
}

class ForgotPassword extends Component {
  static contextTypes = {
    router: PropTypes.object,
  }

  props: Props

  handleForgotPassword = (data) => this.props.forgotPassword(data, this.context.router);

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
