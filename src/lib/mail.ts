import { PAGES } from '@/config/pages.config';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = process.env.NEXT_PUBLIC_APP_URL;

export async function sendVerificationEmail(email: string, token: string) {
  const confirmLink = `${domain}/${PAGES.VERIFY}?token=${token}`;

  //TODO: change sender

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Please confirm your email address',
    html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email address</p>`,
  });
}
export async function sendResetPasswordEmail(email: string, token: string) {
  const resetLink = `${domain}/${PAGES.NEW_PASSWORD}?token=${token}`;

  //TODO: change sender

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Reset password',
    html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
  });
}

export async function sendTwoFactorTokenEmail(email: string, token: string) {
  //TODO: change sender

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: '2FA Code',
    html: `<p class="font-bold">Your 2FA code: ${token}</p>`,
  });
}
