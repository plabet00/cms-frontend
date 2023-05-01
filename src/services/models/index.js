import React, { useReducer } from "react";
import { useLocation } from "react-router-dom";

import { api } from "../axiosInstance";

export const ModelsState = React.createContext({
  state: {},
  fetchModels: async () => {},
  fetchModelDetails: async (modelId) => {},
  setNewField: async (newField) => {},
  addNewField: async (newField) => {},
  deleteField: async (deleteField) => {},
  updateModelName: async (newName, newDescription) => {},
  updateModel: async () => {},
  setTitleField: async () => {},
});

const modelsReducer = (state, action) => {
  switch (action.type) {
    case "GET_MODELS":
      return { ...state, loadingModels: true, modelsError: false };

    case "GET_MODELS_SUCCESS":
      return {
        ...state,
        loadingModels: false,
        modelsData: action.payload,
      };

    case "GET_MODELS_FAIL":
      return {
        ...state,
        loadingModels: false,
        modelsError: action.error,
      };

    case "GET_MODEL_DETAILS":
      return { ...state, loadingModelDetails: true, modelDetailsError: false };

    case "GET_MODEL_DETAILS_SUCCESS":
      return {
        ...state,
        loadingModelDetails: false,
        modelDetails: action.payload,
      };

    case "GET_MODEL_DETAILS_FAIL":
      return {
        ...state,
        loadingModelDetails: false,
        modelDetailsError: action.error,
      };
    case "CHANGE_MODEL":
      return {
        ...state,
        isModelEdited: true,
        modelDetails: action.payload,
      };
    case "UPDATE_MODEL":
      return { ...state, updateModelLoading: true };
    case "UPDATE_MODEL_SUCCESS":
      return { ...state, updateModelLoading: false, isModelEdited: false };
    case "UPDATE_MODEL_FAIL":
      return {
        ...state,
        updateModelLoading: false,
        updateModelError: action.error,
      };
    default:
      return state;
  }
};

const ModelsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(modelsReducer, {});
  const location = useLocation();

  const fetchModels = async () => {
    dispatch({ type: "GET_MODELS" });
    try {
      const { data } = await api.get(
        `/groups/${location.pathname.split("/")[1]}/models`
      );
      dispatch({ type: "GET_MODELS_SUCCESS", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "GET_MODELS_FAIL", error: error });
      return error;
    }
  };

  const fetchModelDetails = async (modelId) => {
    dispatch({ type: "GET_MODELS" });
    try {
      const { data } = await api.get(
        `/groups/${location.pathname.split("/")[1]}/models/${modelId}`
      );
      dispatch({ type: "GET_MODEL_DETAILS_SUCCESS", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "GET_MODEL_DETAILS_FAIL", error: error });
      return error;
    }
  };

  const setNewField = (newField, newTitleField) => {
    let modelDetails = state.modelDetails;
    const oldFields = modelDetails.data.fields;

    const updatedFields = oldFields.map((oldField) => {
      if (oldField.field_id === newField.field_id) {
        return newField;
      }
      return oldField;
    });

    modelDetails.data.fields = updatedFields;

    if (newTitleField) {
      modelDetails.data.title_field = newTitleField;
    }

    dispatch({ type: "CHANGE_MODEL", payload: modelDetails });
  };

  const addNewField = (newField) => {
    let modelDetails = state.modelDetails;
    modelDetails.data.fields.push(newField);

    dispatch({ type: "CHANGE_MODEL", payload: modelDetails });
  };

  const deleteField = (fieldId) => {
    let modelDetails = state.modelDetails;
    const oldFields = modelDetails.data.fields;

    console.log(fieldId);

    const indexOfObject = oldFields.findIndex(
      (obj) => obj.field_id === fieldId
    );

    oldFields.splice(indexOfObject, 1);

    modelDetails.data.fields = oldFields;

    dispatch({ type: "CHANGE_MODEL", payload: modelDetails });
  };

  const updateModelName = (newName, newDescription) => {
    let modelDetails = state.modelDetails;

    modelDetails.data.name = newName;
    modelDetails.data.description = newDescription;

    dispatch({ type: "CHANGE_MODEL", payload: modelDetails });
  };

  const updateModel = async (modelId) => {
    dispatch({ type: "UPDATE_MODEL" });
    const model = state.modelDetails.data;
    try {
      const { data } = await api.put(
        `/groups/${location.pathname.split("/")[1]}/models/${modelId}`,
        model
      );
      dispatch({ type: "UPDATE_MODEL_SUCCESS", payload: data });
      return data;
    } catch (error) {
      dispatch({ type: "UPDATE_MODEL_FAIL", error: error });
      return error;
    }
  };

  const value = {
    ...state,
    fetchModels,
    fetchModelDetails,
    setNewField,
    updateModel,
    addNewField,
    updateModelName,
    deleteField,
  };

  return <ModelsState.Provider value={value}>{children}</ModelsState.Provider>;
};

export default ModelsProvider;
