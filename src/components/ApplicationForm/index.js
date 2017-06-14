// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { css, StyleSheet } from 'aphrodite';
import Input from '../Input';

const styles = StyleSheet.create({
  card: {
    maxWidth: '400px',
    padding: '20px',
    margin: '20px',
  },
});

type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean
}

class ApplicationForm extends Component {
  props: Props

  handleSubmit = (data) => {
    this.props.onSubmit(data);
    this.props.reset();
  }

  render() {
    const { handleSubmit, submitting, pristine, initialValues } = this.props;
    const updating = initialValues.id ? true : false;
    const label = updating ? 'Update' : 'Create';

    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}
      >
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          { updating ? 'Edit' : 'Create' } application
        </h3>
        <Field name="name" type="text" component={Input} placeholder="Name (probably has no spaces)" style={{ marginBottom: '1rem' }} />
        <Field name="ping" type="text" component={Input} placeholder="Ping route (usually _ping)" style={{ marginBottom: '1rem' }} />
        <Field name="repo" type="text" component={Input} placeholder="Repo (like pbm/epamotron)" style={{ marginBottom: '1rem' }} />
        <button
          type="submit"
          disabled={submitting || pristine}
          className="btn btn-block btn-primary"
        >
          { submitting ? 'Saving...' : label }
        </button>
      </form>
    );
  }
}

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.ping) {
    errors.ping = 'Required';
  }
  if (!values.repo) {
    errors.repo = 'Required';
  }
  return errors;
};

ApplicationForm = reduxForm({
  form: 'application',
  validate,
  enableReinitialize: true
})(ApplicationForm);

ApplicationForm = connect(
  (state) => ({
    initialValues: state.team.editingApplication
  })
)(ApplicationForm);

export default ApplicationForm;
