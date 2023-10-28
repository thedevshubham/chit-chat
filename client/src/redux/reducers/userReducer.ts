import * as ActionTypes from "../actionTypes/userActionTypes";

const initialState = {
  users: [],
  currentChatUser: null,
  onlineUsers: [],
  isLoading: false,
  error: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ActionTypes.FETCH_USERS_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionTypes.FETCH_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
        error: null,
      };
    case ActionTypes.FETCH_USERS_FAILURE:
      return {
        ...state,
        users: [],
        isLoading: false,
        error: action.payload,
      };
    case ActionTypes.SET_CURRENT_CHAT_USER:
      return {
        ...state,
        currentChatUser: action.payload,
      };
    case ActionTypes.SET_ONLINE_USERS:
      return {
        ...state,
        onlineUsers: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
