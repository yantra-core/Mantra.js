// loadScripts.js - Marak Squires 2023
export default async function loadScripts(scripts, finalCallback) {
  if (this.isServer) {
    return;
  }

  if (typeof scripts ==='string') {
    scripts = [scripts];
  }

  // Function to load an individual script and return a Promise
  const loadScript = async (script) => {
    return new Promise((resolve, reject) => {
      let scriptElement = document.createElement('script');
      scriptElement.type = 'text/javascript';
      scriptElement.defer = true;
      scriptElement.src = this.scriptRoot + script;

      scriptElement.onload = () => {
        resolve(script);
      };

      scriptElement.onerror = () => {
        reject(`Error loading script: ${script}`);
      };

      document.head.appendChild(scriptElement);
    });
  };

  // Sequentially load each script
  for (let i = 0; i < scripts.length; i++) {
    try {
      await loadScript(scripts[i]);
      // console.log(`${scripts[i]} loaded`);
    } catch (error) {
      console.error(error);
      // Optionally handle the error and decide whether to continue or stop
    }
  }

  // Call the final callback after all scripts are loaded
  if (finalCallback) {
    finalCallback();
  }
}
