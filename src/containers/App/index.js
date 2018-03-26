// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authenticate, unauthenticate, logout } from '../../actions/session';

import Home from '../Home';
import Login from '../Login';
import Signup from '../Signup';
import ForgotPassword from '../ForgotPassword';
import ResetPassword from '../ResetPassword';
import Alert from '../Alert';
import Team from '../Team';
import TeamAdmin from '../TeamAdmin';
import Admin from '../Admin';
import UserSettingsContainer from '../UserSettings';

import NotFound from '../../components/NotFound';
import MatchAuthenticated from '../../components/MatchAuthenticated';
import RedirectAuthenticated from '../../components/RedirectAuthenticated';
import Sidebar from '../../components/Sidebar';
import UserProfileForm from '../../components/UserProfileForm';

import { Team as TeamType } from '../../types';

type Props = {
  authenticate: () => void,
  unauthenticate: () => void,
  isAuthenticated: boolean,
  willAuthenticate: boolean,
  logout: () => void,
  currentUserTeams: Array<TeamType>,
}

class App extends Component {
  componentDidMount() {
    const token = localStorage.getItem('token');

    if (token) {
      this.props.authenticate();
    } else {
      this.props.unauthenticate();
    }
  }

  props: Props

  handleLogout = (history) => this.props.logout(history);

  render() {
    const { isAuthenticated, willAuthenticate, currentUserTeams, history } = this.props;
    const authProps = { isAuthenticated, willAuthenticate };
    const authStyles = {  width: '100%', marginLeft: '64px' };

    return (<div style={{ display: 'flex', flex: '1' }}>
      <Alert pathname={history.location.pathname} />
      {isAuthenticated &&
        <Sidebar
          history={history}
          teams={currentUserTeams}
          onLogoutClick={this.handleLogout}
        />
      }
      <div style={ isAuthenticated ? authStyles : {} }>
        <MatchAuthenticated exact path="/" component={Home} {...authProps} />
        <MatchAuthenticated exact path="/t/:id" component={Team} {...authProps} />
        <MatchAuthenticated exact path="/t/:id/admin" component={TeamAdmin} {...authProps} />
        <MatchAuthenticated exact path="/settings" component={UserSettingsContainer} {...authProps} />
        <MatchAuthenticated exact path="/settings/profile" component={UserProfileForm} {...authProps} />
        <MatchAuthenticated exact path="/admin" component={Admin} {...authProps} />
      </div>
      <RedirectAuthenticated exact path="/login" component={Login} {...authProps} />
      <RedirectAuthenticated exact path="/signup" component={Signup} {...authProps} />
      <RedirectAuthenticated exact path="/forgot_password" component={ForgotPassword} {...authProps} />
      <RedirectAuthenticated exact path="/reset_password/:token" component={ResetPassword} {...authProps} />
    </div>);
  }
}

export default withRouter(connect(
  (state) => ({
    isAuthenticated: state.session.isAuthenticated,
    willAuthenticate: state.session.willAuthenticate,
    currentUserTeams: state.teams.currentUserTeams,
  }),
  { authenticate, unauthenticate, logout }
)(App));
