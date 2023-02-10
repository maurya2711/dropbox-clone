import React from "react";
import produce from "immer";

// Auth Context
export const AuthContext = React.createContext();

// Initial State
const initialState = {
  user: {},
  isAuthenticated: false,
  isLoading: false,
  uploadedFiles: [],
};

// Actions
export const actions = {
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  AUTH_STATUS: "AUTH_STATUS",
  LOGOUT_SUCCESS: "LOGOUT_SUCCESS",
  LOADING_STATUS: "LOADING_STATUS",
  UPLOADED_FILES: "UPLOADED_FILES",
};

// Reducer to Handle Actions
const authReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    const data = draft;
    const { type, payload } = action;
    switch (type) {
      case actions.LOGIN_SUCCESS:
        data.user = payload;
        data.isAuthenticated = true;
        data.isLoading = false;
        break;
      case actions.AUTH_STATUS:
        data.isAuthenticated = true;
        break;
      case actions.LOADING_STATUS:
        data.isLoading = payload;
        break;
      case actions.UPLOADED_FILES:
        data.uploadedFiles = payload;
        break;
      case actions.LOGOUT_SUCCESS:
        return initialState;
      default:
        return { ...state };
    }
    return data;
  });

// Context Provider Wrapper
const Provider = ({ children }) => {
  const [state, dispatch] = React.useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

export default Provider;
