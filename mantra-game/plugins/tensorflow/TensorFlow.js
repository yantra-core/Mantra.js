// TensorFlow.js plugin for Mantra Game - Marak Squires 2024
// see: TensorFlow.js - https://www.tensorflow.org/js
//      "@tensorflow/tfjs": "^4.17.0",
//      "@tensorflow/tfjs-backend-wasm": "^4.17.0",

import * as tf from '@tensorflow/tfjs';
import { setWasmPaths } from '@tensorflow/tfjs-backend-wasm';


export default class TensorFlow {
  static id = 'tensorflow';

  constructor() {
    this.id = 'tensorflow';

  }

  init(game) {
    this.game = game;
    // register as system

    // Set TensorFlow.js to use the WASM backend.
    tf.setBackend('wasm').then(() => {
      console.log('Using WASM backend');
      this.main();
    });

    this.game.systemsManager.addSystem('tensorflow', this);
  }

  update() {
    let player = this.game.data.ents.PLAYER[0];
    if (player && this.game.tick % 10 === 0) {
      // Generate random actions
      const actions = this.generateRandomActions();
  
      // Apply the random actions
      this.applyActions(actions, player);
    }
  
    if (player && this.game.tick % 100 === 0) {
      // Define the state as an array of relevant game state data
      const state = [
        player.position.x,
        player.position.y,
        player.score,
        player.health,
        // Add any other relevant state data
      ];
  
      // Calculate reward based on player's status
      let reward = this.calculateReward(player);
      console.log('reward', reward);
  
      // Train the model based on the current state and calculated reward
      this.agent.trainModel(state, reward);
    }
  }
  
  generateRandomActions() {
    // Define possible actions
    const possibleActions = ['MOVE_UP', 'MOVE_DOWN', 'MOVE_LEFT', 'MOVE_RIGHT', 'USE_ITEM_1', 'USE_ITEM_2'];
  
    // Randomly decide which actions to take
    const actions = possibleActions.reduce((acc, action) => {
      acc[action] = Math.random() > 0.5; // 50% chance to take each action
      return acc;
    }, {});
  
    return actions;
  }
  
  applyActions(actions, player) {
    // Apply actions based on the generated random actions
    Object.keys(actions).forEach(action => {
      if (actions[action]) {
        this.game.rules.emit(action, player);
      }
    });
  }

  calculateReward(player) {
    let reward = 0;

    // Reward for moving outside the starting area
    if (player.position.x !== player.startingPosition.x || player.position.y !== player.startingPosition.y) {
      reward += 1;
    }

    // Reward for increasing score
    if (player.score > player.previousScore) {
      reward += (player.score - player.previousScore);
    }

    // Reward for maintaining or improving health
    if (player.health >= player.previousHealth) {
      reward += 1;
    }

    // Update previous score and health for the next game tick
    player.previousScore = player.score;
    player.previousHealth = player.health;

    return reward;
  }

  async main() {
    this.agent = new TensorFlowAgent();
    await this.agent.loadOrCreateModel();


    // Example game state data and reward
    const exampleInputData = [0, 1, 2, 3, 4, 5, 6, 7]; // Replace with actual game state data
    const exampleReward = 10; // Replace with actual calculated reward

    // Train the model based on the game state and reward
    //await this.agent.trainModel(exampleInputData, exampleReward);

    // Save the model periodically or based on some condition
    //await this.agent.saveModel();
  }


}

class TensorFlowAgent {
  constructor() {
    this.model = null;
    this.isTraining = false;
    this.learningRate = 0.01;
    this.discountFactor = 0.95;
    this.modelPath = 'localstorage://bobby';
  }

  async loadOrCreateModel() {
    try {
      this.model = await tf.loadLayersModel(this.modelPath);
      console.log('Model loaded from disk');
    } catch (error) {
      console.log('Creating a new model');
      this.model = tf.sequential();
      this.model.add(tf.layers.dense({ units: 128, activation: 'relu', inputShape: [8] }));
      this.model.add(tf.layers.dense({ units: 64, activation: 'relu' }));
      this.model.add(tf.layers.dense({ units: 5, activation: 'sigmoid' }));

      this.model.compile({
        optimizer: 'adam',
        loss: tf.losses.huberLoss,
        metrics: ['accuracy']
      });
    }
    this.model.compile({
      optimizer: 'adam',
      loss: tf.losses.huberLoss,
      metrics: ['accuracy']
    });

  }

  async trainModel(inputData, reward) {
    if (this.isTraining) {
      console.log('Skipping training due to ongoing fit');
      return;
    }

    this.isTraining = true;
    console.log("Training with reward: ", reward);

    const inputTensor = tf.tensor2d([inputData]);
    const outputTensor = this.model.predict(inputTensor);

    const actions = outputTensor.arraySync()[0];
    const maxFutureQ = Math.max(...actions);
    const newQ = actions.map(q => (1 - this.learningRate) * q + this.learningRate * (reward + this.discountFactor * maxFutureQ));

    await this.model.fit(inputTensor, tf.tensor2d([newQ]), {
      epochs: 1
    });

    this.isTraining = false;
    console.log('Training completed');
  }

  async saveModel() {
    await this.model.save(this.modelPath);
    console.log('Model saved to disk');
  }
}