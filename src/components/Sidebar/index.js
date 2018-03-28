// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { css, StyleSheet } from 'aphrodite';
import { Team } from '../../types';

const styles = StyleSheet.create({
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    background: '#007bff',
    position: 'fixed',
    height: '100%'
  },

  link: {
    position: 'relative',
    display: 'flex',
    width: '65px',
    color: 'rgba(255,255,255,.6)',
    ':hover': {
      textDecoration: 'none',
    },
    ':focus': {
      textDecoration: 'none',
    },
  },

  activeLink: {
    color: '#fff',
    ':after': {
      position: 'absolute',
      top: '12px',
      bottom: '12px',
      left: '0',
      width: '3px',
      background: 'rgba(255,255,255,.2)',
      borderTopRightRadius: '3px',
      borderBottomRightRadius: '3px',
      content: '""',
    }
  },

  badge: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '45px',
    height: '45px',
    margin: '12px auto',
    fontSize: '20px',
    background: 'rgba(255,255,255,.2)',
    borderRadius: '5px',
  },

  logoutButton: {
    padding: '0',
    background: 'transparent',
    border: '0',
    cursor: 'pointer',
  },
});

type TeamLinkProps = {
  team: Team
}

const TeamLink = ({ team }: TeamLinkProps) =>
  // TODO: use slug in URL
  <NavLink to={"/t/" + team.id} className={css(styles.link)} activeClassName={css(styles.activeLink)}>
    <div className={css(styles.badge)}>
      <span>{team.name.substring(0,3).toUpperCase()}</span>
    </div>
  </NavLink>;

type Props = {
  teams: Array<Team>,
  history: Object,
  onLogoutClick: () => void,
}

const Sidebar = ({ teams, history, onLogoutClick }: Props) =>
  <div className={css(styles.sidebar)}>
    {teams.map((team) => <TeamLink key={team.id} team={team} />)}
    <NavLink
      to="/"
      className={css(styles.link)}
      activeClassName={css(styles.activeLink)}
    >
      <div className={css(styles.badge)}>
        <i className="fas fa-users"></i>
      </div>
    </NavLink>
    <div style={{ flex: '1' }} />
    <NavLink
      to="/settings"
      className={css(styles.link)}
      activeClassName={css(styles.activeLink)}
    >
      <div className={css(styles.badge)}>
        <span className="fa fa-cog" />
      </div>
    </NavLink>
    <button
      onClick={() => onLogoutClick(history)}
      className={css(styles.link, styles.logoutButton)}
    >
      <div className={css(styles.badge)}>
        <span className="fa fa-sign-out-alt" />
      </div>
    </button>
  </div>;

export default Sidebar;
