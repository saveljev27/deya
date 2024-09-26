import { CLOSE_FEEDBACK_FORM, OPEN_FEEDBACK_FORM, OPEN_CART_POP_UP, CLOSE_CART_POP_UP } from "@/actions/screen-activities";

const initialState = {
  feedbackFormOpened: false,
  cartPopUpOpened: false,
  form: null
};

export default function screenActivitiesReducer(state = initialState, action) {
  switch (action.type) {
    case OPEN_FEEDBACK_FORM: {
      return {
        ...state,
        feedbackFormOpened: true,
        form: {
          name: action.form
        }
      };
    }
    case CLOSE_FEEDBACK_FORM: {
      return {
        ...state,
        feedbackFormOpened: false,
        form: null
      };
    }
    case OPEN_CART_POP_UP: {
      return {
        ...state,
        cartPopUpOpened: true
      };
    }
    case CLOSE_CART_POP_UP: {
      return {
        ...state,
        cartPopUpOpened: false
      };
    }
    default: {
      return state;
    }
  }
};
