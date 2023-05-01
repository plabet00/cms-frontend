import { useState, useEffect } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import useModels from "../../../../services/models/useModels";

const modalStyle = {
  display: "flex",
  flexDirection: "column",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
  padding: "20px",
};

const EditDescAndNameModal = ({
  isOpen,
  setIsModalOpen,
  modelDescription,
  modelName,
}) => {
  const [description, setDescription] = useState("");
  const [name, setName] = useState("");
  const { updateModelName } = useModels();

  useEffect(() => {
    if (modelDescription && modelName) {
      setDescription(modelDescription);
      setName(modelName);
    }
  }, [modelDescription, modelName]);

  const handleEditConfirm = () => {
    updateModelName(name, description);
    setIsModalOpen(false);
  };

  return (
    <Modal onClose={() => setIsModalOpen(false)} open={isOpen}>
      <Box sx={modalStyle}>
        <Typography variant="string">Name</Typography>
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name}
          size="small"
          sx={{ paddingBottom: "10px" }}
        />
        <Typography variant="string">Description</Typography>
        <TextField
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          multiline
          size="small"
          minRows={3}
          sx={{ paddingBottom: "20px" }}
        />
        <Box width="100%" display="flex" justifyContent="flex-end">
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{ marginRight: "10px" }}
            variant="text"
          >
            Cancel
          </Button>
          <Button
            onClick={handleEditConfirm}
            sx={{ backgroundColor: "black" }}
            variant="contained"
          >
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditDescAndNameModal;
