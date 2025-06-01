import React from "react";

export interface VerificationUserEmailProps {
  code: string;
}

export const VerificationUserTemplate: React.FC<VerificationUserEmailProps> = ({
  code,
}) => (
  <div>
    <p>
      Код подтверждения: <h2>{code}</h2>!
    </p>

    <p>
      <a href={`http://localhost:3000/api/auth/verify?code=${code}`}>
        Подтвердите регистрацию
      </a>
    </p>
  </div>
);
