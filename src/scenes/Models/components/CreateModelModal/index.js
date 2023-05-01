import Box from "@mui/system/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";

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

const CreateModelModal = ({ isModalOpened, setIsModalOpened }) => {
  return (
    <Modal open={isModalOpened}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "baseline",
          }}
        >
          <Typography align="center" variant="h5">
            Create new model
          </Typography>
          <Button onClick={() => setIsModalOpened(false)}>
            <CloseIcon />
          </Button>
        </Box>
        <Divider sx={{ paddingTop: "10px" }} />
        <Typography sx={{ paddingTop: "10px" }}>Name </Typography>
        <TextField size="small" placeholder="Model Name" required />
        <Typography sx={{ paddingTop: "10px" }}>Description </Typography>
        <TextField
          fullWidth
          multiline
          size="small"
          placeholder="Description"
          required
        />
        <Button>Confirm</Button>
      </Box>
    </Modal>
  );
};

export default CreateModelModal;
