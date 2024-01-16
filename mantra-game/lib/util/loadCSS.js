// loadCSS.js - Marak Squires 2024
export default async function loadCSS(stylesheets, finalCallback) {
  if (this.isServer) {
    return;
  }

  // Ensure stylesheets is an array
  if (typeof stylesheets === 'string') {
    stylesheets = [stylesheets];
  }

  // Function to load an individual stylesheet and return a Promise
  const loadStylesheet = async (stylesheet) => {
    return new Promise((resolve, reject) => {
      let link = document.createElement('link');
      link.rel = 'stylesheet';
      link.type = 'text/css';
      link.href = this.scriptRoot + stylesheet;

      link.onload = () => {
        resolve(stylesheet);
      };

      link.onerror = () => {
        reject(`Error loading stylesheet: ${stylesheet}`);
      };

      document.head.appendChild(link);
    });
  };

  // Sequentially load each stylesheet
  for (let i = 0; i < stylesheets.length; i++) {
    try {
      await loadStylesheet(stylesheets[i]);
      // Uncomment the following line to log when each stylesheet is loaded
      // console.log(`${stylesheets[i]} loaded`);
    } catch (error) {
      console.error(error);
      // Optionally handle the error and decide whether to continue or stop
    }
  }

  // Call the final callback after all stylesheets are loaded
  if (finalCallback) {
    finalCallback();
  }
}
