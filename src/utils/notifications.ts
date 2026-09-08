export const sendGoogleChatNotification = async (message: string) => {
  const webhookUrl = import.meta.env.VITE_GOOGLE_CHAT_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('Google Chat Webhook URL not configured');
    return;
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify({ text: message }), 
    });
  } catch (error) {
    console.error('Error sending notification to chat:', error);
  }
};