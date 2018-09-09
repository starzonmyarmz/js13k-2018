export default class Body {
  constructor (element) {
    this.element = element
    this.bounds = {}
  }

  get hidden () {
    return this.element.hasAttribute('hidden')
  }

  set hidden (value) {
    this.element.toggleAttribute('hidden', !!value)
  }

  get x () {
    return this._x
  }

  set x (value) {
    this.element.setAttribute('x', this._x = value || 0)
  }

  get y () {
    return this._y
  }

  set y (value) {
    this.element.setAttribute('y', this._y = value || 0)
  }

  get top () {
    return this.y
  }

  get bottom () {
    return this.y + this.height
  }

  get left () {
    return this.x
  }

  get right () {
    return this.x + this.width
  }

  set bottom (value) {
    this.y = value - this.height
  }

  isLeftOf (other) {
    return this.right <= other.left
  }

  isRightOf (other) {
    return this.left >= other.right
  }

  isAbove (other) {
    return this.bottom <= other.top
  }

  isBelow (other) {
    return this.top >= other.bottom
  }

  overlaps (other) {
    return this.left < other.right &&
    this.right > other.left &&
    this.top < other.bottom &&
    this.bottom > other.top
  }
}
