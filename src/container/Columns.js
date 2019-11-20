import React from "react";
import { Column } from "components/Column";
import { connect } from "react-redux";
import { addColumn, removeColumn } from "../store/actions/colums";
import { addCard } from "../store/actions/cards";

const Columns = ({ items, addColumnAction, addCardAction, removeColumnAction }) => (
  <>
    {items.map((item, index) => (
      <Column
        {...item}
        key={index}
        onAddColumn={addColumnAction}
        onRemoveColumn={removeColumnAction}
        onAddCard={addCardAction}
        columnIndex={index}
      />
    ))}
    <Column onAddColumn={addColumnAction} onAddCard={addCardAction} />
  </>
);

//mapStateToProps -> функция, которая возвращает объект из Store, который будет ипользоваться в props контейнера Columns
//в нашем случае mapStateToProps в качестве аргумента принимает store оттуда достает нужный state через деструктуризацию -> colums
//и возвращает объект со свойством items, в котором находится массив данных

const mapStateToProps = ({ columns }) => ({ items: columns });

//mapDispatchToProps -> функция, с помощью которой (dispatch) мы можем отлавливать события взаимодействия пользователя
// с интерфейсом и далее обрабытвать их, с помощью reducers
//mapDispatchToProps в качестве аргумента принимает функцию dispatch и action, который необходимо отловить
const mapDispatchToProps = dispatch => ({
  addColumnAction: title => dispatch(addColumn(title)),
  addCardAction: (text, columnIndex) => dispatch(addCard(text, columnIndex)),
  removeColumnAction: columnIndex => dispatch(removeColumn(columnIndex))
});

export default connect(mapStateToProps, mapDispatchToProps)(Columns);
