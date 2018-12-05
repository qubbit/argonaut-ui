import styled from 'styled-components';

const Card = styled.div`
  max-width: 500px;
  margin: 2rem auto;

  & .card-header {
    border-top: 6px solid ${props => props.theme.primary};
  }
`;

export default Card;
