// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';
import Errors from '../Errors';
import { generateToken } from '../../utils/';

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

class SignupForm extends Component {
  props: Props;

  handleSubmit = data => {
    data.api_token = generateToken(64);
    return this.props.onSubmit(data);
  };

  render() {
    const { errors, handleSubmit, submitting } = this.props;

    return (
      <div className={`card w-50 ${css(styles.card)}`}>
        <div className="card-header">
          <h3 style={{ textAlign: 'center' }}>Create an account</h3>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(this.handleSubmit)}>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                name="username"
                type="text"
                component={Input}
                placeholder="Username"
              />
              <Errors name="username" errors={errors} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                name="email"
                type="email"
                component={Input}
                placeholder="Email"
              />
              <Errors name="email" errors={errors} />
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <Field
                name="password"
                type="password"
                component={Input}
                placeholder="Password"
              />
              <Errors name="password" errors={errors} />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-block btn-primary">
              {submitting ? 'Submitting...' : 'Sign up'}
            </button>
          </form>
        </div>
        <div className="card-footer text-center">
          <span>Have an account?</span>{' '}
          <Link to="/login">Sign in</Link>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  }
  if (!values.email) {
    errors.email = 'Required';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Minimum of 6 characters';
  }
  return errors;
};

export default reduxForm({
  form: 'signup',
  validate
})(SignupForm);
