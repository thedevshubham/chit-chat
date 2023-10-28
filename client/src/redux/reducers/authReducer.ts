import * as ActionTypes from "../actionTypes/authActionTypes";

const initialState = {
  user: null,
  error: null,
  isLoading: false,
};

const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case ActionTypes.SIGNUP_FAILURE:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload,
      };
    case ActionTypes.SET_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case ActionTypes.LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    case ActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        user: null,
        isLoading: false,
        error: action.payload,
      };
    case ActionTypes.SET_USER_DETAILS:
      return {
        ...state,
        user: action.payload,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
};

export default authReducer;
