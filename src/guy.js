import KEYS from './keys.js'
import Body from './body.js'

export default class Guy extends Body {
  constructor (x, y) {
    super(document.getElementById('guy'))
    this.x = x
    this.y = y
    this.height = 48
    this.width = 26
    this.speed = 6
    this.vx = 0
    this.vy = 0
  }

  tick () {
    if (KEYS.ArrowLeft && !KEYS.ArrowRight) {
      this.vx = -this.speed
      this.element.classList.add('left')
    } else if (KEYS.ArrowRight && !KEYS.ArrowLeft) {
      this.vx = this.speed
      this.element.classList.remove('left')
    } else {
      this.vx = 0
    }

    this.element.classList.toggle('walk', KEYS.ArrowLeft || KEYS.ArrowRight)
  }
}
