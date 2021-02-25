import React from 'react';
import styled from 'styled-components';

export const ContainerStyles = styled.section`
  padding: 6rem 0;
  width: 80%;
  margin: 0 auto;
  max-width: 1440px;
`;

function Container({ children }) {
  return <ContainerStyles>{children}</ContainerStyles>;
}

export default Container;
