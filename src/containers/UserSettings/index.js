// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Pagination } from '../../types';
import Navbar from '../../components/Navbar';
import UserProfileForm from '../../components/UserProfileForm';
import UserTeamSettings from '../../components/UserTeamSettings';
import UserPreferences from '../../components/UserPreferences';
import { updateUserProfile, vacationMode } from '../../actions/user';
import { css, StyleSheet } from 'aphrodite';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';

const styles = StyleSheet.create({
  card: {
    width: '720px',
    margin: '2rem auto'
  }
});

const StyledTabList = styled(TabList)`
  margin-bottom: 32px;
  padding: 0;
  color: ${props => props.theme.primary};
  border-bottom: 1px solid ${props => props.theme.primary};
  & .react-tabs__tab--selected {
    border-color: ${props => props.theme.primary} !important;
    color: ${props => props.theme.primary} !important;
  }
`;

type Props = {
  params: {
    id: number
  },
  currentUser: Object,
  pagination: Pagination
};

class UserSettingsContainer extends Component {
  props: Props;

  // NOTE: we are returning a Promise object here
  // this allows redux-form to set the submitting flag to
  // true until the promise is resolved
  handleUserProfileUpdate = data => this.props.updateUserProfile(data);

  handleVacationMode = user =>
    this.props.vacationMode(this.props.currentUser.id);

  render() {
    return (
      <div style={{ display: 'flex', flex: '1' }}>
        <div style={{ display: 'flex', flexDirection: 'column', flex: '1' }}>
          <Navbar />
          <div
            className={`card ${css(styles.card)}`}
            style={{ display: 'flex', margin: '2em auto' }}>
            <div style={{ padding: '32px' }}>
              <Tabs>
                <StyledTabList>
                  <Tab>
                    <i className="fa fa-user-circle" /> Profile
                  </Tab>
                  <Tab>
                    <i className="fa fa-adjust" /> Preferences
                  </Tab>
                  <Tab>
                    <i className="fa fa-users" /> Teams
                  </Tab>
                  <Tab>
                    <i className="fa fa-info-circle" /> About
                  </Tab>
                </StyledTabList>

                <TabPanel>
                  <UserProfileForm
                    user={this.props.currentUser}
                    onSubmit={this.handleUserProfileUpdate}
                  />
                </TabPanel>
                <TabPanel>
                  <UserPreferences
                    user={this.props.currentUser}
                    onVacationMode={this.handleVacationMode}
                  />
                </TabPanel>
                <TabPanel>
                  <UserTeamSettings
                    user={this.props.currentUser}
                    teamEventHandlers={this.handleUserProfileUpdate}
                  />
                </TabPanel>
                <TabPanel>
                  <div className="alert alert-info">
                    <p>
                      Shipping of Argonaut was made possible by{' '}
                      <strong>Gopal Adhikari</strong>, and the following
                      contributors.
                    </p>
                    <ul>
                      <li>Matt Bramson </li>
                    </ul>
                    <ul>
                      <li>Chris Doggett</li>
                    </ul>
                    <ul>
                      <li>Alan Baird</li>
                    </ul>
                    <ul>
                      <li>Mike Lustig</li>
                    </ul>
                    <ul>
                      <li>Chris Hutchinson</li>
                    </ul>
                  </div>
                </TabPanel>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    currentUser: state.session.currentUser,
    pagination: state.team.pagination,
    teams: state.teams,
    submitting: false
  }),
  { updateUserProfile, vacationMode }
)(UserSettingsContainer);
