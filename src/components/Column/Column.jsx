import React from "react";
import { Card } from "components/Card";
import { AddForm } from "components/AddForm";
import { styled } from "linaria/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

export const Column = ({
  title,
  cards,
  onAddColumn,
  onRemoveColumn,
  onAddCard,
  reorderCards,
  columnIndex
}) => {
  const handleRemoveColumn = () => {
    confirm("Вы действитильно хотите удалить колонку ?")
      ? onRemoveColumn(columnIndex)
      : null;
  };

  const onDragEnd = result => {
    const { source, destination } = result;
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }
    reorderCards({
      source,
      destination
    });
  };

  return (
    <ColumnWrapper>
      <Inner>
        {title && (
          <Header>
            <Title>{title}</Title>
            <ButtonDelete onClick={handleRemoveColumn}>[X]</ButtonDelete>
          </Header>
        )}
        <BodyContent>
          {cards && (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId={`column-${columnIndex}`}>
                {provided => (
                  <Items {...provided.droppableProps} ref={provided.innerRef}>
                    {cards.map((card, index) => (
                      <Card
                        key={index}
                        cardIndex={index}
                        columnIndex={columnIndex}
                        ref={provided.innerRef}
                      >
                        {card}
                      </Card>
                    ))}
                    {provided.placeholder}
                  </Items>
                )}
              </Droppable>
            </DragDropContext>
          )}
        </BodyContent>
        <AddForm
          isEmptyColumn={cards}
          addColumn={onAddColumn}
          addCard={onAddCard}
          columnIndex={columnIndex}
        ></AddForm>
      </Inner>
    </ColumnWrapper>
  );
};

const ColumnWrapper = styled.div`
  width: 272px;
  margin: 0 4px;
  height: calc(100vh - 40px);
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
`;

const Inner = styled.div`
  background-color: #dfe1e6;
  border-radius: 3px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  position: relative;
  white-space: normal;
`;

const BodyContent = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
`;

const Items = styled.div`
  padding: 0 12px 0 12px;
`;

const Header = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin: 0 12px 10px 12px;
`;

const ButtonDelete = styled.button`
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

const Title = styled.b`
  display: block;
  padding-top: 12px;
`;
