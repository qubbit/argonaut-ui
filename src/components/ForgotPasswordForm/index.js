// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';
import Errors from '../Errors';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    margin: '2rem auto'
  }
});

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
  errors: any
};

class ForgotPasswordForm extends Component {
  props: Props;

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { errors, handleSubmit, pristine, submitting } = this.props;

    return (
      <div className={`card w-50 ${css(styles.card)}`}>
        <div className="card-header">
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Forgot Password
          </h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                name="email"
                type="email"
                component={Input}
                placeholder="Email"
              />
              <Errors name="email" errors={errors} />
            </div>
            <button
              type="submit"
              disabled={submitting || pristine}
              className="btn btn-block btn-primary">
              {submitting ? 'Submitting...' : 'Reset Password'}
            </button>
          </form>
        </div>
        <div className="card-footer">
          <p>
            On the off chance you remembered your password, click here to{' '}
            <Link to="/login"> login</Link>.
          </p>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'forgot_password',
  validate
})(ForgotPasswordForm);
