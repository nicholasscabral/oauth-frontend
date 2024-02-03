"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button, Container, Typography, makeStyles } from "@material-ui/core";
import { CheckCircleOutline, ErrorOutline } from "@material-ui/icons";
import { Link } from "@mui/material";
import { EmailVerificationService } from "@/services/email-verification";
import { Notification } from "@/utils/notification";

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
  const [tokenIsValid, setTokenIsValid] = useState<boolean | null>(null);
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

  const handleResendEmail = () => {
    // Implement logic to resend verification email
    // This could involve sending another request to your backend to resend the email
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
          <Button color="primary" variant="text" onClick={handleResendEmail}>
            Resend Verification Link
          </Button>
        </>
      ) : (
        <Typography variant="h4">Verifying Email...</Typography>
      )}
    </Container>
  );
};

export default EmailVerificationPage;
