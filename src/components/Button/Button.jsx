import React from 'react';
import { styled } from 'linaria/react';
import PropTypes from 'prop-types';

export const Button = ({ children, onClick, className }) => {
  return <Btn onClick={onClick} className={className}>{children}</Btn>;
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

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
}