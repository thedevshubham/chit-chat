import * as ActionTypes from "../actionTypes/chatActionTypes";

// chat action creators
export const fetchChatRequest = () => ({
  type: ActionTypes.FETCH_PRIVATE_CHAT_REQUEST,
});

export const setMessagesInContext = (
  chatRecepientId: string,
  receipientMessage: any
) => ({
  type: ActionTypes.SET_PRIVATE_CHAT_SUCCESS,
  chatRecepientId,
  receipientMessage,
});

export const setAllMessagesInContext = (messages: any) => ({
  type: ActionTypes.SET_ALL_PRIVATE_CHAT_SUCCESS,
  payload: messages,
});

export const fetchChatRequestFailure = (error: string) => ({
  type: ActionTypes.SET_PRIVATE_CHAT_FAILURE,
  payload: error,
});
