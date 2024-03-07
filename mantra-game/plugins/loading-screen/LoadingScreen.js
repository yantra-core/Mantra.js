class LoadingScreen {
  static id = 'loading-screen';

  constructor(config = {}) {
    this.id = LoadingScreen.id;
    this.plugins = [];
    this.minLoadTime = config.minLoadTime || 330; // Minimum time for the loading screen
    this.startTime = Date.now(); // Track the start time of the loading process
    this.loadedPluginsCount = 0;
    this.confirmedLoadedPlugins = [];
    this.pluginTimers = {};  // Store timers for each plugin
    this.pluginElements = {}; // Store references to plugin UI elements
  }

  init(game) {
    let self = this;

    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);

    let currentPlugins = Object.keys(this.game._plugins);

    this.plugins = this.plugins.concat(currentPlugins);
    this.plugins.sort();
    this.createLoadingScreen();

    this.game.on('plugin::loading', (pluginId) => {
      // check to see if we already have a loading timer for this plugin
      // if not, create one
      if (this.plugins.indexOf(pluginId) === -1) {
        this.plugins.push(pluginId);
        this.createPluginLoader(pluginId);
      }
    });

    this.game.on('plugin::loaded', (pluginId) => {
      this.markPluginAsLoaded(pluginId);
    });

    this.game.on('game::ready', () => {
      let now = Date.now();
      let timeRemaining = this.minLoadTime - (now - this.startTime);
      // check to see if enough this.minLoadtime has passed since this.startTime 
      // if not, set a timeout to wait until it has

   
      self.gameReadyHandler();

      if (timeRemaining > 0) {
        setTimeout(() => {
          self.unload();
        }, timeRemaining * 0.33);
      } else {
        self.unload();
      }

    });

   

    //this.animateCRT = this.animateCRT.bind(this); // Bind the function
    // this.animateCRT();

  }

  /* Remark: Replaced with CSS animation
  animateCRT() {
    const glowElement = document.querySelector('.crt-glow');
    const scanlinesElement = document.querySelector('.crt-scanlines');
  
    // Adjust the glow intensity
    let glowIntensity = Math.random() * 0.5 + 0.5;
    glowElement.style.boxShadow = `inset 0 0 ${30 * glowIntensity}px rgba(0, 255, 0, ${0.7 * glowIntensity})`;
  
    // Adjust the scanlines opacity
    let scanlinesOpacity = Math.random() * 0.1 + 0.05;
    scanlinesElement.style.opacity = scanlinesOpacity;
  
    // Repeat this animation with a smoother transition
    setTimeout(this.animateCRT, 1000); // Adjust the timing as needed
  }
  */
  

  gameReadyHandler() {

    const currentTime = Date.now();
    const elapsedTime = currentTime - this.startTime;
    const remainingTime = Math.max(this.minLoadTime - elapsedTime, 0);

    this.plugins.forEach(plugin => {
      if (!this.isPluginLoaded(plugin)) {
        this.fastTrackLoading(plugin, remainingTime);
      }
    });

  }

  isPluginLoaded(pluginId) {
    const progressBar = this.pluginElements[pluginId];
    return progressBar && progressBar.style.width === '100%';
  }

  fastTrackLoading(pluginId, remainingTime) {
    clearInterval(this.pluginTimers[pluginId]);

    const progressBar = this.pluginElements[pluginId];
    if (progressBar) {
      let currentWidth = parseInt(progressBar.style.width, 10) || 0;
      const intervalTime = remainingTime / (100 - currentWidth);

      this.pluginTimers[pluginId] = setInterval(() => {
        if (currentWidth < 100) {
          currentWidth++;
          progressBar.style.width = currentWidth + '%';
        } else {
          clearInterval(this.pluginTimers[pluginId]);
        }
      }, intervalTime);
    }
  }

  createLoadingScreen() {
 
    this.loadingScreen = document.createElement('div');
    this.loadingScreen.id = 'loadingScreen';
   
    // add class crt-background
    this.loadingScreen.classList.add('crt-background');

    // let loadingScreen = document.getElementById('loadingScreen');

    // crt-background (if needed)
    let crtBackground = document.createElement('div');
    crtBackground.classList.add('crt-background');
    this.loadingScreen.appendChild(crtBackground);
    
    // crt-glow
    let crtGlow = document.createElement('div');
    crtGlow.classList.add('crt-glow');
    crtBackground.appendChild(crtGlow); // Append to crtBackground if exists
    
    // crt-scanlines
    let crtScanlines = document.createElement('div');
    crtScanlines.classList.add('crt-scanlines');
    crtBackground.appendChild(crtScanlines); // Append to crtBackground if exists
    
    this.crtBackground = crtBackground;

    this.setupStyles(this.crtBackground, {
      position: 'fixed',
      top: '0',
      paddingTop: '10px', // Adjust the padding to center the loading screen
      left: '10px',
      width: '100%',
      height: '100%',
      backgroundColor: 'black',
      color: 'white',
      zIndex: '9999',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    });

    // Header container
    const headerContainer = document.createElement('div');
    this.setupStyles(headerContainer, {
      width: '80%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px'
    });

    // Game title
    const gameTitle = document.createElement('div');
    gameTitle.textContent = 'Mantra.js Game Starting';
    this.setupStyles(gameTitle, {
      fontSize: '20px',
      fontWeight: 'bold',
      left: '40px',
      position: 'absolute'
    });

    // Plugin counter
    this.pluginCounter = document.createElement('div');
    this.updatePluginCounter(); // Update the plugin counter initially
    this.setupStyles(this.pluginCounter, {
      fontSize: '16px'
    });


    headerContainer.appendChild(gameTitle);
    headerContainer.appendChild(this.pluginCounter);
    this.crtBackground.appendChild(headerContainer);

    this.createPluginLoaders();
    document.body.appendChild(this.loadingScreen);
  }


  updatePluginCounter() {
    // this.pluginCounter.textContent = `${this.loadedPluginsCount}/${this.plugins.length} plugins loaded`;
  }
  createPluginLoader(plugin) {
    // Plugin container
    const pluginContainer = document.createElement('div');
    this.setupStyles(pluginContainer, {
      display: 'flex',
      alignItems: 'center',
      margin: '5px',
      width: '80%'
    });

    // Plugin name
    const pluginName = document.createElement('div');
    pluginName.textContent = plugin;
    this.setupStyles(pluginName, {
      marginRight: '10px', // Add margin to separate name from progress bar
      whiteSpace: 'nowrap' // Prevent plugin name from wrapping
    });

    // Progress bar container
    const progressBarContainer = document.createElement('div');
    this.setupStyles(progressBarContainer, {
      width: '60%', // Fixed width for all progress bars
      marginLeft: 'auto' // Aligns the progress bar container to the right
    });

    // Progress bar
    const progressBar = document.createElement('div');
    this.setupStyles(progressBar, {
      width: '0%',
      height: '20px',
      backgroundColor: 'limegreen'
    });

    progressBarContainer.appendChild(progressBar);
    pluginContainer.appendChild(pluginName);
    pluginContainer.appendChild(progressBarContainer);
    //this.loadingScreen.appendChild(pluginContainer);
    this.crtBackground.appendChild(pluginContainer); // Append to crtBackground if exists

    this.pluginElements[plugin] = progressBar;

    // Initialize and store the loading timer for each plugin
    this.pluginTimers[plugin] = this.initializeLoadingTimer(progressBar, plugin);
  }
  createPluginLoaders() {
    this.plugins.forEach(plugin => {
      this.createPluginLoader(plugin);
    });
  }

  initializeLoadingTimer(progressBar, plugin) {
    let width = 0;
    const maxTime = this.minLoadTime + Math.random() * 5000; // Randomize load time
    const intervalTime = maxTime / 100;
    return setInterval(() => {
      if (width < 100) {
        width++;
        progressBar.style.width = width + '%';
      } else {
        clearInterval(this.pluginTimers[plugin]);
      }
    }, intervalTime);
  }

  markPluginAsLoaded(pluginId) {

    // Clear the existing slow loading timer
    clearInterval(this.pluginTimers[pluginId]);

    const progressBar = this.pluginElements[pluginId];
    if (progressBar) {
      // Start a new faster loading timer
      this.animateToCompletion(progressBar, pluginId);
    }


    if (this.confirmedLoadedPlugins.indexOf(pluginId) !== -1) {
      return;
    }
    this.confirmedLoadedPlugins.push(pluginId);
    this.loadedPluginsCount++;
    this.updatePluginCounter();

  }

  animateToCompletion(progressBar, pluginId) {
    let currentWidth = parseInt(progressBar.style.width, 10) || 0;
    const fastLoadTime = Math.random() * 500 + 200; // Random time between 200ms and 700ms
    const intervalTime = fastLoadTime / (100 - currentWidth); // Time per percentage

    this.pluginTimers[pluginId] = setInterval(() => {
      if (currentWidth < 100) {
        currentWidth++;
        progressBar.style.width = currentWidth + '%';
      } else {
        clearInterval(this.pluginTimers[pluginId]);
      }
    }, intervalTime);
  }
  setupStyles(element, styles) {
    Object.assign(element.style, styles);
  }

  unload() {
    Object.values(this.pluginTimers).forEach(clearInterval);
    if (this.loadingScreen && this.loadingScreen.parentNode) {
      this.loadingScreen.parentNode.removeChild(this.loadingScreen);
    }
  }
}

export default LoadingScreen;