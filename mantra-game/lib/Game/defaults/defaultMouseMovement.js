// Remark: This module scoped variables are out of band, they will be removed, see comment in defaultTopdownMovement.js
// Assuming 'LEFT' and 'RIGHT' are properties indicating the state of mouse buttons in context.buttons

let moving = false;
let movingToPosition = {};

// Map your variables to the BUTTONS object
//let mouseMovementButton = 'RIGHT'; // Use 'RIGHT' for movement
//let mouseActionButton = 'LEFT'; // Use 'LEFT' for action (e.g., throwing a boomerang)

export default function defaultMouseMovement(game) {

  game.on('pointerUp', function (context, event) {

    let mouseMovementButton = game.config.mouseMovementButton || 'RIGHT';

    if (game.isTouchDevice()) {
      if (context.endedFirstTouch) {
        moving = false;
        game.updateEntity(game.currentPlayerId, { update: null });
      }
    } else {
      // Use the variable instead of the hardcoded value
      if (context.buttons[mouseMovementButton] === false) {
        moving = false;
        game.updateEntity(game.currentPlayerId, { update: null });
      }
    }
  });

  game.on('pointerMove', function (context, event) {
    if (!game.data || !game.data.ents || !game.data.ents.PLAYER) {
      return;
    }

    let gamePointerPosition = context.position;
    let currentPlayer = game.data.ents.PLAYER[0];
    let playerPosition = currentPlayer.position;

    if (playerPosition && moving) {
      let radians = Math.atan2(gamePointerPosition.y - playerPosition.y, gamePointerPosition.x - playerPosition.x);
      movingToPosition = { x: gamePointerPosition.x, y: gamePointerPosition.y, rotation: radians };
    }
  });

  game.on('pointerDown', function (context, event) {
    if (!game.data || !game.data.ents || !game.data.ents.PLAYER) {
      return;
    }

    let mouseMovementButton = game.config.mouseMovementButton || 'RIGHT';
    let mouseActionButton = game.config.mouseActionButton || 'LEFT';

    let gamePointerPosition = context.position;
    let currentPlayer = game.data.ents.PLAYER[0];
    let playerPosition = currentPlayer.position;

    if (playerPosition) {
      if (typeof currentPlayer.update !== 'function') {
        game.updateEntity(currentPlayer.id, {
          update: function (player) {
            if (moving && movingToPosition.x && movingToPosition.y) {
              // move the player based on the angle of the mouse compared to the player
              // create a new force based on angle and speed
              let radians = movingToPosition.rotation;
              let force = { x: Math.cos(radians) * 1.5, y: Math.sin(radians) * 1.5 };
              // Remark: Directly apply forces to player, this is local only
              //         Networked movements need to go through Entity Input systems with control inputs
              // Remark: Update default top-down movement system to support mouse movements
              game.applyForce(game.data.ents.PLAYER[0].id, force);
            }
          }
        });
      }

      let radians = Math.atan2(gamePointerPosition.y - playerPosition.y, gamePointerPosition.x - playerPosition.x);

      if (game.isTouchDevice()) {
        if (event.pointerId === context.firstTouchId) {
          moving = true;
          movingToPosition = { x: gamePointerPosition.x, y: gamePointerPosition.y, rotation: radians };
        } else if (event.pointerId === context.secondTouchId) {
          if (game.systems.boomerang) {
            game.systems.boomerang.throwBoomerang(currentPlayer.id, radians);
          }
        }
      } else {
        // Use variables for button checks
        if (context.buttons[mouseMovementButton]) {
          moving = true;
          movingToPosition = { x: gamePointerPosition.x, y: gamePointerPosition.y, rotation: radians };
        }
        if (context.buttons[mouseActionButton]) {
          if (game.systems.boomerang) {
            game.systems.boomerang.throwBoomerang(currentPlayer.id, radians);
          }
        }
      }
    }
  });
}