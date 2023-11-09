# `@yantra-core/mantra-edge`

## Deploy Mantra Games to Cloudflare Edge

### Demo [CodePen](https://codepen.io/Marak-Squires/pen/mdvmEMg)

The `mantra-edge` server is hosted on Cloudflare Workers and operates differently from traditional game servers.

In traditional game server setups, the server would run a game loop that ticks at a set interval (`hzMS`), updating game state and sending out state snapshots to clients at each tick. 

In `mantra-edge`, using Cloudflare Workers, the server advances the game state when it receives a `gameTick` message from a client, which means the timing of the game state updates is driven externally by the client messages.

To progress the game state forward, `mantra-edge` elects the best client as the `ticker,` responsible for maintaining the game's time synchronization. For games with strict timing requirements, a serverless physics orchestration service like [https://yantra.gg](https://yantra.gg) can provide dedicated high-precision, low-latency clock synchronization services for Cloudflare.


## Key Concepts

### Statelessness / Client-Driven Ticks

- Cloudflare Workers are stateless and react to events.
- The server does not tick at a fixed internal rate; client requests drive it.
- The game state is advanced upon receiving `gameTick` messages from the client.

### Client Synchronization / Buffer System / RTT Compensation

- Clients are tasked with sending `gameTick` messages in alignment with the game's expected tick rate.
- A buffer system is implemented to queue `gameTick` messages.
- The server processes these messages based on their intended execution timestamps, ensuring proper order and timing.
- Clients adjust their tick rate to compensate for network latency (Round-Trip Time).

### Server Responsibilities / Durable Objects

- The server's role is to process `gameTick` messages accurately and efficiently.
- It maintains game state consistency and broadcasts the updated state to all clients.
- Gamestate is stored in Cloudflare Durable Objects

# Usage

You must register an account with Cloudflare and install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

Once you have Wrangler setup, you can run Mantra Game instance locally with:

```bash
wrangler dev
```

Deploy Mantra Game instance to Cloudflare Edge
```bash
wrangler publish
```

## Connecting `mantra-client` to edge worker

Running either `wrangler dev` or `wrangler publish` will return a websocket connection string, which you can connect using `game.connect(wsConnectionString)`:

[Mantra Client connect example code](https://codepen.io/Marak-Squires/pen/mdvmEMg)

```js
let game = new MANTRA.Game();
game.connect('wss://0.0.0.0:8787/websocket')
```

### CloudFlare Wrangler Documentation

Developing on Cloudflare Workers and Durable Objects locally can be streamlined with the use of Cloudflare's official command-line tool, `wrangler`. Wrangler includes a dev server that allows you to test your Workers and Durable Objects locally before deploying them to Cloudflare's infrastructure. Here's a basic outline of how you might set up and use a local development environment for Cloudflare:

1. **Install Wrangler**:
   First, you'll need to install Wrangler globally via npm:
   ```bash
   npm install -g @cloudflare/wrangler
   ```

2. **Authenticate Wrangler**:
   Authenticate Wrangler with your Cloudflare account:
   ```bash
   wrangler login
   ```
   Follow the prompts to log in.

3. **Configure Your Project**:
   Edit the `wrangler.toml` file in your project directory to specify your Cloudflare account ID and the name of your Workers script.

4. **Develop Locally**:
   Start the local development server:
   ```bash
   wrangler dev
   ```
   This will start a local server that you can use to test your Workers and Durable Objects. The server will reload automatically as you save changes to your files.

5. **Preview Your Worker**:
   Once you're ready to test your Worker on Cloudflare's servers (without deploying it to production), you can use the `wrangler preview` command:
   ```bash
   wrangler preview
   ```

6. **Deploy Your Worker**:
   When you're ready to deploy your Worker to production:
   ```bash
   wrangler publish
   ```

7. **Debugging**:
   Debugging can be done through the use of `console.log` statements, which will appear in your terminal while using `wrangler dev`, or in the browser's console while using `wrangler preview`.

This setup allows you to develop and test your Cloudflare Workers and Durable Objects locally, preview them on Cloudflare's servers, and then deploy them to production once they're ready. The `wrangler dev` command is particularly useful for local development, allowing you to see the results of your code in real time on your local machine.

Further documentation and more advanced configuration options can be found in the [Wrangler documentation](https://developers.cloudflare.com/workers/cli-wrangler/commands#dev).