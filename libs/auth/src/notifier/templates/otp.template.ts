export const otpTemplate = (code: string) => `
  <html>
    <body style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
      <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 8px; padding: 20px; text-align: center;">
        <h2 style="color: #333;">Your One-Time Password</h2>
        <p style="font-size: 16px; color: #555;">Use the code below to proceed:</p>
        <div style="font-size: 32px; font-weight: bold; color: #007bff; margin: 20px 0;">${code}</div>
        <p style="font-size: 14px; color: #999;">This code will expire in 5 minutes.</p>
      </div>
    </body>
  </html>
`;
