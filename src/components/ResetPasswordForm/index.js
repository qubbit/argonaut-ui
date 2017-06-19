// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';
import Errors from '../Errors';

const styles = StyleSheet.create({
  card: {
    maxWidth: '500px',
    padding: '3rem 4rem',
    margin: '2rem auto',
  },
});

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
  errors: any,
}

class ResetPasswordForm extends Component {
  props: Props

  handleSubmit = (data) => this.props.onSubmit(data);

  render() {
    const { errors, handleSubmit, pristine, submitting } = this.props;

    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Create a New Password</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label>Password</label>
          <Field
            name="password"
            type="password"
            component={Input}
          />
          <Errors name="password" errors={errors} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Password confirmation</label>
          <Field
            name="password_confirmation"
            type="password"
            component={Input}
          />
          <Errors name="password_confirmation" errors={errors} />
        </div>
        <button
          type="submit"
          disabled={submitting || pristine}
          className="btn btn-block btn-primary"
        >
          {submitting ? 'Submitting...' : 'Create Password'}
        </button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum password length is 6 characters';
  }

  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Password confirmation does not match';
  }

  return errors;
};

export default reduxForm({
  form: 'reset_password',
  validate,
})(ResetPasswordForm);
