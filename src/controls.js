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
  constructor (element, back) {
    super(element)
    this.back = back
    this.keys = [
      new Key('key-w', () => DOWN.has('w')),
      new Key('key-a', () => DOWN.has('a')),
      new Key('key-d', () => DOWN.has('d')),
      new Key('key-space', () => DOWN.has(' ')),
    ]
  }

  keydown ({key}) {
    switch (key) {
      case 'Enter':
        this.back()
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
