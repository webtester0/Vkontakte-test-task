import React from 'react';
import { styled } from 'linaria/react';

export const Button = ({ children, onClick }) => {
  return <Btn onClick={onClick}>{children}</Btn>;
};

const Btn = styled.button`
  background-color: #39c071;
  border-radius: 3px;
  color: #fff;
  border: none;
  padding: 8px;
  font-weight: bold;
  cursor: pointer;
`;
