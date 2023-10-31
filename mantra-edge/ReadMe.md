# `@yantra-core/edge`

## Deploy Mantra Games to Cloudflare Edge

### Usage

You will need to register an account with Cloudflare and install [Wrangler](https://developers.cloudflare.com/workers/wrangler/install-and-update/).

### Configuring FPS and Clock Source
An outside clock service is required to progress the game state forward. The `gameTick` event must be called at your desired framerate from a third-party source to trigger the event within the Cloudflare Worker.

In development testing, you can add a `setInterval()` inside your client code to progress the game loop. For production, we recommend using a service like https://yantra.gg to orchestrate your serverless physics.

Once you have Wrangler setup you can run Mantra Game instance locally with:

```bash
wrangler dev
```

Deploy Mantra Game instance to Cloudflare Edge
```bash
wrangler publish
```

### CloudFlare Wrangler Documentation

Developing on Cloudflare Workers and Durable Objects locally can be streamlined with the use of Cloudflare's official command-line tool, `wrangler`. Wrangler includes a dev server which allows you to test your Workers and Durable Objects locally before deploying them to Cloudflare's infrastructure. Here’s a basic outline of how you might set up and use a local development environment for Cloudflare:

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