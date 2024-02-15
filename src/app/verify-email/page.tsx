"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Container, Typography, makeStyles } from "@material-ui/core";
import { CheckCircleOutline, ErrorOutline } from "@material-ui/icons";
import { Link } from "@mui/material";
import { EmailVerificationService } from "@/services/email-verification";
import { Notification } from "@/utils/notification";
import Button from "@/components/button";

const TWENTY_SECONDS: number = 20;
const TWENTY_SECONDS_IN_MS: number = 20 * 1000;

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

const EmailVerificationPage = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [loading, setLoading] = useState(false);
  const [tokenIsValid, setTokenIsValid] = useState<boolean | null>(null);
  const [cooldown, setCooldown] = useState(0); // Initial cooldown value
  const classes = useStyles();

  useEffect(() => {
    const token: string = searchParams.get("token") as string;
    verifyEmailToken(token as string);
  }, []);

  const verifyEmailToken = async (token: string) => {
    try {
      await EmailVerificationService.verifyEmailToken(token);
      setTokenIsValid(true);
    } catch (e: any) {
      Notification.error(
        e?.response?.data?.error ||
          "Something went wrong, you can resend the verification link"
      );
      setTokenIsValid(false);
    }
  };

  const handleResendEmail = async () => {
    if (cooldown > 0) {
      // If cooldown is active, do nothing
      return;
    }

    setLoading(true);
    try {
      await EmailVerificationService.resendVerifictionLink(
        searchParams.get("token") as string
      );
      Notification.info("Verification email resent successfully");
      setCooldown(TWENTY_SECONDS);
      const interval = setInterval(() => {
        setCooldown((prev) => Math.max(0, prev - 1));
      }, 1000);

      setTimeout(() => {
        clearInterval(interval);
      }, TWENTY_SECONDS_IN_MS);
    } catch (e) {
      // Handle error
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className={classes.container}>
      {tokenIsValid === true ? (
        <>
          <CheckCircleOutline
            className={classes.icon}
            color="primary"
            fontSize="large"
          />
          <Typography variant="h4" style={{ marginBottom: 5 }}>
            Email Verified Successfully!
          </Typography>

          <Link href="/signin" color="primary" variant="button">
            Login in your account
          </Link>
        </>
      ) : tokenIsValid === false ? (
        <>
          <ErrorOutline
            className={classes.icon}
            color="error"
            fontSize="large"
          />
          <Typography variant="h4" style={{ marginBottom: 10 }}>
            Verification link expired
          </Typography>
          <Button
            color="primary"
            variant="text"
            loading={loading}
            onClick={handleResendEmail}
            disabled={cooldown > 0}
          >
            {cooldown > 0
              ? `Resend again in ${cooldown} seconds`
              : "Resend Verification Link"}
          </Button>
        </>
      ) : (
        <Typography variant="h4">Verifying Email...</Typography>
      )}
    </Container>
  );
};

export default EmailVerificationPage;
