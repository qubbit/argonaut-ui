import styled from 'styled-components';
import OutlineButton from './outline_button';

const ThinButton = styled(OutlineButton)`
  &&& {
    border-radius: 5px;
    border: 1px solid ${props => props.theme.primary};
    cursor: pointer;
    color: #333;
    background: #fff;
    width: 100px;
  }
`;

export default ThinButton;
