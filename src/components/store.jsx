import { configureStore } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  notes: [],
  newNote: "",
  bold: false,
  italic: false,
  underline: false,
  fontSize: 16,
  fontFamily: "Arial",
};

// Define reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_NOTE":
      return {
        ...state,
        notes: [
          ...state.notes,
          { text: state.newNote, formatting: { ...state } },
        ],
        newNote: "",
        bold: false,
        italic: false,
        underline: false,
      };
    case 'UPDATE_NOTE':
        return {...state, [action.payload.field]: action.payload.value};  
      case "EDIT_NOTE":
        return {
          ...state,
          notes: state.notes.map((note, index) =>
            index === action.payload.index
              ? { ...note, text: action.payload.newText }
              : note
          ),
        };
      case "DELETE_NOTE":
        return {
          ...state,
          notes: state.notes.filter(
            (note, index) => index !== action.payload.index
          ),
        };
      default:
        return state;
  }
};

const store = configureStore({
  reducer: reducer,
});

export default store;
