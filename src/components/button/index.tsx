// LoadingButton.tsx
import React from "react";
import ReactLoading from "react-loading";
import { StyledButton } from "./styles";

interface LoadingButtonProps {
  loading?: boolean;
  children?: React.ReactNode;
  color?: string;
  outlined?: boolean;
  backgroundColor?: string;
  disabled?: boolean;
  [key: string]: any;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  loading,
  children,
  color,
  outlined,
  backgroundColor,
  disabled,
  ...props
}) => {
  return (
    <StyledButton disabled={loading || disabled} {...props}>
      {loading ? (
        <ReactLoading color={"white"} height={24} width={24} type="spin" />
      ) : (
        children
      )}
    </StyledButton>
  );
};

export default LoadingButton;
