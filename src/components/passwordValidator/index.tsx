import React from "react";

interface PasswordStrengthValidatorProps {
  password: string;
  passwordConfirm?: string;
  onValidate: (isValid: boolean) => void;
}

const PasswordStrengthValidator: React.FC<PasswordStrengthValidatorProps> = ({
  password,
  passwordConfirm,
  onValidate,
}) => {
  const hasUppercase = /[A-Z]/.test(password);
  const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  const hasNumbers = /\d/.test(password);
  const isLongEnough = password.length >= 10;
  const passwordsMatch = password !== "" && password === passwordConfirm;

  onValidate(
    hasUppercase && hasSymbols && hasNumbers && isLongEnough && passwordsMatch
  );

  return (
    <div>
      <h4>Passoword rules:</h4>
      <p>
        <span style={{ color: hasUppercase ? "green" : "red" }}>
          {hasUppercase ? "✔" : "✘"}
        </span>{" "}
        Has Uppercase
      </p>
      <p>
        <span style={{ color: hasSymbols ? "green" : "red" }}>
          {hasSymbols ? "✔" : "✘"}
        </span>{" "}
        Has Symbols
      </p>
      <p>
        <span style={{ color: hasNumbers ? "green" : "red" }}>
          {hasNumbers ? "✔" : "✘"}
        </span>{" "}
        Has Numbers
      </p>
      <p>
        <span style={{ color: isLongEnough ? "green" : "red" }}>
          {isLongEnough ? "✔" : "✘"}
        </span>{" "}
        Has over 10 chars
      </p>
      <p>
        <span style={{ color: passwordsMatch ? "green" : "red" }}>
          {passwordsMatch ? "✔" : "✘"}
        </span>{" "}
        Passwords match
      </p>
    </div>
  );
};

export default PasswordStrengthValidator;
