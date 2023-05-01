import { useLocation } from "react-router-dom";
import { useState } from "react";

import Typography from "@mui/material/Typography";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";

import useModels from "../../../../services/models/useModels";
import EditDescAndNameModal from "./EditDescAndNameModal";

const ModelDetailsHeader = ({ modelName, modelDescription }) => {
  const location = useLocation();
  const modelId = location.pathname.split("/").slice(-1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { isModelEdited, updateModel } = useModels();
  return (
    <AppBar elevation={1} position="sticky">
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <EditDescAndNameModal
          setIsModalOpen={setIsModalOpen}
          isOpen={isModalOpen}
          modelName={modelName}
          modelDescription={modelDescription}
        />
        <Box display="flex" flexDirection={"row"}>
          <Typography
            sx={{ paddingRight: "20%", display: "flex", alignItems: "center" }}
            color={"black"}
            variant="h5"
          >
            {modelName}
          </Typography>
          <Typography color={"black"} variant="subtitle1">
            {modelDescription}
          </Typography>
        </Box>
        <Box display="flex" flexDirection={"row"}>
          <Button
            onClick={() => setIsModalOpen(true)}
            sx={{ color: "black" }}
            variant="text"
          >
            Edit
          </Button>
          <Button
            disabled={!isModelEdited}
            sx={{ color: "white", backgroundColor: "black" }}
            variant="contained"
            onClick={() => updateModel(modelId)}
          >
            Save
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default ModelDetailsHeader;
