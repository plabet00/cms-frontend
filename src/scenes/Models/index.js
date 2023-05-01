import styled from "styled-components";
import { useEffect, useState } from "react";

import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

import Button from "../../components/Button";
import ModelList from "./components/ModelList";
import CreateModelModal from "./components/CreateModelModal";
import useModels from "../../services/models/useModels";

const CreateModelButtonWrapper = styled.div`
  align-self: flex-end;
  padding-right: 20px;
`;

const Models = () => {
  const [isModalOpened, setIsModalOpened] = useState(false);
  const { fetchModels, modelsData } = useModels();

  useEffect(() => {
    fetchModels();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box
      component="main"
      sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}
    >
      <CreateModelModal
        isModalOpened={isModalOpened}
        setIsModalOpened={setIsModalOpened}
      />
      <Typography align="center" sx={{ paddingTop: "10px" }} variant="h4">
        Models
      </Typography>
      <CreateModelButtonWrapper>
        <Button onClick={() => setIsModalOpened(true)}>+ Create Model</Button>
      </CreateModelButtonWrapper>
      <ModelList data={modelsData} />
    </Box>
  );
};

export default Models;
