// @flow
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Team } from '../../types';
import styled from 'styled-components';

const StyledSidebar = styled.div`
  background: ${props => props.theme.primary};
  display: flex;
  flex-direction: column;
  position: fixed;
  height: 100%;
`;

const StyledNavLink = styled(NavLink)`
  position: relative;
  display: flex;
  width: 65px;
  color: rgba(255, 255, 255, 0.6);
  &:hover: {
    text-decoration: none;
  }
  &:focus: {
    text-decoration: none;
  }
  &:active: {
    color: #fff;
    &:after: {
      position: absolute;
      top: 12px;
      bottom: 12px;
      left: 0;
      width: 3px;
      background: rgba(255, 255, 255, 0.2);
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      content: '';
    }
  }
`;

const Badge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  margin: 12px auto;
  font-size: 20px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
`;

const LogoutButton = styled.button`
  padding: 0;
  background: transparent;
  border: 0;
  cursor: pointer;
`;

type TeamLinkProps = {
  team: Team
};

const TeamLink = ({ team }: TeamLinkProps) => (
  // TODO: use slug in URL
  <StyledNavLink to={'/t/' + team.id}>
    <Badge>
      <span>{team.name.substring(0, 3).toUpperCase()}</span>
    </Badge>
  </StyledNavLink>
);

type Props = {
  teams: Array<Team>,
  history: Object,
  onLogoutClick: () => void
};

const Sidebar = ({ teams, history, onLogoutClick }: Props) => (
  <StyledSidebar className="sidebar">
    {teams.map(team => <TeamLink key={team.id} team={team} />)}
    <StyledNavLink to="/">
      <Badge>
        <i className="fas fa-users" />
      </Badge>
    </StyledNavLink>
    <div style={{ flex: '1' }} />
    <StyledNavLink to="/settings">
      <Badge>
        <span className="fa fa-cog" />
      </Badge>
    </StyledNavLink>
    <LogoutButton onClick={() => onLogoutClick(history)}>
      <Badge>
        <span className="fa fa-sign-out-alt" />
      </Badge>
    </LogoutButton>
  </StyledSidebar>
);

export default Sidebar;
