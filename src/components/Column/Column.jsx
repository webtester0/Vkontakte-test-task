import React from "react";
import { Card } from "components/Card";
import { AddForm } from "components/AddForm";
import { styled } from "linaria/react";
import { Droppable } from "react-beautiful-dnd";
import PropTypes from 'prop-types';

export const Column = ({
  title,
  cards,
  onAddColumn,
  onRemoveColumn,
  onAddCard,
  onRemoveCard,
  columnIndex
}) => {
  const handleRemoveColumn = () => {
    confirm("Вы действитильно хотите удалить колонку ?")
      ? onRemoveColumn(columnIndex)
      : null;
  };

  return cards ? (
    <Droppable droppableId={`column-${columnIndex}`}>
      {provided => (
        <ColumnWrapper {...provided.droppableProps} ref={provided.innerRef}>
          <Inner>
            {title && (
              <Header>
                <Title>{title}</Title>
                <ButtonDelete onClick={handleRemoveColumn}>[X]</ButtonDelete>
              </Header>
            )}
            <BodyContent>
              {
                <Items>
                  {cards.map((card, index) => (
                    <Card
                      key={index}
                      cardIndex={index}
                      columnIndex={columnIndex}
                      removeCard={onRemoveCard}
                    >
                      {card}
                    </Card>
                  ))}
                  {provided.placeholder}
                </Items>
              }
            </BodyContent>
            <AddForm
              isEmptyColumn={cards}
              addColumn={onAddColumn}
              addCard={onAddCard}
              columnIndex={columnIndex}
            ></AddForm>
          </Inner>
        </ColumnWrapper>
      )}
    </Droppable>
  ) : (
    <Droppable droppableId={`column-${columnIndex}`}>
      {provided => (
        <ColumnWrapper {...provided.droppableProps} ref={provided.innerRef}>
          <Inner>
            <AddForm
              isEmptyColumn={cards}
              addColumn={onAddColumn}
              addCard={onAddCard}
              columnIndex={columnIndex}
            ></AddForm>
          </Inner>
        </ColumnWrapper>
      )}
    </Droppable>
  );
};

const ColumnWrapper = styled.div`
  width: 272px;
  margin: 0 4px;
  height: calc(100vh - 40px);
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
  margin-top: 15px;
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
  background-color: transparent;
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

Column.propTypes ={ 
  cards: PropTypes.node,
  title: PropTypes.string,
  columnIndex: PropTypes.number,
  onAddColumn: PropTypes.func,
  onRemoveColumn: PropTypes.func,
  onAddCard: PropTypes.func,
  onRemoveCard: PropTypes.func,
}