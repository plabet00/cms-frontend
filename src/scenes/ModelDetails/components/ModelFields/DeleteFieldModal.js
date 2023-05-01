import { useEffect, useState } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

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

const DeleteFieldModal = ({ isModalOpen, setIsModalOpen, fieldId }) => {
  const { deleteField } = useModels();
  const [fieldIdToDelete, setFieldIdToDelete] = useState("");

  const handleDelete = () => {
    deleteField(fieldIdToDelete);
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFieldIdToDelete(fieldId);
  }, [fieldId]);

  return (
    <Modal open={isModalOpen}>
      <Box sx={modalStyle}>
        <Typography sx={{ paddingBottom: "20px" }} variant="h5">
          Are you sure?
        </Typography>
        <Typography sx={{ paddingBottom: "20px" }}>
          Deleting the field will also delete the field in all of the
          corresponding content.
        </Typography>
        <Box width="100%" display="flex" justifyContent="flex-end">
          <Button
            onClick={() => setIsModalOpen(false)}
            sx={{ marginRight: "10px" }}
            variant="text"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            sx={{ backgroundColor: "#d9534f" }}
            variant="contained"
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteFieldModal;
