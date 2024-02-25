"use client";
import { useState, useEffect } from "react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { Container, Typography, makeStyles } from "@material-ui/core";
import { CheckCircleOutline, ErrorOutline } from "@material-ui/icons";
import { Link } from "@mui/material";
import { EmailVerificationService } from "@/services/email-verification";
import { Notification } from "@/utils/notification";
import Button from "@/components/button";

const ONE_MINUTE: number = 60;
const ONE_MINUTE_IN_MS: number = ONE_MINUTE * 1000;

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
  },
  icon: {
    fontSize: "5rem",
    marginBottom: theme.spacing(2),
  },
}));

const AccountVerificationPage = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const hasError = searchParams.get("error");
  const message = searchParams.get("message");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const classes = useStyles();

  const initCooldown = (): void => {
    setCooldown(ONE_MINUTE);
    const interval = setInterval(() => {
      setCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);

    setTimeout(() => {
      clearInterval(interval);
    }, ONE_MINUTE_IN_MS);
  };

  const handleResendEmail = async () => {
    if (cooldown > 0) {
      return;
    }

    setLoading(true);
    try {
      await EmailVerificationService.resendVerifictionLink(
        searchParams.get("token") as string
      );
      Notification.info("Verification email resent successfully");
      setDisabled(true);
      setTimeout(() => push("/signin"), 2000);
    } catch (e) {
      initCooldown();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={classes.container}>
      {!hasError ? (
        <>
          <CheckCircleOutline
            className={classes.icon}
            color="primary"
            fontSize="large"
          />
          <Typography variant="h4" style={{ marginBottom: 5 }}>
            {message || "Email Verified Successfully!"}
          </Typography>

          <Link href="/signin" color="primary" variant="button">
            Login in your account
          </Link>
        </>
      ) : (
        <>
          <ErrorOutline
            className={classes.icon}
            color="error"
            fontSize="large"
          />
          <Typography variant="h4" style={{ marginBottom: 10 }}>
            {message || "Failed to verify your email"}
          </Typography>
          <Button
            color="primary"
            variant="text"
            loading={loading}
            onClick={handleResendEmail}
            disabled={disabled || cooldown > 0}
          >
            {cooldown > 0
              ? `Resend again in ${cooldown} seconds`
              : "Resend Verification Link"}
          </Button>
        </>
      )}
    </Container>
  );
};

export default AccountVerificationPage;
