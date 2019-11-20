import React, { forwardRef } from "react";
import { styled } from "linaria/react";
import { Draggable } from "react-beautiful-dnd";

export const Card = forwardRef(({ children, cardIndex, columnIndex }, ref) => {
  return (
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
        </Wrapper>
      )}
    </Draggable>
  );
});

const Wrapper = styled.div`
  background-color: #fff;
  box-shadow: 0px 1px 4px rgba(9, 45, 66, 0.25);
  border-radius: 3px;
  padding: 12px;
  margin-bottom: 10px;
  line-height: 19px;
  cursor: grab;
`;
