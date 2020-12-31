import styled from 'styled-components';
import px2vw from '../../utils/px2vw';

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: ${px2vw(32)};
  max-width: 100%;
  @media (min-width: 1024px) {
    flex-wrap: nowrap;
  }
`
