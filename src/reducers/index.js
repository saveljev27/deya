import { combineReducers } from 'redux';
import screenActivitiesReducer from './screen-activities';
import budgetPlannerReducer from './budget-planner';

const reducers = {
  screenActivities: screenActivitiesReducer,
  budgetPlanner: budgetPlannerReducer
}

export default combineReducers(reducers);
