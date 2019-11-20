import React from "react";
import { Card } from "components/Card";
import { AddForm } from "components/AddForm";
import { styled } from "linaria/react";

export const Column = ({
  title,
  cards,
  onAddColumn,
  onRemoveColumn,
  onAddCard,
  columnIndex
}) => {
  const handleRemoveColumn = () => onRemoveColumn(columnIndex);

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
            <Items>
              {cards.map((card, index) => (
                <Card key={index}>{card}</Card>
              ))}
            </Items>
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
