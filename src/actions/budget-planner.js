export const UPDATE_PLANNER = "UPDATE_PLANNER";

const updatePlanningSuccess = (newData) => ({
  type: UPDATE_PLANNER,
  data: newData 
});

export const updatePlanning = (newData) => async (dispatch) => {
  return dispatch(updatePlanningSuccess(newData));
};
