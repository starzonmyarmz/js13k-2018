import Body from './body.js'
import create from './create.js'

export default class Goal extends Body {
  constructor (x, y) {
    super(create('svg'))
    this.element.innerHTML = `
    <svg id="goal"><g id="inner-goal"><g id="inner-goal-finish">
      <path d="M12 19.26L6.37 22.1a1 1 0 0 1-1.44-1.07l1.05-5.98-4.47-4.22a1 1 0 0 1 .55-1.72l6.22-.88 2.83-5.5a1 1 0 0 1 1.78 0l2.83 5.5 6.22.88a1 1 0 0 1 .55 1.72l-4.47 4.22 1.05 5.98a1 1 0 0 1-1.44 1.07L12 19.26z"/>
    </g></g></svg>`
    this.width = 22
    this.height = 20
    this.load(x, y)
  }

  load (x, y) {
    this.x = x
    this.y = y
  }

  toJSON () {
    return [Math.round(this.x), Math.round(this.y)]
  }
}
