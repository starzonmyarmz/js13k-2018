import create from './create.js'
import Body from './body.js'

export default class Bar extends Body {
  constructor (x, y, width, height, on, spike) {
    super(create('rect'))
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.on = on
    this.spike = spike
    this.element.setAttribute('x', this.x)
    this.element.setAttribute('y', this.y)
    this.element.setAttribute('width', this.width)
    this.element.setAttribute('height', this.height)
    this.element.classList.toggle('light', on)
    this.element.classList.toggle('dark', !on)
    if (this.spike) {
      this.element.setAttribute('fill', `url(#spike-${this.spike})`)
    }
  }
}
