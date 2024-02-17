"use client";
import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useSearchParams } from "next/navigation";
import Button from "@/components/button";
import { CenteredContainer } from "@/components/centeredContainer/styles";
import { SignInDto } from "@/common/dtos/signin";
import {
  FacebookLoginButton,
  GithubLoginButton,
  GoogleLoginButton,
  MicrosoftLoginButton,
} from "react-social-login-buttons";
import { AuthService } from "@/services/auth";

enum OauthProviders {
  google = "google",
  github = "github",
  microsoft = "microsoft",
  facebook = "facebook",
}

export default function SignIn() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState<SignInDto>({
    email: searchParams.get("email") || "",
    password: searchParams.get("password") || "",
  });

  const handleSignin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    window.open("http://localhost:3000/protected", "_self");
    try {
      await AuthService.signin(data);
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  const handleOauthSignin = async (provider: keyof typeof OauthProviders) => {
    window.open(
      `http://localhost:4000/api/v1/auth/${provider}`,
      "_self"
      // "popup=true"
    );
  };

  const handleInputChange = (e: any) =>
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

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
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSignin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={data.email}
            onChange={handleInputChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            id="password"
            value={data.password}
            autoComplete="current-password"
            onChange={handleInputChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    edge="end"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            loading={loading}
            onClick={handleSignin}
            sx={{ mt: 2, mb: 2 }}
          >
            Continue with email
          </Button>

          <Typography align="center" variant="subtitle1">
            OR
          </Typography>

          <Grid container width="100%" sx={{ mb: 2, mt: 2 }}>
            <GoogleLoginButton
              text="Continue with Google"
              onClick={() => handleOauthSignin("google")}
            />
            <GithubLoginButton
              text="Continue with Github"
              onClick={() => handleOauthSignin("github")}
            />
            <MicrosoftLoginButton
              text="Continue with Microsoft"
              onClick={() => handleOauthSignin("microsoft")}
            />
            <FacebookLoginButton
              text="Continue with Facebook"
              onClick={() => handleOauthSignin("facebook")}
            />
          </Grid>

          <Grid container>
            <Grid item xs>
              <Link href="/reset-password" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </CenteredContainer>
  );
}
