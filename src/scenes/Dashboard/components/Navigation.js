import { useNavigate, useLocation } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import { ToggleButton } from "@mui/material";
import { Stack } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";

import useLocalStorage from "../../../services/localStorage/useLocalStorage";

const Navigation = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [localStorageGroup] = useLocalStorage("groupName", "");

  return (
    <>
      <Drawer
        sx={{
          width: "20%",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "20%",
            boxSizing: "border-box",
          },
        }}
        PaperProps={{
          sx: { width: "20%" },
        }}
        variant="permanent"
      >
        <CssBaseline />
        <Stack spacing="large" width="100%" alignItems="center">
          <AccessTimeFilledIcon fontSize="large" />
          <ToggleButton
            value="groups"
            selected={location.pathname.split("/").slice(-1)[0] === "groups"}
            variant="text"
            onClick={() => navigate("/groups")}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            Groups
          </ToggleButton>
          <ToggleButton
            value="models"
            selected={location.pathname.split("/").slice(-1)[0] === "models"}
            variant="text"
            onClick={() => navigate(`${localStorageGroup}/models`)}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            Models
          </ToggleButton>
          <ToggleButton
            value="content"
            selected={location.pathname.split("/").slice(-1)[0] === "content"}
            variant="text"
            onClick={() => navigate(`${localStorageGroup}/content`)}
            sx={{ width: "100%", justifyContent: "center" }}
          >
            Content
          </ToggleButton>
        </Stack>
      </Drawer>
    </>
  );
};

export default Navigation;
