class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
    }
  
    parse(message) {
      const lower = message.toLowerCase();
  
      if (lower.includes("about") || lower.includes("what is")) {
        this.actionProvider.handleGeneralInfo();
      } else if (lower.includes("sign up") || lower.includes("vendor")) {
        this.actionProvider.handleVendorSignup();
      } else if (
        lower.includes("product") || lower.includes("buy") || lower.includes("used")
      ) {
        this.actionProvider.handleProductSearch();
      } else {
        this.actionProvider.updateChatbotState(
          this.actionProvider.createChatBotMessage(
            "Sorry, I didn't get that. You can ask things like 'how to sign up as a vendor' or 'where can I find used products'."
          )
        );
      }
    }
  }
  
  export default MessageParser;
  