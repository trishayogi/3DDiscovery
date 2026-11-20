const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

async function sendPasswordResetEmail(email, token) {
    const frontendUrl = process.env.FRONTEND_URL;
    if (!frontendUrl || !process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
        throw new Error('SMTP_HOST, SMTP_USER, SMTP_PASS, and FRONTEND_URL must be configured')
    }

    const resetUrl = `${frontendUrl.replace(/\/+$/, '')}/resetpassword?token=${encodeURIComponent(token)}`
    const text = [
        '3D Discovery password reset',
        '',
        'We received a request to reset the password for your account.',
        `Reset your password using this link: ${resetUrl}`,
        '',
        'This link expires in 15 minutes. If you did not request a reset, you can ignore this email.',
        'Your password will not change unless you use the link above.'
    ].join('\n')
    const html = `<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"></head>
<body style="margin:0;padding:32px 12px;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#1f2937;">
  <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#ffffff;border-radius:12px;">
    <tr><td style="padding:32px;">
      <p style="margin:0 0 24px;color:#2563eb;font-size:14px;font-weight:bold;letter-spacing:1px;">3D DISCOVERY</p>
      <h1 style="margin:0 0 16px;font-size:24px;line-height:1.3;">Reset your password</h1>
      <p style="margin:0 0 24px;font-size:16px;line-height:1.6;">We received a request to reset the password for your account. Use the button below to choose a new password.</p>
      <p style="margin:0 0 24px;">
        <a href="${resetUrl}" style="display:inline-block;padding:13px 22px;border-radius:8px;background:#2563eb;color:#ffffff;text-decoration:none;font-weight:bold;">Reset password</a>
      </p>
      <p style="margin:0 0 12px;color:#4b5563;font-size:14px;line-height:1.6;">This link expires in 15 minutes. If you did not request a reset, you can ignore this email. Your password will not change unless you use the link above.</p>
      <p style="margin:24px 0 0;color:#6b7280;font-size:12px;line-height:1.6;">If the button does not work, copy and paste this link into your browser:<br><a href="${resetUrl}" style="color:#2563eb;word-break:break-all;">${resetUrl}</a></p>
    </td></tr>
  </table>
</body>
</html>`

    await transporter.sendMail({
        from: {
            name: process.env.SMTP_FROM_NAME || 'Trishayogi',
            address: process.env.SMTP_FROM || process.env.SMTP_USER
        },
        to: email,
        subject: 'Reset your 3D Discovery password',
        text,
        html
    })
}

module.exports = { sendPasswordResetEmail }
