// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '../../elements/button';
import { changeThemeColor } from '../../actions/application';
import { colorForToday } from '../../utils';

type Props = {
  onSubmit: () => void,
  submitting: boolean,
  onVacationMode: () => void
};

const THEME_COLORS = {
  'Heroku Purple': '#6f3bff',
  'Grape Fuit': '#f44336',
  'Bubble Gum': '#e91e63',
  Aubergine: '#9c27b0',
  'New Orleans': '#673ab7',
  Cobalt: '#3f51b5',
  Sky: '#2196f3',
  Arctic: '#03a9f4',
  Cerulean: '#00bcd4',
  Teal: '#009688',
  Moss: '#4caf50',
  'Vine Snek': '#8bc34a',
  'Kinda CMM': '#ff9800',
  Punkin: '#ff5722',
  Chocolate: '#795548',
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
  }

  render() {
    const { submitting } = this.state;
    const { theme } = this.props.application;

    return (
      <div style={{ width: '640px' }}>
        <div className="theme-chooser">
          <h4>Theme color</h4>
          <div>
            Current: {theme.color} {theme.name && `(${theme.name})`}
          </div>
          <div style={{ marginTop: '10px' }} className="theme-chooser-presets">
            {Object.keys(THEME_COLORS).map(x => (
              <button
                key={`color-${x}`}
                title={x}
                onClick={() =>
                  this.handleChangeThemeColor({
                    type: 'preset',
                    color: THEME_COLORS[x],
                    name: x
                  })
                }
                style={{
                  backgroundColor: THEME_COLORS[x],
                  border: '0 none',
                  borderRadius: '3px',
                  height: '24px',
                  marginRight: '7px',
                  width: '24px',
                  verticalAlign: 'text-bottom'
                }}
              />
            ))}
            <button
              style={{
                backgroundColor: colorForToday(),
                border: '0 none',
                borderRadius: '3px',
                color: '#fff',
                height: '24px',
                marginRight: '7px'
              }}
              onClick={() =>
                this.handleChangeThemeColor({
                  type: 'dynamic'
                })
              }>
              Dynamic
            </button>{' '}
          </div>
          <div style={{ marginTop: '10px' }}>
            <input
              type="color"
              id="custom-color-input"
              onChange={e =>
                this.handleChangeThemeColor({
                  type: 'custom',
                  color: e.target.value
                })
              }
            />{' '}
            <label htmlFor="custom-color-input">Custom</label>
          </div>
          <div className="alert alert-info">
            Dynamic color is based on the day of the year. Theme color is
            persisted using local storage. Clearing the browser data will also
            clear the custom theme color you've set
          </div>
        </div>
        <hr />
        <h4>Gone fishin'</h4>
        <div className="alert alert-info">
          Use vacation mode to release all your reservations across all the
          teams
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
