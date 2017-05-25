// @flow
import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { css, StyleSheet } from 'aphrodite';

const styles = StyleSheet.create({
  input: {
    display: 'inline-block',
    marginLeft: '4px',
    width: '640px',
    padding: '2px',
    lineHeight: '1',
    fontSize: '12px',
    color: 'rgb(120,120,120)',
  },

  button: {
    cursor: 'pointer',
    background: '#fff',
    border: '0',
    padding: '3px 5px',
    marginLeft: '5px',
    borderRadius: '4px',
    ':hover': {
      boxShadow: '0 0 2px rgba(0,0,0,.25)',
    },
  },

  submitButton: {
    color: 'rgb(64,151,141)',
  },

  cancelButton: {
    color: 'rgb(255,59,48)',
  },
});

type Props = {
  onSubmit: () => void,
  onCancel: () => void,
  submitting: boolean,
  handleSubmit: () => void,
}

class DescriptionForm extends Component {
  props: Props

  handleSubmit = (data) => {
    if(this.props.pristine) {
      this.props.onCancel();
      return false;
    }

    this.props.onSubmit(data);
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <button
          type="submit"
          disabled={submitting}
          className={css(styles.button, styles.submitButton)}
        >
          <span className="fa fa-check" /> Update
        </button>
        <button
          type="button"
          disabled={submitting}
          onClick={this.props.onCancel}
          className={css(styles.button, styles.cancelButton)}
        >
          <span className="fa fa-times" /> Cancel
        </button>
        <Field
          type="text"
          name="description"
          component="input"
          className={`form-control ${css(styles.input)}`}
          autoFocus={true}
          autoComplete="off"
        />
      </form>
    );
  }
}

export default reduxForm({
  form: 'description',
})(DescriptionForm);
