export default function loadScripts(scripts, finalCallback) {
  if (this.isServer) {
    return;
  }

  const loadScript = (index) => {
    if (index < scripts.length) {
      let script = document.createElement('script');
      script.type = 'text/javascript';
      // script.async = true; // Enable asynchronous loading
      script.defer = true;

      script.src = this.scriptRoot + scripts[index];

      script.onload = () => {
        console.log(`${scripts[index]} loaded`);
        loadScript(index + 1); // Load the next script after the current one finishes loading
      };

      // Handle script loading errors
      script.onerror = () => {
        console.error(`Error loading script: ${scripts[index]}`);
        // Optionally, proceed to the next script or handle the error
      };

      document.head.appendChild(script);
    } else {
      finalCallback(); // All scripts have been loaded
    }
  };

  loadScript(0); // Start loading the first script
}
