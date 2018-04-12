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
    margin: '20px'
  }
});

type Props = {
  onSubmit: () => void,
  handleSubmit: () => void,
  submitting: boolean
};

class EnvironmentForm extends Component {
  props: Props;

  handleSubmit = data => {
    this.props.onSubmit(data);
    this.props.reset();
  };

  render() {
    const { handleSubmit, submitting, pristine, initialValues } = this.props;
    const updating = initialValues.id ? true : false;
    const label = updating ? 'Update' : 'Create';

    return (
      <form
        className={`card ${css(styles.card)}`}
        onSubmit={handleSubmit(this.handleSubmit)}>
        <h3 style={{ marginBottom: '2rem', textAlign: 'center' }}>
          {updating ? 'Edit' : 'Create'} environment
        </h3>
        <Field
          name="name"
          type="text"
          component={Input}
          placeholder="Name (like pbm1)"
          style={{ marginBottom: '1rem' }}
        />
        <Field
          name="description"
          type="text"
          component={Input}
          placeholder="Description"
          style={{ marginBottom: '1rem' }}
        />
        <Field
          name="is_integration"
          id="is_integration"
          type="checkbox"
          className="form-check-input"
          component={Input}
          label="Integration Environment"
          style={{ marginBottom: '1rem' }}
        />
        <button
          type="submit"
          disabled={submitting || pristine}
          className="btn btn-block btn-primary">
          {submitting ? 'Saving...' : label}
        </button>
      </form>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required';
  }
  if (!values.description) {
    errors.description = 'Required';
  }
  return errors;
};

EnvironmentForm = reduxForm({
  form: 'environment',
  validate,
  enableReinitialize: true
})(EnvironmentForm);

EnvironmentForm = connect(state => ({
  initialValues: state.team.editingEnvironment
}))(EnvironmentForm);

export default EnvironmentForm;
