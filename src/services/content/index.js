import React, { useReducer } from "react";
import { useLocation } from "react-router-dom";

import { api } from "../axiosInstance";

export const ContentState = React.createContext({
  state: {},
  fetchContent: async (modelId) => {},
  setSelectedModel: async (modelId) => {},
  fetchContentDetails: async (modelId, contentId) => {},
  updateContent: async (modelId, contentId, newContent) => {},
  createContent: async (modelId) => {},
});

const contentReducer = (state, action) => {
  switch (action.type) {
    case "GET_CONTENT":
      return { ...state, loadingContent: true, contentError: false };

    case "GET_CONTENT_SUCCESS":
      return {
        ...state,
        loadingContent: false,
        contentData: action.payload,
      };

    case "GET_CONTENT_FAIL":
      return {
        ...state,
        loadingContent: false,
        contentError: action.error,
      };

    case "GET_CONTENT_DETAILS":
      return {
        ...state,
        loadingContentDetails: true,
        contentDetailsError: false,
      };

    case "GET_CONTENT_DETAILS_SUCCESS":
      return {
        ...state,
        loadingContentDetails: false,
        contentDetailsData: action.payload,
      };
    case "GET_CONTENT_DETAILS_FAIL":
      return {
        ...state,
        loadingContentDetails: false,
        contentDetialsError: action.error,
      };
    case "UPDATE_CONTENT":
      return {
        ...state,
        loadingContentDetails: true,
        contentDetailsError: false,
      };

    case "UPDATE_CONTENT_SUCCESS":
      return {
        ...state,
        loadingContentDetails: false,
        contentDetailsData: action.payload,
      };
    case "UPDATE_CONTENT_FAIL":
      return {
        ...state,
        loadingContentDetails: false,
        contentDetialsError: action.error,
      };
    case "SET_SELECTED_MODEL":
      return { ...state, selectedModel: action.payload };
    case "CREATE_CONTENT":
      return { ...state, createContentLoading: true };
    case "CREATE_CONTENT_SUCCESS":
      return { ...state, createContentLoading: false };
    case "CREATE_CONTENT_ERROR":
      return {
        ...state,
        createContentError: action.error,
        createContentLoading: false,
      };
    default:
      return state;
  }
};

const ContentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(contentReducer, {});
  const location = useLocation();

  const fetchContent = async (modelId) => {
    dispatch({ type: "GET_CONTENT" });
    try {
      const { data } = await api.get(
        `/groups/${location.pathname.split("/")[1]}/models/${modelId}/content`
      );
      dispatch({ type: "GET_CONTENT_SUCCESS", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "GET_CONTENT_FAIL", error: error });
      return error;
    }
  };

  const fetchContentDetails = async (modelId, contentId) => {
    dispatch({ type: "GET_CONTENT_DETAILS" });
    try {
      const { data } = await api.get(
        `/groups/${
          location.pathname.split("/")[1]
        }/models/${modelId}/content/${contentId}`
      );
      dispatch({ type: "GET_CONTENT_DETAILS_SUCCESS", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "GET_CONTENT_DETAILS_FAIL", error: error });
      return error;
    }
  };

  const updateContent = async (modelId, contentId, newContent) => {
    dispatch({ type: "UPDATE_CONTENT" });
    try {
      const { data } = await api.put(
        `/groups/${
          location.pathname.split("/")[1]
        }/models/${modelId}/content/${contentId}`,
        { fields: newContent }
      );
      dispatch({ type: "UPDATE_CONTENT_SUCCESS", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "UPDATE_CONTENT_FAIL", error: error });
      return error;
    }
  };

  const createContent = async (modelId) => {
    dispatch({ type: "CREATE_CONTENT" });
    try {
      const { data } = await api.post(
        `/groups/${location.pathname.split("/")[1]}/models/${modelId}`,
        { fields: [] }
      );
      dispatch({ type: "CREATE_CONTENT_SUCCESS", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "CREATE_CONTENT_FAIL", error: error });
      return error;
    }
  };

  const setSelectedModel = (modelId) => {
    dispatch({ type: "SET_SELECTED_MODEL", payload: modelId });
  };

  const value = {
    ...state,
    fetchContent,
    fetchContentDetails,
    updateContent,
    setSelectedModel,
    createContent,
  };

  return (
    <ContentState.Provider value={value}>{children}</ContentState.Provider>
  );
};

export default ContentProvider;
