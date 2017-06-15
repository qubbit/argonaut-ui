// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router';
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

class ForgotPasswordForm extends Component {
  props: Props

  handleSubmit = (data) => this.props.onSubmit(data);

  render() {
    const { errors, handleSubmit, pristine, submitting } = this.props;

    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Forgot Password</h3>
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
          className="btn btn-block btn-primary"
        >
          {submitting ? 'Submitting...' : 'Reset Password'}
        </button>
        <hr style={{ margin: '2rem 0' }} />
        <p>
          On the off chance you remembered your password, click here to <Link to="/login"> login</Link>.
        </p>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.email) {
    errors.email = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'forgot_password',
  validate,
})(ForgotPasswordForm);
