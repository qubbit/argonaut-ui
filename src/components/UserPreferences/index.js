// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../elements/button';
import { changeThemeColor } from '../../actions/application';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  onVacationMode: () => void
};

const THEME_COLORS = {
  'Heroku Purple': '#6f3bff',
  Red: '#f44336',
  'Bubble Gum': '#e91e63',
  X: '#9c27b0',
  X2: '#673ab7',
  X3: '#3f51b5',
  X4: '#2196f3',
  X5: '#03a9f4',
  X6: '#00bcd4',
  Teal: '#00bcd4',
  'Vine Snek': '#4caf50',
  'High Vis': '#8bc34a',
  CMM: '#ff9800',
  Punkin: '#ff5722',
  Brown: '#607d8b',
  Slate: '#9e9e9e',
  Centrist: '#607d8b'
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

  handleChangeThemeColor(c) {
    this.props.changeThemeColor(c);
    console.log(c);
  }

  render() {
    const { submitting } = this.state;

    return (
      <div style={{ width: '640px' }}>
        <h4>Theme Color</h4>
        <div className="theme-chooser">
          {Object.keys(THEME_COLORS).map(x => (
            <button
              key={`color-${x}`}
              onClick={() =>
                this.handleChangeThemeColor({
                  type: 'preset',
                  color: THEME_COLORS[x]
                })
              }
              style={{
                width: '24px',
                height: '24px',
                marginRight: '5px',
                border: '0 none',
                backgroundColor: THEME_COLORS[x]
              }}
            />
          ))}
        </div>
        <Button className="btn btn-sm btn-primary">Dynamic</Button>
        <input
          type="color"
          onChange={() =>
            this.handleChangeThemeColor({ type: 'custom', value: '#004023' })
          }
        />{' '}
        Custom
        <hr />
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

export default connect(state => ({ application: state.application }), {
  changeThemeColor
})(UserPreferences);
