import { useLocation } from "react-router-dom";
import { useEffect } from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import useModels from "../../services/models/useModels";
import ModelDetailsHeader from "./components/ModelDetailsHeader";
import ModelFields from "./components/ModelFields";
import AddFields from "./components/AddFields";

const ModelDetails = () => {
  const location = useLocation();
  const modelId = location.pathname.split("/").slice(-1);

  const { fetchModelDetails, modelDetails } = useModels();

  useEffect(() => {
    fetchModelDetails(modelId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <ModelDetailsHeader
        modelName={modelDetails?.data?.name}
        modelDescription={modelDetails?.data?.description}
      />
      <Grid container>
        <ModelFields
          titleField={modelDetails?.data?.title_field}
          fields={modelDetails?.data?.fields}
        />
        <AddFields />
      </Grid>
    </Box>
  );
};

export default ModelDetails;
