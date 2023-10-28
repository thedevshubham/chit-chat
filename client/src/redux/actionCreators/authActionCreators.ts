import * as ActionTypes from "../actionTypes/authActionTypes";

// Signup action creators
export const signupRequest = () => ({
  type: ActionTypes.SIGNUP_REQUEST,
});

export const signupSuccess = (user: any) => ({
  type: ActionTypes.SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error: string) => ({
  type: ActionTypes.SIGNUP_FAILURE,
  payload: error,
});

// Login action creators
export const loginRequest = () => ({
  type: ActionTypes.LOGIN_REQUEST,
});

export const loginSuccess = (user: any) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error: string) => ({
  type: ActionTypes.LOGIN_FAILURE,
  payload: error,
});

// User action creators
export const setUser = (user: any) => ({
  type: ActionTypes.SET_USER_DETAILS,
  payload: user,
});
