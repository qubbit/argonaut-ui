// @flow
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  fetchTeams,
  createTeam,
  joinTeam,
  leaveTeam,
  deleteTeam
} from '../../actions/teams';
import NewTeamForm from '../../components/NewTeamForm';
import Navbar from '../../components/Navbar';
import TeamListItem from '../../components/TeamListItem';
import Pager from '../../components/Pager';
import { Team, Pagination } from '../../types';
import { userSettings } from '../../actions/session';
import Card from '../../elements/card';

type Props = {
  teams: Array<Team>,
  currentUserTeams: Array<Team>,
  fetchTeams: () => void,
  createTeam: () => void,
  joinTeam: () => void,
  leaveTeam: () => void,
  newTeamErrors: Array<string>,
  pagination: Pagination
};

type State = {
  page: number,
  page_size: number
};

class Home extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      page: 1,
      page_size: 5,
      user: userSettings()
    };
  }

  state: State;

  componentDidMount() {
    this.loadTeams();
  }

  props: Props;

  loadTeams() {
    const { page, page_size } = this.state;
    this.props.fetchTeams({ page, page_size });
  }

  handlePagerClick = direction => {
    if (direction === 'next') {
      this.setState(
        {
          page: this.state.page + 1
        },
        () => {
          this.loadTeams();
        }
      );
    } else if (direction === 'prev') {
      this.setState(
        {
          page: this.state.page - 1
        },
        () => {
          this.loadTeams();
        }
      );
    }
  };

  handleNewTeamSubmit = data => this.props.createTeam(data, this.props.history);

  handleTeamJoinOrLeave = (text, teamId) => {
    if (text.trim() === 'Leave') {
      return this.props.leaveTeam(teamId);
    }
    return this.props.joinTeam(teamId, this.props.history);
  };

  handleTeamDelete = teamId => {
    return this.props.deleteTeam(teamId);
  };

  renderTeams() {
    const currentUserTeamIds = [];
    this.props.currentUserTeams.map(team => currentUserTeamIds.push(team.id));

    return this.props.teams.map(team => (
      <TeamListItem
        key={team.id}
        team={team}
        onTeamJoinOrLeave={this.handleTeamJoinOrLeave}
        onTeamDelete={this.handleTeamDelete}
        currentUserTeamIds={currentUserTeamIds}
        currentUser={this.state.user}
      />
    ));
  }

  render() {
    const allowNewTeamCreation = this.state.user.is_admin;
    let newTeamFormContainer;
    if (allowNewTeamCreation) {
      newTeamFormContainer = (
        <Card className="card w-50">
          <div className="card-body">
            <h5 className="card-title">Create a new team</h5>
            <NewTeamForm
              onSubmit={this.handleNewTeamSubmit}
              errors={this.props.newTeamErrors}
            />
          </div>
        </Card>
      );
    }
    return (
      <div style={{ flex: '1', overflowY: 'auto' }}>
        <Navbar />
        <Card className="card w-50">
          <div className="card-header">
            <h5>
              <i className="fas fa-users" /> Teams
            </h5>
          </div>
          <div className="card-body">{this.renderTeams()}</div>
          <div className="card-footer text-muted">
            <Pager
              pagination={this.props.pagination}
              onPagerClick={this.handlePagerClick}
            />
          </div>
        </Card>
        {newTeamFormContainer}
      </div>
    );
  }
}

export default connect(
  state => ({
    teams: state.teams.all,
    currentUserTeams: state.teams.currentUserTeams,
    newTeamErrors: state.teams.newTeamErrors,
    pagination: state.teams.pagination
  }),
  { fetchTeams, createTeam, joinTeam, leaveTeam, deleteTeam }
)(Home);
