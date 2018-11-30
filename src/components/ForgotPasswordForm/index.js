// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';
import Errors from '../Errors';
import Card from '../../elements/card';
import Button from '../../elements/button';
import StyledLink from '../../elements/styled_link';

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
      <Card className={`card w-50`}>
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
            <Button
              type="submit"
              disabled={submitting || pristine}
              className="btn btn-block btn-primary">
              {submitting ? 'Submitting...' : 'Reset Password'}
            </Button>
          </form>
        </div>
        <div className="card-footer">
          <p>
            On the off chance you remembered your password, click here to{' '}
            <StyledLink to="/login"> login</StyledLink>.
          </p>
        </div>
      </Card>
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
