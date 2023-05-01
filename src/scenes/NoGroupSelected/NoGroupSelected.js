import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const NoGroupSelected = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center">
      <Typography sx={{ padding: "20px 0" }} variant="h4">
        No group selected
      </Typography>
    </Box>
  );
};

export default NoGroupSelected;
