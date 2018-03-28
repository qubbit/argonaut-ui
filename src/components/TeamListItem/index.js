// @flow
import React from 'react';
import includes from 'lodash/includes';
import { Team } from '../../types';
import { Link } from 'react-router-dom';

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

  let adminButton;
  let deleteButton;

  if (team.owner_id === currentUser.id) {
    adminButton = (
      <button className="btn btn-sm btn-outline-primary">
        <Link to={`/t/${team.id}/admin`}>
          <i className="fa fa-wrench" /> Admin
        </Link>
      </button>
    );
    deleteButton = (
      <button
        onClick={() => onTeamDelete(team.id)}
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
      <span className="teamControls">
        {adminButton}
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
