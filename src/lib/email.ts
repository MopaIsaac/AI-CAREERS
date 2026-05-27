import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

/**
 * Sends an email using Resend if an API key is provided,
 * otherwise falls back to a mock implementation.
 */
export async function sendEmail({
  to,
  subject,
  html,
  from = 'AI Careers <notifications@aicareers.com>',
}: {
  to: string | string[];
  subject: string;
  html: string;
  from?: string;
}) {
  const recipients = Array.isArray(to) ? to : [to];

  if (resend) {
    try {
      const data = await resend.emails.send({
        from,
        to: recipients,
        subject,
        html,
      });
      return { success: true, messageId: data.data?.id };
    } catch (error) {
      console.error('Failed to send email via Resend:', error);
      return { success: false, error };
    }
  }

  // Mock implementation for development
  console.log('--- MOCK EMAIL SENT ---');
  console.log(`From: ${from}`);
  console.log(`To: ${recipients.join(', ')}`);
  console.log(`Subject: ${subject}`);
  console.log(`Content Preview: ${html.substring(0, 100)}...`);
  console.log('-----------------------');

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  return { success: true, messageId: `mock-${Date.now()}` };
}
