
let game = new MANTRA.Game({
  graphics: ['css'], // array enum, 'babylon', 'phaser', 'css', 'three',
});
game.start();
    


game.make().Button().text('Mantra').position(0, 40).style({
  position: 'absolute'
})
.pointerdown(function(){
  alert('hi')
  window.location.href = 'https://yantra.gg/mantra';
})
.createEntity();

game.make().Button().text('Entities').position(130, 40).style({
  position: 'absolute'
}).createEntity();


game.make().Button().text('Rules').position(260, 40).style({
  position: 'absolute'
}).createEntity();


game.make().Button().text('Events').position(390, 40).style({
  position: 'absolute'
}).createEntity();
