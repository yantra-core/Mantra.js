// TensorFlow.js plugin for Mantra Game - Marak Squires 2024
// see: TensorFlow.js - https://www.tensorflow.org/js
//      "@tensorflow/tfjs": "^4.17.0",
//      "@tensorflow/tfjs-backend-wasm": "^4.17.0",

// TODO: implement "imitation learning" via listening to game.emit events from player actions
// TODO: add event emitters for all agent actions ( load / save/ train / predict / error / 
//       add listener for these events that will display FlashMessage ( for now )
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

    // Load the pre-trained model
    // TODO: config flag, load the pretrained model

    //    await this.loadModel();

    setWasmPaths('/');
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

    if (this.game.tick % 1000 === 0) {
      console.log('Saving model...')
      this.agent.saveModel(); // fire and forget, could stack up if not careful
    }

  }

  // Remark: 3/4/2024 - Sutra rules for Tensor are WIP, needs testing
  initializeSutraConditions() {
    // Distance moved condition and action
    this.rules.addCondition('movedSignificantDistance', (gameState) => {
      return gameState.distanceMoved > 300; // Threshold for significant distance
    });

    this.rules.on('rewardForDistance', (gameState) => {
      const scalingFactor = 0.01; // Adjust this value as needed
      gameState.rewardValue += scalingFactor * gameState.distanceMoved; // Increase reward based on distance
    });

    // Health improved or maintained condition and action
    this.rules.addCondition('healthImprovedOrMaintained', (gameState) => {
      return gameState.playerHealth >= gameState.previousHealth;
    });

    this.rules.on('rewardForHealth', (gameState) => {
      gameState.rewardValue += 1; // Add a fixed reward for maintaining or improving health
    });

    // Score increased condition and action
    this.rules.addCondition('scoreIncreased', (gameState) => {
      return gameState.playerScore > gameState.previousScore;
    });

    this.rules.on('rewardForScore', (gameState) => {
      gameState.rewardValue += gameState.playerScore - gameState.previousScore; // Reward the increase in score
    });

    // Define behavior trees using conditions and actions
    this.rules
      .if('movedSignificantDistance')
      .then('rewardForDistance');

    this.rules
      .if('healthImprovedOrMaintained')
      .then('rewardForHealth');

    this.rules
      .if('scoreIncreased')
      .then('rewardForScore');
  }

  // Function to use the model for prediction
  predict(inputData) {
    if (!this.model) {
      console.error('Model not loaded');
      return;
    }

    // Preprocess inputData as required by your model
    const inputTensor = tf.tensor2d([inputData]);

    // Use the model for prediction
    const prediction = this.model.predict(inputTensor);

    // Post-process prediction as required for your application
    return prediction.arraySync(); // Convert tensor to JavaScript array
  }

  async loadModel() {
    try {
      this.model = await tf.loadLayersModel('localstorage://mantra-tf-model-1');
      console.log('Model loaded from disk');
    } catch (error) {
      console.error('Error loading model: ', error);
      // Handle the error (e.g., by using a fallback model or notifying the user)
    }
  }


  generateRandomActions() {
    // Define possible actions
    const possibleActions = ['MOVE_UP', 'MOVE_DOWN', 'MOVE_LEFT', 'MOVE_RIGHT', /*'USE_ITEM_1', 'USE_ITEM_2', 'FIRE_BULLET', 'THROW_BOOMERANG'*/];

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
        // console.log('applying action', action, player)
        this.game.rules.emit(action, player);
      }
    });
  }

  calculateReward(player) {
    let reward = 0;

    // Calculate distance moved from the starting area
    const distanceMoved = Math.sqrt(
      Math.pow(player.position.x - player.startingPosition.x, 2) +
      Math.pow(player.position.y - player.startingPosition.y, 2)
    );

    // Distance Reward Scaling: Introduce a scaling factor for distance moved
    const scalingFactor = 0.1; // Adjust this value as needed
    reward += scalingFactor * distanceMoved;

    // Punishment for staying close to the starting position
    const closeToCenterThreshold = 1000; // Units from the starting position considered "close"
    const punishmentScalingFactor = 0.001; // Adjust this value as needed
    if (distanceMoved < closeToCenterThreshold) {
      const punishment = player.utick * punishmentScalingFactor;
      reward -= punishment; // Subtract the punishment from the reward
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
    await this.agent.saveModel();
  }


}

class TensorFlowAgent {
  constructor() {
    this.model = null;
    this.isTraining = false;
    this.learningRate = 0.01;
    this.discountFactor = 0.95;
    this.modelPath = 'localstorage://mantra-tf-model-1'; // TODO make a save history of 10 models which selection on load when in editor mode
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


/*
    TODO: add ability to "imitation learn" by listening to active user inputs and 
          applying them to training data with high priority

    see:

 storeUserInput(input) {
    const player = this.game.data.ents.PLAYER[0];
    if (player) {
      const state = [player.position.x, player.position.y, player.score, player.health];
      const reward = this.calculateReward(player); // Assume this function exists
      this.userInputBuffer.push({state, input, reward});
    }
  }

  trainWithUserInput() {
    // Train the model with stored user inputs
    this.userInputBuffer.forEach(({state, input, reward}) => {
      this.agent.trainModel(state, reward); // Adjust this method to accept inputs if necessary
    });
    // Clear the buffer after training
    this.userInputBuffer = [];
  }

  update() {

    // Periodically train the model with user inputs
    if (this.game.tick % 1000 === 0) { // Adjust timing as needed
      this.trainWithUserInput();
    }
  }

*/

/* TODO: convert this to ECS code so it works on all adapters
   TODO: simple live visualization of the neural network
   TODO: add TensorSpace.js for static 3D visualization of the neural network ( after training and "offline" )

function visualizeNeuralNetwork() {
  const agent = this.game.systems.tensorflow.agent;
  const layers = agent.model.layers; // Assuming agent.model is your TensorFlow.js model

  layers.forEach((layer, layerIndex) => {
    const numberOfNeurons = layer.units || layer.filters || 1; // Get number of neurons based on layer type
    const layerPositionX = layerIndex * 20; // Horizontal spacing between layers

    for (let i = 0; i < numberOfNeurons; i++) {
      const neuronGeometry = new THREE.SphereGeometry(1, 32, 32);
      const neuronMaterial = new THREE.MeshBasicMaterial({color: 0x00ff00});
      const neuronMesh = new THREE.Mesh(neuronGeometry, neuronMaterial);

      // Position neurons vertically within a layer
      neuronMesh.position.set(layerPositionX, i * 5, 0);

      this.scene.add(neuronMesh);

      // If not the first layer, draw connections to previous layer
      if (layerIndex > 0) {
        const previousLayerNeurons = layers[layerIndex - 1].units || layers[layerIndex - 1].filters || 1;

        for (let j = 0; j < previousLayerNeurons; j++) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(layerPositionX - 20, j * 5, 0),
            new THREE.Vector3(layerPositionX, i * 5, 0)
          ]);
          const lineMaterial = new THREE.LineBasicMaterial({color: 0xffffff});
          const line = new THREE.Line(lineGeometry, lineMaterial);

          this.scene.add(line);
        }
      }
    }
  });
}

*/