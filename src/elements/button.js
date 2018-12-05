import styled from 'styled-components';

const Button = styled.button`
  &&& {
    background: ${props => props.theme.primary};
    border-color: ${props => props.theme.primary};
  }
`;

export default Button;
