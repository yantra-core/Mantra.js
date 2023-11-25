// Pong.js - Marak Squires 2023
let Pong = {
  id: 'pongGame',
  initial: 'Idle',
  states: {
    Idle: {
      on: { START: 'Playing' }
    },
    Playing: {
      on: {
        PAUSE: 'Paused',
        COLLISION: [
          { target: 'Scored', cond: 'isCollisionGoal' },
          { target: 'Playing' } // Default, no scoring collision
        ]
      }
    },
    Scored: {
      // Handle scoring logic here
      on: { CONTINUE: 'Playing' }
    },
    Paused: {
      on: { RESUME: 'Playing' }
    },
    GameOver: {
      type: 'final'
    }
  }
};

const Guards = {
  isCollisionGoal: (context, event) => {
    // Implement the logic to determine if the collision is a goal collision
    // For instance, you might check the event details sent from your collision system
    return event.collisionType === 'goal';
  }
};

let Game = {
  "id": "pongGame",
  "world": {
    "width": 800,
    "height": 600,
    "background": "black",
    "score": {  // Scoring system
      "player1": 0,
      "player2": 0, // can add more players as game runs
    }
  },
  "entities": {
    "player": {
      "type": "PLAYER",
      "position": { "x": 30, "y": 300 },
      "size": { "width": 20, "height": 100 },
      "velocity": { "x": 0, "y": 0 },
      "input": { "type": "player" }  // Player input handling
    },
    "ball": {
      "type": "Ball",
      "position": { "x": 400, "y": 300 },
      "size": { "radius": 10 },
      "velocity": { "x": 2, "y": 2 }
    },
    "border": {
      "type": "BORDER",
      "position": { "x": 0, "y": 0 },
      "size": { "width": 1600, "height": 900 }
    }
  },
  "stateMachine": Pong,
  "guards": Guards
};



export default Game;