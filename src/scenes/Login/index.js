import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

import { login } from "../../services/login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [, setCookie] = useCookies(["cms-auth"]);

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      setCookie("cms-auth", response.data.token);
      navigate("/");
    } catch {
      console.log("Error");
    }
  };

  return (
    <Box alignItems="center" display="flex" flexDirection="column">
      <Typography sx={{ margin: "20px" }} variant="h4">
        Login
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
      <Button
        sx={{ backgroundColor: "black" }}
        variant="contained"
        onClick={handleLogin}
      >
        Login
      </Button>
      <Typography sx={{ margin: "20px" }} variant="string">
        Don't have an account?
      </Typography>
      <Link color="#000000" href="/register">
        Register
      </Link>
    </Box>
  );
};

export default Login;
