import styled from 'styled-components';

const StyledLink = styled.a`
  &&& {
    color: ${props => props.theme.primary};
  }
`;

export default StyledLink;
