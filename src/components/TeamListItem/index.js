// @flow
import React, { Component } from 'react';
import includes from 'lodash/includes';
import { Team } from '../../types';
import { Link } from 'react-router-dom';
import OutlineButton from '../../elements/outline_button';
import PopupConfirm from '../PopupConfirm';

type Props = {
  team: Team,
  currentUserTeamIds: Array<number>,
  currentUser: User,
  onTeamJoinOrLeave: () => void,
  onTeamDelete: () => void
};

class TeamListItem extends Component {
  constructor(props: Props) {
    super(props);
    this.state = { showDeleteConfirmation: false };
  }

  onTeamDeleteConfirmation = () => {
    this.setState({ showDeleteConfirmation: true });
  };

  render() {
    const {
      team,
      currentUserTeamIds,
      currentUser,
      onTeamJoinOrLeave,
      onTeamDelete
    } = this.props;

    const isJoined = includes(currentUserTeamIds, team.id);
    const buttonClassSuffix = isJoined ? 'secondary' : 'success';

    let deleteButton;

    if (team.owner_id === currentUser.id || currentUser.is_admin) {
      deleteButton = (
        <button
          onClick={() => this.onTeamDeleteConfirmation(team.id)}
          className="btn btn-sm btn-danger">
          <i className="fa fa-trash" /> Delete
        </button>
      );
    }
    console.log(this.state);
    return (
      <div
        key={team.id}
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
        <span style={{ marginRight: '8px' }}>{team.name}</span>
        <PopupConfirm
          visible={this.state.showDeleteConfirmation}
          onCancel={() => this.setState({ showDeleteConfirmation: false })}
          onConfirm={() => onTeamDelete(team.id)}>
          Are you sure you want to delete the team <strong>{team.name}</strong>?
        </PopupConfirm>

        <span className="teamControls">
          <Link to={`/t/${team.id}/admin`}>
            <OutlineButton className="btn btn-sm btn-outline-primary">
              <i className="fa fa-wrench" /> Admin
            </OutlineButton>
          </Link>
          {deleteButton}
          <button
            onClick={e => onTeamJoinOrLeave(e.currentTarget.innerText, team.id)}
            className={`btn btn-sm btn-outline-${buttonClassSuffix}`}
            style={{ width: '72px' }}>
            {isJoined ? (
              <span>
                <i className="fa fa-sign-out-alt" /> Leave
              </span>
            ) : (
              <span>
                <i className="fa fa-sign-in" /> Join
              </span>
            )}
          </button>
        </span>
      </div>
    );
  }
}

export default TeamListItem;
