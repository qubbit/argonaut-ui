// @flow
import React from 'react';
import { Application } from '../../types';
import Button from '../../elements/button';

type Props = {
  application: Application,
  onApplicationDelete: () => void,
  onApplicationUpdate: () => void
};

const ApplicationListItem = ({
  application,
  onApplicationDelete,
  onApplicationUpdate
}: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '10px'
      }}>
      <span style={{ marginRight: '8px' }}>{application.name}</span>
      <span className="applicationControls">
        <Button
          onClick={() => onApplicationUpdate(application)}
          className="btn btn-sm btn-primary">
          <i className="fa fa-edit" /> Edit
        </Button>
        <button
          onClick={() => onApplicationDelete(application.id)}
          className="btn btn-sm btn-danger">
          <i className="fa fa-trash" /> Delete
        </button>
      </span>
    </div>
  );
};

export default ApplicationListItem;
