import type { ReactNode } from "react";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail({
  to,
  subject,
}: {
  to: string;
  subject: string;
  react: ReactNode;
}) {
  const { data, error } = await resend.emails.send({
    from: "Qumin <noreply@qumin.app>",
    to: [to],
    subject,
    react: EmailTemplate({}),
  });

  if (error) {
    throw error;
  }
}

function EmailTemplate({}) {
  return null;
}
