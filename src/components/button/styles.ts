import { Button } from "@mui/material";
import styled from "styled-components";

export const StyledButton = styled(Button)`
  background-color: ${(props) => props.disabled && "gray"};
`;
