// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Input from '../Input';
import Select from '../Select';
import Errors from '../Errors';
import { READONLY_API_URL } from '../../config';
import { generateToken } from '../../utils';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  handleSubmit: () => void,
  errors: any,
}

class UserProfileForm extends Component {
  props: Props

  constructor(props) {
    super(props)

    this.state = { timeZones: [
      {value: 'America/Anchorage', text: 'Anchorage'},
      {value: 'America/Chicago', text: 'Chicago'},
      {value: 'America/Denver', text: 'Denver'},
      {value: 'America/Indianapolis', text: 'Indianapolis'},
      {value: 'America/Los_Angeles', text: 'Los Angeles'},
      {value: 'America/New_York', text: 'New York'},
      {value: 'America/Phoenix', text: 'Phoenix'},
      {value: 'America/Puerto_Rico', text: 'Puerto Rico'}
    ], user: this.props.initialValues };
  }

  handleSubmit = (data) => this.props.onSubmit(data);

  regenerateToken = (e) => {
    const token = generateToken(64);
    this.props.change('api_token', token);
    // TODO: investigate why this does not re-render the token url
    this.setState({ user: { ...this.state.user, token }});
    e.preventDefault();
  }

  render() {
    const { errors, handleSubmit, pristine, submitting } = this.props;

    return (
      <form style={{ width: '640px' }} onSubmit={handleSubmit(this.handleSubmit)} >
        <div style={{ marginBottom: '1rem' }}>
          <label>Username</label>
          <Field
            name="username"
            type="text"
            component={Input}
          />
          <Errors name="username" errors={errors} />
        </div>

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

        <div style={{ marginBottom: '1rem' }}>
          <label>Email</label>
          <Field
            name="email"
            type="email"
            component={Input}
          />
          <Errors name="email" errors={errors} />
        </div>

        <hr style={{ margin: '2rem 0' }} />

        <div style={{ marginBottom: '1rem' }}>
          <label>Avatar URL</label>
          <Field
            name="avatar_url"
            type="text"
            component={Input}
          />
          <Errors name="avatar_url" errors={errors} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>First name</label>
          <Field
            name="first_name"
            type="text"
            component={Input}
          />
          <Errors name="first_name" errors={errors} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Last name</label>
          <Field
            name="last_name"
            type="text"
            component={Input}
          />
          <Errors name="last_name" errors={errors} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Time zone</label>
          <Field
            name="time_zone"
            type="select"
            component={Select}
            options={this.state.timeZones}
          />
          <Errors name="time_zone" errors={errors} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>API Token</label>
          <Field
            name="api_token"
            component={Input}
            style={{ display: 'inline' }}
            readOnly={true}
          />
          <button className='btn' onClick={this.regenerateToken} style={{ marginTop: '1rem' }}><i className='fa fa-refresh' /> Regenerate</button>
          <Errors name="api_token" errors={errors} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <div className='alert alert-info'>
            <p>This is permanent token that lets you access the read-only API. You may regenerate a new token if you think your current one is compromised. Example:</p>
            <pre>{READONLY_API_URL}/teams/:team_id/reservations/?token={this.state.user.api_token}</pre>
          </div>
        </div>
        <button
          type="submit"
          disabled={pristine || submitting}
          className="btn btn-primary"
        >{submitting ? 'Saving' : 'Update'}</button>

      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.username) {
    errors.username = 'Required';
  }

  if (!values.email) {
    errors.email = 'Required';
  }

  if (values.password !== values.password_confirmation) {
    errors.password_confirmation = 'Password confirmation does not match';
  }

  return errors;
};

UserProfileForm = reduxForm({
  form: 'userProfile',
  validate,
})(UserProfileForm);

UserProfileForm = connect(
  (state) => ({
    initialValues: state.session.currentUser
  }),
  {}
)(UserProfileForm);

export default UserProfileForm;
