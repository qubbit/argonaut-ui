// @flow
import React from 'react';
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

const TeamListItem = ({
  team,
  currentUserTeamIds,
  currentUser,
  onTeamJoinOrLeave,
  onTeamDelete
}: Props) => {
  const isJoined = includes(currentUserTeamIds, team.id);
  const buttonClassSuffix = isJoined ? 'secondary' : 'success';

  const onTeamDeleteConfirmation = () => {};
  let deleteButton;

  if (team.owner_id === currentUser.id || currentUser.is_admin) {
    deleteButton = (
      <button
        onClick={() => onTeamDeleteConfirmation(team.id)}
        className="btn btn-sm btn-danger">
        <i className="fa fa-trash" /> Delete
      </button>
    );
  }

  return (
    <div
      key={team.id}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
      <span style={{ marginRight: '8px' }}>{team.name}</span>
      <PopupConfirm visible onConfirm={() => onTeamDelete(team.id)}>
        Are you sure you want to delete <strong>{team.name}</strong>
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
};

export default TeamListItem;
