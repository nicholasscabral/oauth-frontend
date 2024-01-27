import React from "react";

interface PasswordStrengthValidatorProps {
  password: string;
  onValidate: (isValid: boolean) => void;
}

const PasswordStrengthValidator: React.FC<PasswordStrengthValidatorProps> = ({
  password,
  onValidate,
}) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumbers = /\d/.test(password);
  const isLongEnough = password.length >= 10;

  onValidate(hasUppercase && hasSymbols && hasNumbers && isLongEnough);

  return (
    <div>
      <h4>Passoword rules:</h4>
      <p>
        Has Uppercase:{" "}
        <span style={{ color: hasUppercase ? "green" : "red" }}>
          {hasUppercase ? "✔" : "✘"}
        </span>
      </p>
      <p>
        Has Symbols:{" "}
        <span style={{ color: hasSymbols ? "green" : "red" }}>
          {hasSymbols ? "✔" : "✘"}
        </span>
      </p>
      <p>
        Has Numbers:{" "}
        <span style={{ color: hasNumbers ? "green" : "red" }}>
          {hasNumbers ? "✔" : "✘"}
        </span>
      </p>
      <p>
        Has over 10 chars:{" "}
        <span style={{ color: isLongEnough ? "green" : "red" }}>
          {isLongEnough ? "✔" : "✘"}
        </span>
      </p>
    </div>
  );
};

export default PasswordStrengthValidator;
