import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TextFaild from "@mui/material/TextField";
import  Button  from "@mui/material/Button";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";

const RegisterPage = () => {
    const [error, setError] = useState("");
    
    const firstNameRef=useRef<HTMLInputElement>(null);
    const lastNameRef=useRef<HTMLInputElement>(null);
    const emailRef=useRef<HTMLInputElement>(null);
    const passwordRef=useRef<HTMLInputElement>(null);
    const onSubmit=async ()=>{
        const firstName=firstNameRef.current?.value;
        const lastName=lastNameRef.current?.value;
        const email=emailRef.current?.value;
        const password=passwordRef.current?.value;
        console.log( email, password);
        const response=await fetch(`${BASE_URL}/user/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ firstName, lastName, email, password }),
        });
        if(!response.ok){
            setError("User already exists");
            return;
        }
        const data=await response.json();
        console.log(data);
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
        <Typography variant="h6">Register new account</Typography>
        <Box sx={{ display: "flex" , flexDirection: "column", gap: 2, mt: 2,border:1,padding:2, borderColor:"#f5f5f5", borderRadius:1}}>
            <TextFaild inputRef={firstNameRef} label="First Name" name="firstName"/>
            <TextFaild inputRef={lastNameRef} label="Last Name" name="lastName"/>
            <TextFaild inputRef={emailRef} label="Email" name="email"/>
            <TextFaild inputRef={passwordRef} type="password" label="Password" name="password"/>
            <Button  variant="contained" color="primary" onClick={onSubmit}>
              Register
            </Button>
                {error && <Typography color="error">{error}</Typography>}
        </Box>
      </Box>
    </Container>
  );
};
export default RegisterPage;
