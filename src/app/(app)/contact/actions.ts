'use server';

import type { ContactFormValues } from './page';

type ContactResult = {
  success: boolean;
  error?: string;
};

export async function sendContactMessage(
  values: ContactFormValues
): Promise<ContactResult> {
  const { name, email, message } = values;
  const recipient = 'hitakankshib@gmail.com';

  console.log('--- New Contact Form Submission ---');
  console.log(`Recipient: ${recipient}`);
  console.log(`From: ${name} <${email}>`);
  console.log(`Message: ${message}`);
  console.log('------------------------------------');
  
  // TODO: Add your email sending logic here.
  // For example, using a service like Resend, SendGrid, or Nodemailer.
  //
  // try {
  //   await sendEmail({
  //     to: recipient,
  //     from: 'Your App <noreply@yourapp.com>',
  //     subject: `New message from ${name}`,
  //     text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  //   });
  //   return { success: true };
  // } catch (error) {
  //   console.error('Email sending failed:', error);
  //   return { success: false, error: 'Failed to send message.' };
  // }

  // For now, we'll just simulate a successful submission.
  return { success: true };
}
