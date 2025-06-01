import { resendClient } from "@/resend/resend-client";
import { ReactNode } from "react";

export const sendEmail = async (
  to: string,
  subject: string,
  reactContent: ReactNode
) => {
  const { data, error } = await resendClient.emails.send({
    from: "onboarding@resend.dev",
    to,
    subject,
    react: reactContent,
  });

  if (error) {
    throw error;
  }

  return data;
};
