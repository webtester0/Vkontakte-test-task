import React from 'react';
import { styled } from 'linaria/react';

export const Card = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  border-radius: 3px;
  padding: 12px;
  margin-bottom: 10px;
  line-height: 19px;
`;
