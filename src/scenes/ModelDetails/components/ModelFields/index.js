import { useState } from "react";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

import EditFieldModal from "./EditFieldModal";
import DeleteFieldModal from "./DeleteFieldModal";

const ModelFields = ({ fields, titleField }) => {
  const [modalInfo, setModalInfo] = useState();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleFieldClick = (fiedlId, fieldName, fieldApiName, fieldType) => {
    setModalInfo({
      field_id: fiedlId,
      name: fieldName,
      api_name: fieldApiName,
      type: fieldType,
      title_field: titleField,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (fiedlId, fieldName, fieldApiName, fieldType) => {
    setModalInfo({
      field_id: fiedlId,
      name: fieldName,
      api_name: fieldApiName,
      type: fieldType,
      title_field: titleField,
    });
    setIsDeleteModalOpen(true);
  };

  return (
    <Grid item xs={8}>
      <Box display="flex" margin="0 10px" flexDirection="column">
        {isEditModalOpen && (
          <EditFieldModal
            setIsModalOpen={setIsEditModalOpen}
            isModalOpen={true}
            modalInfo={modalInfo}
          />
        )}

        <DeleteFieldModal
          isModalOpen={isDeleteModalOpen}
          setIsModalOpen={setIsDeleteModalOpen}
          fieldId={modalInfo?.field_id}
        />
        {fields?.map((field) => {
          return (
            <ListItem
              sx={{
                textTransform: "none",
                transition: "box-shadow .3s",
                backgroundColor: "white",
                marginTop: "20px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                "&:hover": {
                  boxShadow: "0 0 11px rgba(33,33,33,.2)",
                  cursor: "pointer",
                },
              }}
              key={field.field_id}
            >
              <Box
                display="flex"
                alignItems="center"
                sx={{ justifyContent: "space-between", width: "100%" }}
              >
                <Box display="flex" flexDirection="row">
                  <Typography
                    padding="0 40px 0 20px"
                    fontWeight="bold"
                    type="string"
                  >
                    {field.name}
                  </Typography>
                  <Typography color="color: rgba(0, 0, 0, 0.5)" type="string">
                    {field.type}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  {titleField === field.field_id && (
                    <Typography
                      paddingRight="35px"
                      variant="string"
                      color="GrayText"
                    >
                      Title field
                    </Typography>
                  )}
                  <Button
                    onClick={() =>
                      handleFieldClick(
                        field.field_id,
                        field.name,
                        field.api_name,
                        field.type
                      )
                    }
                  >
                    Edit
                  </Button>
                  <IconButton
                    onClick={() =>
                      handleDelete(
                        field.field_id,
                        field.name,
                        field.api_name,
                        field.type
                      )
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </Box>
            </ListItem>
          );
        })}
      </Box>
    </Grid>
  );
};

export default ModelFields;
