import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";

import { register } from "../../services/register";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await register(email, password);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Typography sx={{ margin: "20px" }} variant="h4">
        Registration
      </Typography>
      <TextField
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        variant="outlined"
        sx={{ backgroundColor: "white", marginBottom: "20px" }}
      />
      <TextField
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        variant="outlined"
        type="password"
        sx={{ backgroundColor: "white", marginBottom: "20px" }}
      />
      <TextField
        label="Confirm password"
        value={confirmedPassword}
        onChange={(e) => setConfirmedPassword(e.target.value)}
        variant="outlined"
        type="password"
        sx={{ backgroundColor: "white", marginBottom: "20px" }}
      />
      <Button
        sx={{ backgroundColor: "black" }}
        variant="contained"
        onClick={handleClick}
      >
        Register
      </Button>
      <Typography sx={{ margin: "20px" }} variant="string">
        Already have an account?
      </Typography>
      <Link color="#000000" href="/login">
        Login
      </Link>
    </Box>
  );
};

export default Register;
