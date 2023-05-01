import React, { useReducer } from "react";

import { api } from "../axiosInstance";

export const GroupsState = React.createContext({
  state: {},
  fetchGroups: async () => {},
});

const groupsReducer = (state, action) => {
  switch (action.type) {
    case "GET_GROUPS":
      return { ...state, loadingGroups: true, groupsError: false };
    case "GET_GROUPS_SUCCESS":
      return { ...state, loadingModels: false, groupsData: action.payload };
    case "GET_GROUPS_FAIL":
      return { ...state, loadingModels: false, modelsError: action.error };
    default:
      return state;
  }
};

const GroupsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(groupsReducer, {});

  const fetchGroups = async () => {
    dispatch({ type: "GET_GROUPS" });
    try {
      const { data } = await api.get("/groups");
      dispatch({ type: "GET_GROUPS_SUCCESS", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "GET_GROUPS_FAIL", error: error });
      return error;
    }
  };

  const value = {
    ...state,
    fetchGroups,
  };

  return <GroupsState.Provider value={value}>{children}</GroupsState.Provider>;
};

export default GroupsProvider;
