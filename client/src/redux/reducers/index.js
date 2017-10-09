import { combineReducers } from "redux";
import user from "./user";
import students from "./student";
import tasks from "./task";
import rewards from "./rewards";
import rewardOptions from "./rewardOptions";
import notifications from "./notifications";
import classrooms from "./classrooms";

import { START_REQUEST, END_REQUEST } from "../actions/index";

const initialState = {
  isFetching: false,
  error: null
};

const status = (state = status, action) => {
  switch (action.type) {
    case END_REQUEST:
      return {
        ...state,
        status: {
          isFetching: false,
          error: action.data
        }
      };
    case START_REQUEST:
      return {
        ...state,
        status: {
          isFetching: true,
          error: null
        }
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user,
  students,
  tasks,
  rewards,
  rewardOptions,
  notifications,
  classrooms,
  status
});

export default rootReducer;