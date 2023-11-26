// Loads external js script files sequentially
export default function loadScripts(scripts, finalCallback) {
  if (this.isServer) {
    return;
  }
  const loadScript = (index) => {
    if (index < scripts.length) {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      // Prepend the scriptRoot to the script src
      script.src = this.scriptRoot + scripts[index];
      script.onload = () => {
        console.log(`${scripts[index]} loaded`);
        loadScript(index + 1); // Load the next script
      };
      document.head.appendChild(script);
    } else {
      finalCallback(); // All scripts have been loaded
    }
  };

  loadScript(0); // Start loading the first script
}