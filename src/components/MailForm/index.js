// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';
import Textarea from '../Textarea';
import Errors from '../Errors';

const styles = StyleSheet.create({
  card: {
    width: '80%',
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

class MailForm extends Component {
  props: Props

  handleSubmit = (data) => {
    // TODO: ugghhh HALP!
    const payload = {...data, message: document.querySelector("form").querySelector("textarea").value };
    return this.props.onSubmit(payload);
  }

  render() {
    const { errors, handleSubmit, pristine, submitting } = this.props;

    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>Mail</h3>
        <div style={{ marginBottom: '1rem' }}>
          <label>To</label>
          <Field
            name="to"
            type="text"
            component={Input}
            autofocus={true}
          />
          <Errors name="to" errors={errors} />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <label>Subject</label>
          <Field
            name="subject"
            type="text"
            component={Input}
          />
          <Errors name="to" errors={errors} />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Message</label>
          <Field
            name="message"
            rows="10"
            cols="120"
            component={Textarea}
          />
          <Errors name="message" errors={errors} />
        </div>
        <button
          type="submit"
          disabled={submitting || pristine}
          className="btn btn-primary"
        >
          <i className='fa fa-send'></i> {submitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};

  if (!values.to) {
    errors.to = 'Required';
  }

  if (!values.subject) {
    errors.subject = 'Required';
  }

  return errors;
};

export default reduxForm({
  form: 'mail_form',
  validate,
})(MailForm);
