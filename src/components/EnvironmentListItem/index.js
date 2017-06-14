// @flow
import React from 'react';
import { Environment } from '../../types';

type Props = {
  environment: Environment,
  onEnvironmentDelete: () => void,
  onEnvironmentEdit: () => void
}

const EnvironmentListItem = ({ environment, onEnvironmentDelete, onEnvironmentUpdate }: Props) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
      <span style={{ marginRight: '8px' }}>{environment.name}</span>
      <span className='environmentControls'>
        <button onClick={() => onEnvironmentUpdate(environment)} className="btn btn-sm btn-primary">
          <i className='fa fa-edit'></i> Edit
        </button>
        <button onClick={() => onEnvironmentDelete(environment.id)} className="btn btn-sm btn-danger">
          <i className='fa fa-trash'></i> Delete
        </button>
      </span>
    </div>
  );
};

export default EnvironmentListItem;
