import React from "react";
import { styled } from "linaria/react";
import { Draggable } from "react-beautiful-dnd";

export const Card = ({ children, cardIndex, columnIndex, removeCard }) => {
  const handleOnClick = () => {
    console.log(columnIndex, cardIndex);
    removeCard(columnIndex, cardIndex);
  };
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
          <DeleteButton onClick={handleOnClick}>[X]</DeleteButton>
        </Wrapper>
      )}
    </Draggable>
  ) : (
    <Wrapper>{children}</Wrapper>
  );
};

const DeleteButton = styled.button`
  outline: none;
  border: none;
  cursor: pointer;
  padding: 3px;
  &:hover {
    background-color: #c5ccd2;
  }
  &:active {
    background-color: #d6dbdf;
  }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  border-radius: 3px;
  padding: 12px;
  margin-bottom: 10px;
  line-height: 19px;
  cursor: grab;
`;
