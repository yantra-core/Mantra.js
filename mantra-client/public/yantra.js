const YANTRA = {};
const PING_CHECK_TIMEOUT = 120 * 1000;
YANTRA.serverDiscovery = {
  etherspaceEndpoint: 'https://etherspace.ayyo.gg',
  pollIntervalMs: 500,
  maxPollCount: 99999,
  pollCount: 0,
  isPolling: false,
  broadcastMessage: function(event, message){
    let emitter = null;
    if (typeof window.game !== 'undefined') {
      emitter = window.game;
    }
    if (emitter) {
      emitter.emit(event, message);
    }
  },

  async findBestServers(region, mode, owner, settings) {
    const url = `${this.etherspaceEndpoint}/api/v2/autoscale/${region}/${owner}/${mode}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings)
    });
    return response.json();
  },

  async pollForServer(region, mode, owner, settings) {
    if (this.pollCount > this.maxPollCount) {
      throw new Error('Max polling attempts reached');
    }
    this.broadcastMessage('server::discovery::polling', { message: 'Server is starting: ' + region + ' ' + owner + '/' + mode});
    console.log("pollForServer");
    this.pollCount++;
    this.isPolling = true;

    try {
      const serverInfo = await this.findBestServers(region, mode, owner, settings);
      if (Array.isArray(serverInfo) && serverInfo.length && serverInfo[0].processInfo) {
        console.log("got back at least one server with process info", serverInfo);
        this.broadcastMessage({ message: 'found server', serverInfo });
        this.broadcastMessage('server::discovery::best-server', { message: 'Found best server', data: serverInfo });

        this.isPolling = false;
        return serverInfo;
      } else {
        console.log('server not ready', serverInfo);
        // Wrap the recursive call in a new Promise
        return new Promise(resolve => {
          setTimeout(async () => {
            resolve(await this.pollForServer(region, mode, owner, settings));
          }, this.pollIntervalMs);
        });
      }
    } catch (error) {
      console.error('Error in polling for server:', error);
      this.isPolling = false;
      throw error;
    }
  },

  async connectToBestServer(gameConfig) {
    console.log("gameConfig", gameConfig)
    this.pollCount = 0;
    const region = gameConfig.region || 'defaultRegion';
    const mode = gameConfig.mode || 'defaultMode';
    const owner = gameConfig.owner || 'defaultOwner';
    const settings = gameConfig.settings || {};

    try {
      const bestServer = await this.pollForServer(region, mode, owner, settings);
      return bestServer;
    } catch (error) {
      console.error('Failed to connect to the best server:', error);
      throw error;
    }
  },

  clearLocalStorage() {
    localStorage.removeItem('yantra_region');
    localStorage.removeItem('yantra_ip');
  }
};

window.onerror = function (err) {
  //alert(err);
  console.log('warning: uncaught error', err)
};

let awsRegionMapping = {
  "us-east-1": "Washington_DC",
  "us-west-1": "Seattle",
  // "ap-east-1": "Hong_Kong",
  "ap-south-1": "Mumbai",
  // "ap-northeast-3": "Tokyo",
  "ap-southeast-1": "Singapore",
  "ap-southeast-2": "Sydney",
  "ap-northeast-1": "Tokyo",
  "eu-central-1": "Frankfurt",
  "eu-west-2": "London",
  // "eu-north-1": "Stockholm",
  "sa-east-1": "Sao_Paulo",
};


let updateRegionList = [
  {
    "region": "Singapore",
    "host": "ping.hathora.dev",
    "port": 2006
  },
  {
    "region": "Washington_DC",
    "host": "ping.hathora.dev",
    "port": 2001
  },
  {
    "region": "Mumbai",
    "host": "ping.hathora.dev",
    "port": 2005
  },
  {
    "region": "Sydney",
    "host": "ping.hathora.dev",
    "port": 2008
  },
  {
    "region": "Sao_Paulo",
    "host": "ping.hathora.dev",
    "port": 2009
  },
  {
    "region": "Seattle",
    "host": "ping.hathora.dev",
    "port": 2000
  },
  {
    "region": "Chicago",
    "host": "ping.hathora.dev",
    "port": 2002
  },
  {
    "region": "Frankfurt",
    "host": "ping.hathora.dev",
    "port": 2004
  },
  {
    "region": "Tokyo",
    "host": "ping.hathora.dev",
    "port": 2007
  },
  {
    "region": "London",
    "host": "ping.hathora.dev",
    "port": 2003
  }
];

function getHostPort(region) {
  // console.log('getting region', region)
  const regionInfo = updateRegionList.find(item => item.region === region);
  return `${regionInfo.host}:${regionInfo.port}`;
}

const fetchWithRetry = async (url, options, retryCount = 3) => {
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.log('Error: failed to fetch ping url, trying again', url, error, retryCount)
    if (retryCount === 0) throw error;
    return await fetchWithRetry(url, options, retryCount - 1);
  }
}


//
// Region Latency Discovery
//


const getMedian = function (arr) {
  const mid = Math.floor(arr.length / 2);
  arr.sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;
};


YANTRA.regionDiscovery = {

  async getRegionLatency(regionData) {
    return new Promise((resolve) => {
      const latencies = [];
      let start1, start2, start3;
      let timeout2, timeout3;

      const socket = new WebSocket(`wss://${regionData.host}:${regionData.port}`);

      const timeout = setTimeout(() => {
        clearTimeout(timeout2);
        clearTimeout(timeout3);
        socket.close();
        resolve({ region: regionData.region, latency: Infinity });
      }, PING_CHECK_TIMEOUT);

      socket.addEventListener('open', () => {
        start1 = Date.now();
        socket.send('ping1');
        timeout2 = setTimeout(() => {
          start2 = Date.now();
          socket.send('ping2');
        }, 500);
        timeout3 = setTimeout(() => {
          start3 = Date.now();
          socket.send('ping3');
        }, 1000);
      });

      socket.addEventListener('message', event => {
        if (event.data === 'ping1') {
          latencies.push(Date.now() - start1);
        } else if (event.data === 'ping2') {
          latencies.push(Date.now() - start2);
        } else if (event.data === 'ping3') {
          latencies.push(Date.now() - start3);
        }
        if (latencies.length === 3) {
          clearTimeout(timeout);
          socket.close();
          const medianLatency = getMedian(latencies);
          resolve({ region: regionData.region, latency: medianLatency });
        }
      });
    });
  },

  async findFastestRegion() {
    try {
      const latencyResults = await Promise.all(updateRegionList.map(regionInfo => {
        return this.getRegionLatency(regionInfo);
      }));

      const sortedResults = latencyResults.sort((a, b) => a.latency - b.latency);
      return sortedResults[0].region; // Returns the region with the lowest latency
    } catch (error) {
      console.error('Error in finding fastest region:', error);
      throw error;
    }
  }
};

window.YANTRA = YANTRA;