export const OPEN_FEEDBACK_FORM = "OPEN_FEEDBACK_FORM";
export const CLOSE_FEEDBACK_FORM = "CLOSE_FEEDBACK_FORM";
export const OPEN_CART_POP_UP = "OPEN_CART_POP_UP";
export const CLOSE_CART_POP_UP = "CLOSE_CART_POP_UP";

const openFeedbackFormSuccess = (form) => ({
  type: OPEN_FEEDBACK_FORM,
  form: form
});

const closeFeedbackFormSuccess = () => ({
  type: CLOSE_FEEDBACK_FORM,
});

export const openFeedbackForm = (form) => async (dispatch) => {
  document.body.style.overflow = "hidden";
  return dispatch(openFeedbackFormSuccess(form));
};

export const closeFeedbackForm = () => async (dispatch) => {
  document.body.style.overflow = "visible";
  return dispatch(closeFeedbackFormSuccess());
};

const openCartPopUpSuccess = () => ({
  type: OPEN_CART_POP_UP
});

const closeCartPopUpSuccess = () => ({
  type: CLOSE_CART_POP_UP,
});

export const openCartPopUp = () => async (dispatch) => {
  return dispatch(openCartPopUpSuccess());
};

export const closeCartPopUp = () => async (dispatch) => {
  return dispatch(closeCartPopUpSuccess());
};