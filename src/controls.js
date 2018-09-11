import Body from './body.js'
import {DOWN} from './keys.js'

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
  constructor (element) {
    super(element)
    this.keys = [
      new Key('key-w', () => DOWN.has('w')),
      new Key('key-a', () => DOWN.has('a')),
      new Key('key-d', () => DOWN.has('d')),
      new Key('key-space', () => DOWN.has(' ')),
    ]
  }

  tick () {
    for (const key of this.keys) key.tick()
  }
}
