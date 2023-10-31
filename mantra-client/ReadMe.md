## mantra-client

### Key Features

1. **High-Performance 3D Rendering:** Utilizes Babylon.js, a powerful, open-source framework for building 3D games and rendering high-quality graphics directly in the web browser.

2. **Advanced Graphics with WebGPU:** Employs WebGPU for next-generation graphics rendering. This ensures more efficient processing and superior graphics performance compared to traditional WebGL, particularly for complex and graphics-intensive games.

3. **Synchronized Physics Engines:** Integrates [physics-matter](https://github.com/yantra-core/mantra/tree/master/mantra-game/plugins/physics-matter) plugin for syncing physics calculations between the client and server. This synchronization guarantees consistent game states across networked environments, enhancing multiplayer experiences and fairness.

4. **Offline Gameplay Capability:** mantra-client can run the game entirely offline, providing a seamless gaming experience without the need for constant server communication. 

5. **Ease of Development and Integration:** Built to work hand-in-hand with the [mantra-server](https://github.com/yantra-core/mantra/tree/master/mantra-server), enabling developers to create sophisticated multiplayer games with less effort and quicker deployment times.

### Getting Started

1. **Installation:**
   Ensure you have the latest version of Node.js installed.

   ```bash
   git clone https://github.com/yantra-core/mantra
   npm install
   ```

2. **Running the Client:**
   Start the development server:

   ```bash
   npm start
   ```

   This will start the game on `localhost:7777`.


### Client-Server Synchronization

mantra-client is designed to synchronize game states with the Mantra Server, ensuring a consistent multiplayer experience. The synchronization mechanism also enables the following:

- **Predictive Client-Side Physics:** Runs physics simulations client-side to reduce latency and improve responsiveness, later reconciling with server-side calculations.
- **State Interpolation:** For multiplayer scenarios, state interpolation is used to smooth out gameplay and reduce the impact of network latency.