import Body from './body.js'
import create from './create.js'

export default class Bar extends Body {
  constructor (x, y, width, height, on) {
    super(create('rect'))
    this.width = width
    this.height = height
    this.x = x
    this.y = y
    this.on = on
  }

  get on () {
    return !!this._on
  }

  set on (value) {
    this._on = !!value
    this.element.classList.toggle('light', this.on)
    this.element.classList.toggle('dark', !this.on)
  }

  toJSON () {
    return [
      Math.round(this.x),
      Math.round(this.y),
      Math.round(this.width),
      Math.round(this.height),
      Number(this.on)
    ]
  }
}
