import actionTypes from "../actionTypes";

export const addCard = (text, columnIndex) => ({
  type: actionTypes.ADD_CARD,
  payload: { text, columnIndex }
});
