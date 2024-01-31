"use client";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Typography from "@mui/material/Typography";
import Button from "@/components/button";
import PasswordStrengthValidator from "@/components/passwordValidator";
import { CenteredContainer } from "@/components/centeredContainer/styles";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setInterval(() => setLoading(false), 2000);
  };

  return (
    <CenteredContainer>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "25%",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "blue" }}>
          <AccountBoxIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoFocus
            autoComplete="off"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="text"
            id="password"
            value={password}
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
          />
          <PasswordStrengthValidator
            password={password}
            onValidate={setIsPasswordValid}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            disabled={!isPasswordValid || !password || !email}
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Link href="/signin" variant="body2">
            {"Already have an account? Sign In"}
          </Link>
        </Box>
      </Box>
    </CenteredContainer>
  );
}
