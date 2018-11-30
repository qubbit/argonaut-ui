// @flow
import React, { Component } from 'react';
import Button from '../../elements/button';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  onVacationMode: () => void
};

class UserPreferences extends Component {
  props: Props;

  constructor(props) {
    super(props);
    this.state = { submitting: false };
  }

  handleVacationMode = () => {
    this.setState({ submitting: true });

    this.props.onVacationMode().then(() => {
      this.setState({ submitting: false });
    });
  };

  render() {
    const { submitting } = this.state;

    return (
      <div style={{ width: '640px' }}>
        <div className="alert alert-warning">
          Use vacation mode to release all your reservations across all the
          teams.
        </div>
        <Button
          className={submitting ? 'btn' : 'btn btn-primary'}
          disabled={submitting}
          onClick={this.handleVacationMode}>
          {submitting ? 'Working...' : 'Vacation Mode'}
        </Button>
      </div>
    );
  }
}

export default UserPreferences;
