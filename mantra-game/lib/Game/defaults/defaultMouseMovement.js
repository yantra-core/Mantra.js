// Mantra Default Mouse Movement - Marak Squires 2024
//
// Remark: The following module scoped variables "moving" and "movingToPosition" are out of band, 
// they will be removed, see comment in defaultTopdownMovement.js
//
let moving = false;
let movingToPosition = {};

export default function defaultMouseMovement(game) {

  let movingButton = game.config.mouseMovementButton || 'LEFT';
  let actionButton = game.config.mouseActionButton || 'RIGHT';
  let cameraMoveButton = game.config.mouseCameraButton || 'MIDDLE';

  game.on('pointerUp', function (context, event) {

    // TOOD: better game.getActivePlayer() checks
    if (typeof game.currentPlayerId === 'undefined' || !game.currentPlayerId) {
      return;
    }

    if (game.isTouchDevice()) {
      if (context.endedFirstTouch) {
        moving = false;
        game.updateEntity(game.currentPlayerId, { update: null });
      }
    } else {
      if (context.buttons[movingButton] === false) {
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

    if (typeof currentPlayer === 'undefined') {
      return;
    }

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

    let gamePointerPosition = context.position;
    let currentPlayer = game.data.ents.PLAYER[0];

    // TOOD: better game.getActivePlayer() checks
    if (typeof currentPlayer === 'undefined') {
      return;
    }

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
          // TODO: emit sutra event for action
          useItem(game, currentPlayer, radians);
        }
      } else {
        // Use variables for button checks
        if (context.buttons[movingButton]) {
          moving = true;
          movingToPosition = { x: gamePointerPosition.x, y: gamePointerPosition.y, rotation: radians };
        }
        if (context.buttons[actionButton]) {
          // TODO: emit sutra event for action
          useItem(game, currentPlayer, radians);
        }
      }
    }
  });
}

// Stubs for meta.equippedItems / equippable items API
function useItem(game, currentPlayer, radians) {
  //console.log('useItem', currentPlayer, radians);
  if (currentPlayer.meta && currentPlayer.meta.equippedItems && currentPlayer.meta.equippedItems.length) {
    // pick the first item in the array
    let equippedItem = currentPlayer.meta.equippedItems[0];
    let system = game.systems[equippedItem.plugin]; // as string name, 'bullet'
    let method = system[equippedItem.method]; // as string name, 'fireBullet'

    if (typeof method === 'function') {
      method(currentPlayer.id, radians);
    } else {
      console.error('Method not found', equippedItem.method);
    }

  } else {
    // boomerang is default item ( for now )
    if (game.systems.boomerang) {
      game.systems.boomerang.throwBoomerang(currentPlayer.id, radians);
    }
  }

}
