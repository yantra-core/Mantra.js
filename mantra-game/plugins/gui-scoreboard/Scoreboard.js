// Scoreboard.js - Marak Squires 2023
import gui from '../gui-editor/gui.js';

class Scoreboard {
  static id = 'gui-scoreboard';

  constructor(config = {}) {
    this.id = Scoreboard.id;
    this.scoreData = config.scoreData || {};
  }

  init(game) {
    this.game = game;
    this.game.systemsManager.addSystem(this.id, this);
    this.drawScoreboard();
  }

  drawScoreboard() {
    let scoreboard = document.createElement('div');
    scoreboard.id = "scoreboard";
    scoreboard.className = "scoreboard";
    // scoreboard.style.cssText = "position: absolute; top: 0; left: 50%; transform: translateX(-50%); text-align: center;";
    // set height and width

    let header = document.createElement('h1');
    header.textContent = "Scoreboard";
    scoreboard.appendChild(header);

    let list = document.createElement('ul');
    for (let player in this.scoreData) {
      let listItem = document.createElement('li');
      listItem.textContent = `${player}: ${this.scoreData[player]}`;
      list.appendChild(listItem);
    }

    scoreboard.appendChild(list);

    // Use gui.window() to create the window
    this.scoreboardView = gui.window('scoreboardView', 'Scoreboard', function() {
      game.systemsManager.removeSystem(Scoreboard.id);
    });

    let guiContent = this.scoreboardView.querySelector('.gui-content');
    guiContent.appendChild(scoreboard);
  }

  updateScore(player, score) {
    this.scoreData[player] = score;
    this.drawScoreboard(); // Redraw scoreboard with updated scores
  }

  updateScoreboard() {
    let list = document.querySelector('#scoreboard ul');
    list.innerHTML = '';
    for (let player in this.scoreData) {
      let listItem = document.createElement('li');
      listItem.textContent = `${player}: ${this.scoreData[player]}`;
      list.appendChild(listItem);
    }
  }

  update () {
    let game = this.game;
    // console.log('Scoreboard.update()')
    // console.log('Scoreboard.update()', game.data)
    let players = game.data.ents.PLAYER;
    let scoreData = {};
    for (let id in players) {
      let player = players[id];
      scoreData[player.name || player.id] = player.score || 0;
    }
    this.scoreData = scoreData;
    // TODO: only draw if diff
    // this.drawScoreboard();
    this.updateScoreboard();
  }

  unload() {
    if (this.scoreboardView) {
      this.scoreboardView.remove();
    }
  }
}

export default Scoreboard;
