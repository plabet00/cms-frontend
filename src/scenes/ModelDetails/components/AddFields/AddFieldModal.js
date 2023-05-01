import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

const FIELD_TYPES = ["Text", "Number", "DateTime", "Boolean", "Image"];

const AddFieldModal = ({ isModalOpen, setIsModalOpen }) => {
  const [name, setName] = useState("");
  const [apiName, setApiName] = useState("");
  const [type, setType] = useState("");

  const { addNewField } = useModels();

  const handleConfirm = () => {
    if (name && apiName && type) {
      addNewField({
        name: name,
        api_name: apiName,
        type: type,
        field_id: uuidv4(),
      });
      setIsModalOpen(false);
    }
  };
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box sx={modalStyle}>
        <Typography type="string">Name</Typography>
        <TextField
          onChange={(e) => setName(e.target.value)}
          value={name}
          sx={{ marginBottom: "10px" }}
        />
        <Typography type="string">API Name</Typography>
        <TextField
          onChange={(e) => setApiName(e.target.value)}
          value={apiName}
          sx={{ marginBottom: "10px" }}
        />
        <Typography type="string">Type</Typography>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value)}
          sx={{ marginBottom: "20px" }}
        >
          {FIELD_TYPES.map((fieldType) => {
            return (
              <MenuItem key={fieldType} value={fieldType}>
                {fieldType}
              </MenuItem>
            );
          })}
        </Select>

        <Box width="100%" display="flex" justifyContent="flex-end">
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{ marginRight: "10px" }}
            variant="text"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
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

export default AddFieldModal;
