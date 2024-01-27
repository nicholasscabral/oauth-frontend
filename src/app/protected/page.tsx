"use client";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { Container } from "../signin/styles";

export default function Protected() {
  return (
    <Container>
      <VerifiedUserIcon style={{ color: "green" }} />
      <h2>You Are Authenticated</h2>
    </Container>
  );
}
