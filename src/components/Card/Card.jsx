import React from "react";
import { styled } from "linaria/react";
import { Draggable } from "react-beautiful-dnd";
import PropTypes from 'prop-types';
import { Button } from "components/Button";
import { css } from "linaria";

const DeleteButton = css`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 3px;
  max-height: 30px;
  display: flex;
  align-items: center;
  outline: none;
  border: none;
  background-color: transparent;
  font: inherit;
  color: inherit;
  &:hover {
    background-color: #c5ccd2;
  }
  &:active {
    background-color: #d6dbdf;
  }
`;

export const Card = ({ children, cardIndex, columnIndex, removeCard }) => {
  const handleOnClick = () => removeCard(columnIndex, cardIndex);
  return cardIndex !== 9999 ? (
    <Draggable
      draggableId={`card-${columnIndex}-${cardIndex}`}
      index={cardIndex}
    >
      {provided => (
        <Wrapper
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
          <Button onClick={handleOnClick} className={DeleteButton}>[X]</Button>
        </Wrapper>
      )}
    </Draggable>
  ) : (
    <Wrapper>{children}</Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  border-radius: 3px;
  padding: 12px;
  margin-bottom: 10px;
  line-height: 19px;
  cursor: grab;
`;

Card.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
  cardIndex: PropTypes.number.isRequired,
  columnIndex: PropTypes.number.isRequired,
  removeCard: PropTypes.func
}