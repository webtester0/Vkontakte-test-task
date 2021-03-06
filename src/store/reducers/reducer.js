import actionTypes from "../actionTypes";
import reorderCards from "../../helpers/reorderCards";

const initialState = [
  {
    title: "First column",
    cards: ["do homework", "drink coffee"]
  },
  {
    title: "Second column",
    cards: [
      "check myciip application",
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae assumenda voluptas veritatis eveniet doloribus voluptatum ullam tempore vel earum quae!",
    ]
  }
];

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_CARD:
      return state.map((item, index) => {
        if (action.payload.columnIndex === index) {
          return {
            ...item,
            cards: [...item.cards, action.payload.text]
          };
        }
        return item;
      });
    case actionTypes.REMOVE_CARD:
      return state.map((item, index) => {
        if (action.payload.columnIndex === index) {
          return {
            ...item,
            cards: item.cards.filter(
              (_, index) => action.payload.cardIndex !== index
            )
          };
        }
        return item;
      });
    case actionTypes.ADD_COLUMN:
      return [
        ...state,
        {
          title: action.payload,
          cards: []
        }
      ];
    case actionTypes.REMOVE_COLUMN:
      return state.filter((item, index) => index !== action.payload);
    case actionTypes.CARDS_REORDER:
      const { source, destination } = action.payload;
      return reorderCards({ state, source, destination });
    default:
      return state;
  }
};
