import React, { useReducer } from "react";

const InitialState = {
  groupName: JSON.parse(localStorage.getItem("groupName")),
};

export const LocalStorageState = React.createContext(InitialState);

const localStorageReducer = (state, action) => {
  switch (action.type) {
    case "SET":
      return { ...state, [action.key]: action.value };
    case "REMOVE":
      return { ...state };
    default:
      return state;
  }
};

const LocalStorageProvider = ({ children }) => {
  const [state, dispatch] = useReducer(localStorageReducer, InitialState);

  const set = (key, value) => {
    dispatch({ type: "SET", key, value });
  };

  const value = {
    state,
    set,
  };

  return (
    <LocalStorageState.Provider value={value}>
      {children}
    </LocalStorageState.Provider>
  );
};

export default LocalStorageProvider;
