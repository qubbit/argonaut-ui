// @flow
import React, { Component } from 'react';
import moment from 'moment-timezone';
import { css, StyleSheet } from 'aphrodite';
import { Reservation as ReservationType } from '../../types';
import { userSettings } from '../../actions/session';
import store from '../../store';
import StyledLink from '../../elements/styled_link';
import ThinButton from '../../elements/thin_button';
import PopupConfirm from '../PopupConfirm';

const styles = StyleSheet.create({
  container: {
    flex: '1',
    background: '#fff',
    overflowY: 'auto',
    minHeight: '100vh'
  }
});

type Props = {
  reservations: Array<ReservationType>
};

class ReservationTableHeader extends Component {
  render() {
    var environmentNames = this.props.environments.map(env => (
      <th key={`environment-${env.name}-${env.id}`}>{env.name}</th>
    ));
    return (
      <tr>
        <th />
        {environmentNames}
      </tr>
    );
  }
}

function getReservation(app, env, reservations) {
  return reservations.find(
    r => r.application.id === app.id && r.environment.id === env.id
  );
}

class ReservationCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReleaseConfirmation: false,
      reserved: false,
      hover: false
    };
  }

  onMouseOverHandler(e) {
    this.setState({ hover: true });
  }

  onMouseOutHandler(e) {
    this.setState({ hover: false });
  }

  doRelease = e => {
    const data = { reservation_id: parseInt(e, 10) };
    this.props.eventHandlers.onReleaseClick(data);
    this.setState({ hover: false });
  };

  doReserve = (application_id, environment_id) => {
    const data = { application_id, environment_id };
    this.props.eventHandlers.onReserveClick(data);
    this.setState({ showReleaseConfirmation: false });
  };

  showReleaseConf = e => {
    this.setState({ showReleaseConfirmation: true });
    e.preventDefault();
  };

  dismissReleaseConf = e => {
    this.setState({ showReleaseConfirmation: false });
    e.preventDefault();
  };

  isMember = () => {
    var state = store.getState();
    return state.teams.currentUserTeams.find(
      t => t.id === state.team.currentTeam.id
    );
  };

  render() {
    const { reservation, application, environment, currentUser } = this.props;

    var user = { username: '', avatar_url: '' };
    var time = '';
    var reservationString = '';

    let releaseButton;

    var canRelease =
      reservation &&
      (userSettings().is_admin || reservation.user.id === userSettings().id);
    const username = currentUser.username;

    if (canRelease) {
      releaseButton = (
        <div>
          <ThinButton
            onClick={this.showReleaseConf.bind(this)}
            className="tool-item">
            <i className="fa fa-unlock" />
            <span className="tool-label">Release</span>
          </ThinButton>
          <PopupConfirm
            onConfirm={() => this.doRelease(reservation.id)}
            onCancel={() => this.setState({ showReleaseConfirmation: false })}
            visible={this.state.showReleaseConfirmation}>
            {' '}
            Are you sure you want to release {environment.name}:
            {application.name} which is in use by{' '}
            <strong>
              {reservation.user.username === username
                ? 'you'
                : reservation.user.username}
            </strong>
            ?
          </PopupConfirm>
        </div>
      );
    }

    let reserveButton;

    // TODO: optimize this expensive operation, the goal here is to allow
    // creator of the ReservationCell to pass in canRelease and canReserve
    var canReserve = reservation == null && this.isMember();

    if (canReserve) {
      reserveButton = (
        <ThinButton
          className="tool-item"
          style={{ display: 'block' }}
          onClick={() => this.doReserve(application.id, environment.id)}>
          <i className="fa fa-lock" />
          <span className="tool-label">Reserve</span>
        </ThinButton>
      );
    }

    if (reservation) {
      user = reservation.user;

      time = moment(reservation.reserved_at)
        .tz(userSettings().time_zone || 'America/New_York')
        .format('MMMM D, h:mm a');
      reservationString = `${user.username} since ${time}`;
    }

    let visibilityClassName = 'hidden';

    if (this.state.hover) {
      visibilityClassName = 'not-hidden';
    }

    let reservationMeta;

    if (reservation) {
      reservationMeta = (
        <div className="reservation-meta">
          <img alt="Avatar" src={user.avatar_url} height="64" />
          <span className="reservation-info">{reservationString}</span>
        </div>
      );
    }

    const environmentType = environment.is_integration
      ? 'integration'
      : 'testing';

    return (
      <td
        style={{ minWidth: '100px' }}
        onMouseOut={this.onMouseOutHandler.bind(this)}
        onMouseOver={this.onMouseOverHandler.bind(this)}
        className={
          'reservation-cell ' + application.name + '-' + environment.name
        }>
        {reservationMeta}
        <div className={'toolbar ' + visibilityClassName}>
          {reserveButton}
          {releaseButton}
          <a
            target={'_blank'}
            href={`https://${environment.name}-${
              application.name
            }.${environmentType}.covermymeds.com/${application.ping}`}
            className="tool-item">
            <ThinButton>
              <i className="fa fa-info" />
              <span className="tool-label"> Info</span>
            </ThinButton>
          </a>
        </div>
      </td>
    );
  }
}

class ReservationRow extends Component {
  render() {
    const { application, environments, reservations, currentUser } = this.props;

    var x = 0;
    var cells = environments.map(env => {
      var key = 'reservation-cell-' + ++x;
      const reservation = getReservation(application, env, reservations);
      return (
        <ReservationCell
          key={key}
          reservation={reservation}
          application={application}
          environment={env}
          currentUser={currentUser}
          eventHandlers={this.props.eventHandlers}
        />
      );
    });

    return (
      <tr
        className={'application-row ' + application.name}
        key={application.name}>
        <td className="application-name">
          <strong>{application.name}</strong>
          <div className="toolbar">
            <span className="tool-item">
              <a href={`https://git.innova-partners.com/${application.repo}`}>
                <i className="fab fa-github" />
              </a>
            </span>
          </div>
        </td>
        {cells}
      </tr>
    );
  }
}

class ReservationTable extends Component {
  props: Props;
  container: () => void;

  constructor(props) {
    super(props);
    this.state = { user: userSettings() };
  }

  renderReservations() {
    var x = 0;

    const reservationRows = this.props.applications.map(app => {
      return (
        <ReservationRow
          key={'reservation-row-' + ++x}
          reservations={this.props.reservations}
          application={app}
          environments={this.props.environments}
          eventHandlers={this.props.eventHandlers}
          currentUser={this.state.user}
        />
      );
    });

    return (
      <table key="table" className="table table-bordered">
        <thead>
          <ReservationTableHeader
            key={'reservation-table-header-0'}
            environments={this.props.environments}
          />
        </thead>
        <tbody>{reservationRows}</tbody>
      </table>
    );
  }

  render() {
    let nodes = [];
    let hasApplications = true;
    let hasEnvironments = true;

    if (this.props.applications.length === 0) {
      hasApplications = false;
      nodes.push(
        <div key="noApplicationsMessage" className="disappointed">
          <h3>
            No applications to show{' '}
            <span role="img" aria-label="sad face">
              😞
            </span>
          </h3>
        </div>
      );
    }
    if (this.props.environments.length === 0) {
      hasEnvironments = false;
      nodes.push(
        <div key="noEnvironmentsMessage" className="disappointed">
          <h3>
            No environments to show{' '}
            <span role="img" aria-label="sad face">
              😢
            </span>
          </h3>
        </div>
      );
    }
    if (hasApplications && hasEnvironments) {
      nodes.push(this.renderReservations());
    } else if (this.props.team.owner_id === this.state.user.id) {
      nodes.push(
        <div key="add-stuff-link-container" className="disappointed">
          <StyledLink
            to={`/t/${this.props.team.id}/admin`}
            className="btn btn-sm">
            <h3>
              <i className="fa fa-wrench" /> Go on and add them!
            </h3>
          </StyledLink>
        </div>
      );
    }
    return (
      <div
        className={css(styles.container)}
        ref={c => {
          this.container = c;
        }}>
        {nodes}
      </div>
    );
  }
}
export default ReservationTable;
