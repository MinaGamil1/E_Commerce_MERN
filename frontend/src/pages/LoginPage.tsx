import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextFaild from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
const [error, setError] = useState("");
const emailRef = useRef<HTMLInputElement>(null);
const passwordRef = useRef<HTMLInputElement>(null);
const navigate = useNavigate();
const { login } = useAuth();
const onSubmit = async () => {

    const email = emailRef.current?.value;
    const password = passwordRef.current?.value;

    if (!email || !password) {
    setError("All fields are required");
    return;
    }
    console.log(email, password);
    const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({  email, password }),
    });
    if (!response.ok) {
    setError("Unable to login, check your credentials");
    return;
    }
    const token = await response.json();
    if (!token) {
    setError("Unable to login, check your credentials");
    return;
    }
    login(email, token);
    navigate("/");
};
return (
    <Container>
    <Box
        sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
        }}
    >
        <Typography variant="h6">Login to Your Account</Typography>
        <Box
        sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 2,
            border: 1,
            padding: 2,
            borderColor: "#f5f5f5",
            borderRadius: 1,
        }}
        >
        <TextFaild inputRef={emailRef} label="Email" name="email" />
        <TextFaild
            inputRef={passwordRef}
            type="password"
            label="Password"
            name="password"
        />
        <Button variant="contained" color="primary" onClick={onSubmit}>
            Login
        </Button>
        {error && <Typography color="error">{error}</Typography>}
        </Box>
    </Box>
    </Container>
);
};
export default LoginPage;
