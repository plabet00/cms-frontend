import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";

import useContent from "../../services/content/useContent";
import { Button } from "@mui/material";

const EditContent = () => {
  const { fetchContentDetails, updateContent, contentDetailsData } =
    useContent();
  const location = useLocation();
  const modelId = location.pathname.split("/")[3];
  const contentId = location.pathname.split("/")[5];
  const [contentState, setContentState] = useState({});
  const [changedContent, setChangedContent] = useState([]);

  useEffect(() => {
    fetchContentDetails(modelId, contentId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (contentDetailsData) {
      let fieldsForState = {};
      for (let i = 0; i < contentDetailsData.data.length; i++) {
        fieldsForState[contentDetailsData.data[i].field_id] =
          contentDetailsData.data[i].content;
      }
      setContentState(fieldsForState);
    }
  }, [contentDetailsData]);

  const checkIfContentWasChanged = (field_id, value) => {
    let newFields = [...changedContent];
    const index = changedContent.findIndex((field) => {
      return field.field_id === field_id;
    });

    if (index === -1) {
      newFields.push({ field_id: field_id, content: value });
    } else {
      newFields[index].content = value;
    }

    setChangedContent(newFields);
  };

  const handleInputChange = (value, field_id) => {
    checkIfContentWasChanged(field_id, value);
    const newValues = { ...contentState };
    newValues[field_id] = value;
    setContentState(newValues);
  };

  const handleUpdate = (modelId, contentId, changedContent) => {
    updateContent(modelId, contentId, changedContent);
    setChangedContent([]);
  };

  return (
    <Box
      paddingTop="20px"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      {contentDetailsData?.data?.map((field) => {
        return (
          <Box
            display="flex"
            marginBottom="20px"
            flexDirection="column"
            key={field.field_id}
          >
            <Typography variant="string">{field.name}</Typography>
            <TextField
              sx={{ backgroundColor: "white" }}
              value={
                contentState[field.field_id] ? contentState[field.field_id] : ""
              }
              onChange={(e) =>
                handleInputChange(e.target.value, field.field_id)
              }
            />
          </Box>
        );
      })}
      <Button
        variant="contained"
        sx={{ backgroundColor: "black" }}
        onClick={() => handleUpdate(modelId, contentId, changedContent)}
        disabled={!changedContent.length}
      >
        Update
      </Button>
    </Box>
  );
};

export default EditContent;
