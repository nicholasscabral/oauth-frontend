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
import { type SignUpDto } from "@/common/dtos/signup";
import UsersService from "@/services/users";
import { Notification } from "@/utils/notification";

const emptyData = {
  email: "",
  password: "",
  passwordConfirm: "",
};

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [data, setData] = useState<SignUpDto>(emptyData);

  const handleInputChange = (e: any) =>
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await UsersService.create(data);
      Notification.info("Check your email inbox to verify your account");
      setLoading(false);
    } catch (e: any) {
      Notification.error(
        e?.response?.data?.error || "Something went wrong, please try again"
      );
      setLoading(false);
      setData(emptyData);
    }
  };

  return (
    <CenteredContainer>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "40%",
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
            value={data.email}
            onChange={handleInputChange}
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
            value={data.password}
            autoComplete="off"
            onCopy={(e) => {
              e.preventDefault();
            }}
            onPaste={(e) => {
              e.preventDefault();
            }}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passwordConfirm"
            label="Password Confirmation"
            type="text"
            id="password"
            value={data.passwordConfirm}
            autoComplete="off"
            onCopy={(e) => {
              e.preventDefault();
            }}
            onPaste={(e) => {
              e.preventDefault();
            }}
            onChange={handleInputChange}
          />
          <PasswordStrengthValidator
            password={data.password}
            passwordConfirm={data.passwordConfirm}
            onValidate={setIsPasswordValid}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            disabled={!isPasswordValid || !data.password || !data.email}
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
