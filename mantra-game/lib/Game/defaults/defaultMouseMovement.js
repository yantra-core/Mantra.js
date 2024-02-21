// Remark: This module scoped variables are out of band, they will be removed, see comment in defaultTopdownMovement.js
let moving = false;
let movingToPosition = {};

export default function defaultMouseMovement(game) {

  game.on('pointerUp', function (context, event) {
    if (game.isTouchDevice()) {
      if (context.endedFirstTouch) {
        moving = false;
        game.updateEntity(game.currentPlayerId, {
          update: null
        });
      }
    } else {
      // Consider whether to stop movement based on which button was released
      if (context.buttons.RIGHT === false) {
        moving = false;
        game.updateEntity(game.currentPlayerId, {
          update: null
        });
      }
    }


  });

  game.on('pointerMove', function (context, event) {

    // game is not ready, still starting
    if (!game.data || !game.data.ents || !game.data.ents.PLAYER) {
      return;
    }

    let gamePointerPosition = context.position;
    let currentPlayer = game.data.ents.PLAYER[0];
    let playerPosition = currentPlayer.position;

    if (playerPosition && moving) { // Ensure we update the movement only if the player is set to move.
      let radians = Math.atan2(gamePointerPosition.y - playerPosition.y, gamePointerPosition.x - playerPosition.x);
      movingToPosition = {
        x: gamePointerPosition.x,
        y: gamePointerPosition.y,
        rotation: radians
      };
    }
  });

  game.on('pointerDown', function (context, event) {

    // game is not ready, still starting
    if (!game.data || !game.data.ents || !game.data.ents.PLAYER) {
      return;
    }

    let gamePointerPosition = context.position;
    let currentPlayer = game.data.ents.PLAYER[0];
    let playerPosition = currentPlayer.position;

    if (playerPosition) {

      // check to see if we already have an update event
      if (typeof currentPlayer.update !== 'function') {
        game.updateEntity(currentPlayer.id, {
          update: function (player) {
            if (moving && movingToPosition.x && movingToPosition.y) {
              // move the player based on the angle of the mouse compared to the player
              // create a new force based on angle and speed
              let radians = movingToPosition.rotation
              let force = {
                x: Math.cos(radians) * 1.5,
                y: Math.sin(radians) * 1.5
              };
              // Remark: Directly apply forces to player, this is local only
              //         Networked movements need to go through Entity Input systems with control inputs
              // TODO:   Update default top-down movement system to support mouse movements
              game.applyForce(game.data.ents.PLAYER[0].id, force);

            }

          }
        });
      }

      let radians = Math.atan2(gamePointerPosition.y - playerPosition.y, gamePointerPosition.x - playerPosition.x);

      // Simplified touch and non-touch device handling. 
      // Assumes first touch or right-click for movement, second touch or left-click for boomerang.
      if (game.isTouchDevice()) {
        if (event.pointerId === context.firstTouchId) {
          moving = true;
          movingToPosition = {
            x: gamePointerPosition.x,
            y: gamePointerPosition.y,
            rotation: radians
          };
        } else if (event.pointerId === context.secondTouchId) {
          game.systems.boomerang.throwBoomerang(currentPlayer.id, radians);
        }
      } else {
        // For non-touch devices, use right-click for movement and left-click for boomerang.
        if (context.buttons.RIGHT) {
          moving = true;
          movingToPosition = {
            x: gamePointerPosition.x,
            y: gamePointerPosition.y,
            rotation: radians
          };
        }
        if (context.buttons.LEFT) {
          game.systems.boomerang.throwBoomerang(currentPlayer.id, radians);
        }
      }
    }
  });

}