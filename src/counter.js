import Body from './body.js'
import create from './create.js'

export default class Counter extends Body {
  constructor (element) {
    super(element)
    this.value = 0
  }

  get value () {
    return this._value
  }

  set value (value) {
    this._value = value || 0

    this.element.innerHTML = ''
    let index = 0
    for (let c of this.value.toString()) {
      const number = new Body(create('rect'))
      number.element.setAttribute('fill', `url(#n${c})`)
      number.width = 10
      number.height = 16
      number.x = 12 * index++
      this.append(number)
    }
  }
}
