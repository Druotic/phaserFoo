/**
 * Register globals
 */
const { Phaser } = require('./globals')
const { Game } = Phaser

let sprite;

function preload () {
  //  37x45 is the size of each frame
  //  There are 18 frames in the PNG - you can leave this value blank if the frames fill up the entire PNG, but in this case there are some
  //  blank frames at the end, so we tell the loader how many to load
  game.load.spritesheet('wizard', 'assets/sprites/wizard_sheet.png', 73, 73, 13);
  game.stage.backgroundColor = "#444444";
}

function isCasting(sprite) {
  const currentAnimation = sprite.animations.currentAnim;
  return currentAnimation.name === 'cast' && currentAnimation.isPlaying;
}

function isArrowDown (keyboard) {
  for (const key of ARROW_KEYS) {
    if (keyboard.isDown(key))
      return true
  }
  return false
}

function tryIdle(sprite) {
  if (isCasting(sprite) || isArrowDown(game.input.keyboard))
    return
  return sprite.animations.play('idle');
}

function onKeyRelease (event) {
  const { keyCode } = event;

  tryIdle(sprite);
}

const ARROW_KEYS = [
  Phaser.Keyboard.UP,
  Phaser.Keyboard.DOWN,
  Phaser.Keyboard.RIGHT,
  Phaser.Keyboard.LEFT
];


function onKeyDown (event) {
  const { keyCode } = event;

  if (isCasting(sprite))
    return

  if (ARROW_KEYS.includes(keyCode))
    sprite.animations.play('walk');
  else if (keyCode === Phaser.Keyboard.SPACEBAR) {
    const cast = sprite.animations.play('cast');
    cast.onComplete.add((sprite) => {
      const idle = tryIdle(sprite)
      if(!idle)
        sprite.animations.play('walk');
    });
  }
}

function create () {
  sprite = game.add.sprite(game.world.centerX, game.world.centerY, 'wizard');
  const idle = sprite.animations.add('idle', [0,1,2], 10, true)
  const walk = sprite.animations.add('walk', [3,4,5,6], 10, true)
  const cast = sprite.animations.add('cast', [7,8,9,10,11,12], 10, false)

  idle.play()

  game.input.keyboard.onUpCallback = onKeyRelease;
  game.input.keyboard.onDownCallback = onKeyDown;

  sprite.anchor.setTo(0.5, 0.5);
}

function processArrowKeys(sprite, keyboard) {

  if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
    sprite.x -= 4;
    sprite.scale.x = Math.abs(sprite.scale.x)*-1
  }
  if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    sprite.x += 4;
    sprite.scale.x = Math.abs(sprite.scale.x)
  }
  if (keyboard.isDown(Phaser.Keyboard.UP)) {
    sprite.y -= 4;
  }
  if (keyboard.isDown(Phaser.Keyboard.DOWN)) {
    sprite.y += 4;
  }
}

function update() {

  if (isCasting(sprite))
    return;

  processArrowKeys(sprite, game.input.keyboard);
}

function render () {
  game.debug.spriteInfo(sprite, 32, 32);
}

const game = new Game(800, 600, Phaser.CANVAS, 'phaserFoo', {
  preload, create, update, render
});
