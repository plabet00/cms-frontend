import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

const Dashboard = () => {
  return (
    <Box display="flex" flexDirection="column" width="100%" alignItems="center">
      <Typography sx={{ padding: "20px 0" }} variant="h4">
        Currently you don't have a group selected to view
      </Typography>
      <Button
        sx={{ backgroundColor: "black", textTransform: "none" }}
        variant="contained"
      >
        Go to groups
      </Button>
    </Box>
  );
};

export default Dashboard;
