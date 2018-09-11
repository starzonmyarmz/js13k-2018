import Body from './body.js'
import create from './create.js'

export default class Spikes extends Body {
  constructor (x, y, width, height, on, direction) {
    super(create('svg'))
    this.rect = create('rect')
    this.rect.setAttribute('x', '0')
    this.rect.setAttribute('y', '0')
    this.rect.setAttribute('width', '100%')
    this.rect.setAttribute('height', '100%')
    this.element.appendChild(this.rect)
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.on = on
    this.direction = direction
  }

  get up () {
    return this.direction === 'up'
  }

  get down () {
    return this.direction === 'down'
  }

  get left () {
    return this.direction === 'left'
  }

  get right () {
    return this.direction === 'right'
  }

  get width () {
    return super.width
  }

  set width (value) {
    super.width = value
    if (this.up || this.down) {
      this.element.setAttribute('width', Math.round(this.width / 16) * 16)
    }
  }

  get height () {
    return super.height
  }

  set height (value) {
    super.height = value
    if (this.left || this.right) {
      this.element.setAttribute('height', Math.round(this.height / 16) * 16)
    }
  }

  get on () {
    return this._on
  }

  set on (value) {
    this._on = !!value
    this.element.classList.toggle('light', this.on)
    this.element.classList.toggle('dark', !this.on)
  }

  get direction () {
    return this._direction
  }

  set direction (value) {
    this._direction = value
    this.rect.setAttribute('fill', `url(#spike-${this.direction})`)
  }

  toJSON () {
    return [
      Math.round(this.x),
      Math.round(this.y),
      this.up || this.down ? Math.round(this.width / 16) * 16 : this.width,
      this.left || this.right ? Math.round(this.height / 16) * 16 : this.height,
      this.direction
    ]
  }
}
