import * as ActionTypes from "../actionTypes/userActionTypes";

// Users action creators
export const fetchUsersRequest = () => ({
  type: ActionTypes.FETCH_USERS_REQUEST,
});

export const setChatUsers = (users: any) => ({
  type: ActionTypes.FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error: string) => ({
  type: ActionTypes.FETCH_USERS_FAILURE,
  payload: error,
});

export const setCurrentChatUser = (user: any) => ({
  type: ActionTypes.SET_CURRENT_CHAT_USER,
  payload: user,
});

export const setOnlineUsers = (user: []) => ({
  type: ActionTypes.SET_ONLINE_USERS,
  payload: user,
});
