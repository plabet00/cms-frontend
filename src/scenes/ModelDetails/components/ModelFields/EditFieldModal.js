import { useState, useEffect } from "react";

import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

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

const EditFieldModal = ({ setIsModalOpen, isModalOpen, modalInfo }) => {
  const { setNewField } = useModels();

  const [fieldName, setFieldName] = useState("");
  const [apiName, setApiName] = useState("");
  const [newTitleField, setNewTitleField] = useState("");

  useEffect(() => {
    if (modalInfo) {
      setFieldName(modalInfo.name);
      setApiName(modalInfo.api_name);
    }
  }, [modalInfo]);

  const handleCheckbox = () => {
    if (newTitleField) {
      setNewTitleField("");
    } else {
      setNewTitleField(modalInfo.field_id);
    }
  };

  const handleFieldUpdate = () => {
    setNewField(
      {
        api_name: apiName,
        field_id: modalInfo.field_id,
        name: fieldName,
        type: modalInfo.type,
      },
      newTitleField
    );
    setIsModalOpen(false);
  };
  return (
    <Modal onClose={() => setIsModalOpen(false)} open={isModalOpen}>
      <Box sx={modalStyle}>
        <Typography type="string">Name</Typography>
        <TextField
          onChange={(e) => setFieldName(e.target.value)}
          sx={{ paddingBottom: "20px" }}
          value={fieldName}
        />
        <Typography type="string">API Name</Typography>
        <TextField
          onChange={(e) => setApiName(e.target.value)}
          sx={{ paddingBottom: "20px" }}
          value={apiName}
        />
        <FormControlLabel
          control={
            <Checkbox
              disabled={modalInfo?.field_id === modalInfo?.title_field}
              checked={!!newTitleField}
              onChange={handleCheckbox}
            />
          }
          label="Title field"
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
            onClick={() => handleFieldUpdate()}
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

export default EditFieldModal;
