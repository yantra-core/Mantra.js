class Flash {
  static id = 'flash';

  constructor(config = {}) {
    this.id = Flash.id;
    this.defaultDuration = config.defaultDuration || 3000; // Default duration in milliseconds
    this.flashContainer = null; // Will hold the container for flash messages
    // Default style properties
    this.style = {
      position: 'fixed',
      top: '10px',
      right: '10px',
      zIndex: '1000',
      ...config.style, // Merge custom styles from config
    };
    // Style for different types of messages
    this.typeStyles = {
      error: { backgroundColor: 'rgba(255, 0, 0, 0.7)', color: 'white' },
      warn: { backgroundColor: 'rgba(255, 255, 0, 0.7)', color: 'black' },
      info: { backgroundColor: 'rgba(0, 0, 255, 0.7)', color: 'white' },
      success: { backgroundColor: 'rgba(0, 255, 0, 0.7)', color: 'white' },
    };
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
    this.createFlashContainer();
  }

  createFlashContainer() {
    if (!this.flashContainer) {
      this.flashContainer = document.createElement('div');
      this.flashContainer.id = 'flash-messages-container';
      Object.assign(this.flashContainer.style, this.style);
      document.body.appendChild(this.flashContainer);
    }
  }

  showMessage(content, duration = this.defaultDuration) {
    const messageElement = document.createElement('div');
    let messageType = 'info'; // Default type
    let messageText = content;
  
    // If content is an object, extract type, message, style, and override duration if provided
    if (typeof content === 'object' && content !== null) {
      messageType = content.type || messageType;
      messageText = content.message || messageText;
      if (content.sticky !== true) {
        duration = content.hasOwnProperty('duration') ? content.duration : duration;
      } else {
        duration = null;
      }
    }
  
    // Apply type style if it exists, otherwise default to empty object
    const typeStyle = this.typeStyles[messageType] || {};
  
    // Apply default styles and type-specific styles first
    Object.assign(messageElement.style, {
      cursor: 'pointer',
      margin: '5px 0',
      fontSize: '24px',
      padding: '10px',
      borderRadius: '4px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
      position: 'relative', // Needed to position the close button absolutely within the message
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }, typeStyle);
  
    // Then override with custom styles if provided
    if (typeof content === 'object' && content.style) {
      Object.assign(messageElement.style, content.style);
    }
  
    // Add message text
    const textSpan = document.createElement('span');
    textSpan.innerHTML = messageText;
    messageElement.appendChild(textSpan);

    // Allow the message to be closed by clicking anywhere on it
    messageElement.onclick = () => messageElement.remove();
  
    this.flashContainer.appendChild(messageElement);
  
    // Automatically remove the message after the duration, if duration is provided
    if (duration !== null) {
      setTimeout(() => {
        messageElement.remove();
      }, duration);
    }
  }
  

  unload() {
    if (this.flashContainer) {
      this.flashContainer.remove();
      this.flashContainer = null;
    }
  }
}

export default Flash;
