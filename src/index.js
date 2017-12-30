/**
 * Register globals
 */
const { Phaser } = require('./helpers/globals')
const { Game } = Phaser

const Wizard = require('./Wizard')

let player;

function preload () {
  Wizard.preload(game);
}

function create () {
  player = new Wizard(game);

  game.input.keyboard.onUpCallback = onKeyRelease
}

function update () {
  if (player.isCasting())
    return;

  player.processArrowKeys();
}

function render () {

}

// begin helper functions

function tryIdle (sprite) {
  if (isCasting(sprite) || isArrowDown(game.input.keyboard))
    return
  return sprite.animations.play('idle');
}

function onKeyRelease (event) {
    player.tryIdle()
}

const game = new Game(800, 600, Phaser.CANVAS, 'phaserFoo', {
  preload, create, update, render
})
