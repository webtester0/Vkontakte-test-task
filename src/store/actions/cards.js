import actionTypes from "../actionTypes";

export const addCard = (text, columnIndex) => ({
  type: actionTypes.ADD_CARD,
  payload: { text, columnIndex }
});

export const reorderCards = ({ source, destination }) => ({
  type: actionTypes.CARDS_REORDER,
  payload: {
    source,
    destination
  }
});

export const removeCard = (columnIndex, cardIndex) => ({
  type: actionTypes.REMOVE_CARD,
  payload: {
    columnIndex,
    cardIndex
  }
});
