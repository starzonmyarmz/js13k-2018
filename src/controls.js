import Body from './body.js'
import {DOWN, PRESSED} from './keys.js'

class Key extends Body {
  constructor (id, pressed) {
    super(document.getElementById(id))
    this.pressed = pressed
  }

  tick () {
    this.element.classList.toggle('dark', !this.pressed())
    this.element.classList.toggle('light', this.pressed())
  }
}

export default class Controls extends Body {
  constructor (game) {
    super(document.getElementById('controls'))
    this.game = game
    this.keys = [
      new Key('key-w', () => DOWN.has('w')),
      new Key('key-a', () => DOWN.has('a')),
      new Key('key-d', () => DOWN.has('d')),
      new Key('key-space', () => DOWN.has(' ')),
      new Key('button-toggle', () => PRESSED.has(1)),
      new Key('button-jump', () => PRESSED.has(0)),
      new Key('button-left', () => PRESSED.has(14)),
      new Key('button-right', () => PRESSED.has(15)),
    ]
  }

  keydown ({key}) {
    switch (key) {
      case 'Enter':
        this.game.state = 'title'
        break
      case 'ArrowUp':
      case 'ArrowDown':
        this.element.querySelector('.menu .item').classList.add('selected')
        break
    }
  }

  tick () {
    if (this.hidden) return
    for (const key of this.keys) key.tick()
  }
}
