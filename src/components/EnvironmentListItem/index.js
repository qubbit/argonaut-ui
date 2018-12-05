// @flow
import React from 'react';
import { Environment } from '../../types';
import Button from '../../elements/button';
type Props = {
  environment: Environment,
  onEnvironmentDelete: () => void,
  onEnvironmentEdit: () => void
};

const EnvironmentListItem = ({
  environment,
  onEnvironmentDelete,
  onEnvironmentUpdate
}: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
      <span style={{ marginRight: '8px' }}>{environment.name}</span>
      <span className="environmentControls">
        <Button
          onClick={() => onEnvironmentUpdate(environment)}
          className="btn btn-sm btn-primary">
          <i className="fa fa-edit" /> Edit
        </Button>
        <button
          onClick={() => onEnvironmentDelete(environment.id)}
          className="btn btn-sm btn-danger">
          <i className="fa fa-trash" /> Delete
        </button>
      </span>
    </div>
  );
};

export default EnvironmentListItem;
