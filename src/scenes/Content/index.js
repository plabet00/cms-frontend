import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";

import ContentList from "./components/ContentList";
import useContent from "../../services/content/useContent";
import useModels from "../../services/models/useModels";

const Content = () => {
  const {
    contentData,
    fetchContent,
    setSelectedModel,
    selectedModel,
    createContent,
  } = useContent();
  const { modelsData, fetchModels } = useModels();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchModels();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleModelChange = (modelId) => {
    setSelectedModel(modelId);
    fetchContent(modelId);
  };

  const handelCreateContent = async () => {
    const newId = await createContent(selectedModel);
    navigate(
      `/${
        location.pathname.split("/")[1]
      }/models/${selectedModel}/content/${newId}`
    );
  };

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
    >
      <Typography align="center" sx={{ paddingTop: "10px" }} variant="h4">
        Content
      </Typography>
      <FormControl sx={{ m: 1, minWidth: 140 }}>
        <InputLabel id="select-model-label">Select model</InputLabel>
        <Select
          labelId="select-model-label"
          label="Select model"
          sx={{ backgroundColor: "white" }}
          onChange={(e) => handleModelChange(e.target.value)}
          value={selectedModel ? selectedModel : ""}
        >
          {modelsData?.data?.map((model) => (
            <MenuItem key={model._id} value={model._id}>
              {model.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {selectedModel && (
        <Button
          variant="contained"
          sx={{
            backgroundColor: "black",
            alignSelf: "flex-end",
            margin: "10px 20px 10px 0",
          }}
          onClick={() => handelCreateContent()}
        >
          + Create content
        </Button>
      )}

      <ContentList data={contentData} modelId={selectedModel} />
    </Box>
  );
};

export default Content;
