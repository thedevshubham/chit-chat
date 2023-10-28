import * as ActionTypes from "../actionTypes/chatActionTypes";

interface ChatState {
  chatHistory: Record<string, string[]>;
  isLoading: boolean;
  error: string | null;
}

const initialState: ChatState = {
  chatHistory: {},
  isLoading: false,
  error: null,
};

const chatReducer = (
  state: ChatState = initialState,
  action: any
): ChatState => {
  switch (action.type) {
    case ActionTypes.FETCH_PRIVATE_CHAT_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case ActionTypes.SET_PRIVATE_CHAT_SUCCESS:
      const { chatRecepientId, receipientMessage } = action;
      console.log({ chatRecepientId, receipientMessage });

      return {
        ...state,
        chatHistory: {
          ...state.chatHistory,
          [chatRecepientId]: [
            ...(state.chatHistory[chatRecepientId] || []),
            receipientMessage,
          ],
        },
        isLoading: false,
        error: null,
      };
    case ActionTypes.SET_ALL_PRIVATE_CHAT_SUCCESS:
      return {
        ...state,
        chatHistory: action.payload,
      };
    case ActionTypes.SET_PRIVATE_CHAT_FAILURE:
      return {
        ...state,
        isLoading: true,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default chatReducer;
