const { Phaser } = require('./globals');

const ARROW_KEYS = [
  Phaser.Keyboard.UP,
  Phaser.Keyboard.DOWN,
  Phaser.Keyboard.RIGHT,
  Phaser.Keyboard.LEFT
]

exports.isArrowDown = function isArrowDown (keyboard) {
  for (const key of ARROW_KEYS) {
    if (keyboard.isDown(key))
      return true
  }
  return false
}
