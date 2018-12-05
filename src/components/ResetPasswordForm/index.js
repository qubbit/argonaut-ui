// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';
import Errors from '../Errors';
import Card from '../../elements/card';
import Button from '../../elements/button';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
  errors: any
};

class ResetPasswordForm extends Component {
  props: Props;

  handleSubmit = data => this.props.onSubmit(data);

  render() {
    const { errors, handleSubmit, pristine, submitting } = this.props;

    return (
      <Card className="card w-50">
        <form
          style={{ padding: '3rem 4rem' }}
          onSubmit={handleSubmit(this.handleSubmit)}>
          <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
            Create a New Password
          </h3>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <Field name="password" type="password" component={Input} />
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
          <Button
            type="submit"
            disabled={submitting || pristine}
            className="btn btn-block btn-primary">
            {submitting ? 'Submitting...' : 'Create Password'}
          </Button>
        </form>
      </Card>
    );
  }
}

const validate = values => {
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
  validate
})(ResetPasswordForm);
