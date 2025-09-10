export const emailVerifiedTemplate = (email: string) => `
  <html>
    <body style="font-family: Arial, sans-serif; background: #eef7ee; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; text-align: center;">
        <h2 style="color: #28a745;">🎉 Email Verified!</h2>
        <p style="font-size: 16px; color: #333;">
          Congratulations, <b>${email}</b> has been successfully verified.
        </p>
        <p style="font-size: 14px; color: #666;">You can now access all features of our platform.</p>
      </div>
    </body>
  </html>
`;
