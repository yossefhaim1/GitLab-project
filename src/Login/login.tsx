import { Alert, Box, Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import React from "react";
import { Link } from "react-router-dom";
import { useLoginMutation } from "../React_Queries/authMutations";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const loginMutation = useLoginMutation();

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  }
  return (
    <Box
      component="form"
      onSubmit={handleLogin}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 2,
        px: 2,
        bgcolor: "#f4f5f7",
      }}
    >
      
      <Typography component="h1" variant="h4" gutterBottom sx={{ fontWeight: 700 , color: "#0f172a" , fontSize: 40 }}>
        Login
      </Typography>
      
      <Typography variant="body1" gutterBottom>
        Please enter your email and password to log in.
      </Typography>
      
      <TextField
        label="Email"
        name="email"
        type="email"
        variant="outlined"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
        fullWidth
        sx={{
          maxWidth: 400,
        }}
      />

       <TextField
        label="Password"
        name="password"
        type="password"
        variant="outlined"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
        fullWidth
        sx={{
          maxWidth: 400,
        }}
      />
      {loginMutation.isError && (
        <Alert severity="error" sx={{ width: "100%", maxWidth: 400 }}>
          האיימל או הסיסמה שהזנת אינם נכונים. אנא נסה שוב.
        </Alert>
      )}

      <Button
        type="submit"
        variant="contained"
        disabled={loginMutation.isPending}
        color="primary"
        sx={{
          maxWidth: 400,
          width: "100%",
          minHeight: 48,
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        {loginMutation.isPending ? (
            <CircularProgress size={24} /> 
        ) : (
            "Login"
        )}
      </Button>
      <Typography variant="body2" sx={{ mt: 2 }}>
        אין לך חשבון?{" "}
         <Link to="/register">הרשם כאן</Link>
      </Typography>
    </Box>
  );
}
