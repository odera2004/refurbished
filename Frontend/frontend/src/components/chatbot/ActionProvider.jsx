class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    handleGeneralInfo = () => {
      const message = this.createChatBotMessage(
        "Soko La Wanafunzi is a Kenyan student marketplace for buying and selling used or new items easily within your campus."
      );
      this.updateChatbotState(message);
    };
  
    handleVendorSignup = () => {
      const message = this.createChatBotMessage(
        "To sign up as a vendor, go to the homepage → click 'Sign Up' → choose 'Vendor' and fill out your profile."
      );
      this.updateChatbotState(message);
    };
  
    handleProductSearch = () => {
      const message = this.createChatBotMessage(
        "You can browse available products on the homepage by category (Electronics, Books, Furniture, etc.)."
      );
      this.updateChatbotState(message);
    };
  
    updateChatbotState(message) {
      this.setState((prev) => ({
        ...prev,
        messages: [...prev.messages, message],
      }));
    }
  }
  
  export default ActionProvider;
  