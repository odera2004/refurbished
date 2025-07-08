import { createChatBotMessage } from 'react-chatbot-kit';

const botName = "Soko Helper";

const config = {
  botName,
  initialMessages: [
    createChatBotMessage(`Hey! I'm ${botName}. How can I help you today?`),
  ],
  customStyles: {
    botMessageBox: { backgroundColor: '#0d6efd' },
    chatButton: { backgroundColor: '#0d6efd' },
  },
};

export default config;
