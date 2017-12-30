const { isArrowDown } = require('./helpers/keyboard');

const KEY = 'wizard';
const URL = 'assets/sprites/wizard_sheet.png'
const SHEET_DIMENSIONS = { xSize: 73, ySize: 73, frames: 13 }

class Wizard {
  static preload (game) {
    game.load.spritesheet(
      KEY,
      URL,
      SHEET_DIMENSIONS.xSize,
      SHEET_DIMENSIONS.ySize,
      SHEET_DIMENSIONS.frames
    );
  }

  constructor (game) {
    this.game = game
    this.sprite = game.add.sprite(game.world.centerX, game.world.centerY, KEY)
    this.sprite.anchor.setTo(0.5, 0.5)
    
    this.idleAnimation = sprite.animations.add('idle', [0,1,2], 10, true)
    this.walkAnimation = sprite.animations.add('walk', [3,4,5,6], 10, true)
    this.castAnimation = sprite.animations.add('cast', [7,8,9,10,11,12], 10, false)

    const keyboard = game.input.keyboard
    keyboard.onUpCallback = (event) => {
      keyboard.onUpCallback(event)
      this.onKeyRelease(event);
    }
    game.input.keyboard.onDownCallback = onKeyDown;

  }

  onKeyDown (event) {
    const { keyCode } = event;

    if (this.isCasting())
      return

    if (isArrowDown(this.game.input.keyboard))
      this.walk = this.sprite.animations.play('walk');
    else if (keyCode === Phaser.Keyboard.SPACEBAR) {
      this.cast = this.sprite.animations.play('cast');
      this.cast.onComplete.add((sprite) => {
        const idle = tryIdle(sprite)
        if(!idle)
          this.walk = sprite.animations.play('walk');
      })
    }
  }

  tryIdle () {
    if (this.isCasting() || isArrowDown(this.game.input.keyboard))
      return
    return this.sprite.animations.play('idle');
  }

  onKeyRelease (event) {
    const { keyCode } = event;

    tryIdle();
  }

  start () {
    this.tryIdle();
    //this.idle.play()
  }

  isCasting () {
    const currentAnimation = this.sprite.animations.currentAnim
    return currentAnimation.name === 'cast' && currentAnimation.isPlaying
  }
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

