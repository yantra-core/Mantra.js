export default function start(cb) {
  let game = this;
  return new Promise((resolve, reject) => {

    // Define a wrapper for the callback to also resolve the promise
    const callbackWrapper = (err, result) => {
      if (err) {
        reject(err);
        if (cb) cb(err);
        return;
      }
      resolve(result);
      if (cb) cb(null, result);
    };

    if (typeof cb !== 'function') {
      cb = function () { // noop 
      };
    }

    // Wait for all systems to be ready before starting the game loop
    if (game.loadingPluginsCount > 0 || game.physicsReady !== true) {
      // console.log('waiting for plugins to load...', game.physicsReady)
      setTimeout(() => {
        game.start(cb).then(resolve).catch(reject);
      }, 4);
      return
    } else {
      // Remark: If multiple graphics plugins are used, default behavior is to,
      //         horizontally stack the graphics plugins so they all fit on the screen
      // TODO: move this to Graphics.js file
      if (game.config.multiplexGraphicsHorizontally) {
        // get the graphics count and sub-divide each canvas width to multiplex the graphics plugins
        let totalCount = game.graphics.length;
        let newWidth = 100 / totalCount;
        // find each canvas in the #gameHolder and apply the new width
        if (totalCount > 1) {
          if (document && document.querySelectorAll) {
            let canvasList = document.querySelectorAll('#gameHolder canvas');
            for (let i = 0; i < canvasList.length; i++) {
              // console.log('setting new width for', canvasList[i], 'to', newWidth + '%')
              canvasList[i].style.width = newWidth + '%';
            }
          }
        }
      }

      console.log('All Plugins are ready! Starting Mantra Game Client...');
      game.emit('game::ready');
      if (this.config.defaultPlayer) {
        this.createPlayer({
          type: 'PLAYER'
        }).then(function (ent) {
          game.setPlayerId(ent.id);
        });
      }

      if (game.systems.client) {
        let client = this.getSystem('client');
        client.start(callbackWrapper);
      } else {
        console.log('Warning: No Client System found, will not start game loop.');
      }
    }
  });

}