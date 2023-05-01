import { useState } from "react";

import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";

import AddFieldModal from "./AddFieldModal";

const AddFields = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <Grid item xs={4}>
      <AddFieldModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <Box display="flex" justifyContent="center" width="100%">
        <Button
          variant="contained"
          sx={{ marginTop: "30px", backgroundColor: "black" }}
          onClick={() => setIsModalOpen(true)}
        >
          + Add Feld
        </Button>
      </Box>
    </Grid>
  );
};

export default AddFields;
