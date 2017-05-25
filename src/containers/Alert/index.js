// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { hideAlert } from '../../actions/alert';
import Alert from '../../components/Alert';

type Props = {
  pathname: string,
  visible: boolean,
  type: string,
  timeout?: number,
  message: string,
  hideAlert: () => void,
}

class AlertContainer extends Component {
  componentWillReceiveProps(nextProps) {
    const { visible, pathname } = this.props;

    if (visible && pathname !== nextProps.pathname) {
      this.props.hideAlert();
    }
  }

  shouldComponentUpdate(nextProps) {
    if (nextProps.visible !== this.props.visible) return true;
    return false;
  }

  props: Props

  handleClose = () => this.props.hideAlert();

  render() {
    const { visible, type, timeout, message } = this.props;

    return visible
      ? <Alert
        message={message}
        timeout={timeout}
        onClose={this.handleClose}
        type={type}
      />
      : null;
  }
}

export default connect(
  (state) => ({
    message: state.alert.message,
    visible: state.alert.visible,
    timeout: state.alert.timeout,
    type: state.alert.type
  }),
  { hideAlert }
)(AlertContainer);
