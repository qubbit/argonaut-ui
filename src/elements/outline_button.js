import styled from 'styled-components';

const OutlineButton = styled.button`
  &&& {
    background: ${props => props.theme.primary};
    border-color: ${props => props.theme.primary};
    cursor: pointer;
    color: #fff;
  }
`;

export default OutlineButton;
