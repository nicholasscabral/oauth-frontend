"use client";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { CenteredContainer } from "@/components/centeredContainer/styles";

export default function Protected() {
  return (
    <CenteredContainer>
      <VerifiedUserIcon style={{ color: "green" }} />
      <h2>You Are Authenticated</h2>
    </CenteredContainer>
  );
}
