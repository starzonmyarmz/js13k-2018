import Bar from './src/bar.js'
import Guy from './src/guy.js'
import Goal from './src/goal.js'
import Body from './src/body.js'
import levels from './src/levels.js'
import create from './src/create.js'

const PADDING = 3

const svg = document.getElementById('editor')
const point = svg.createSVGPoint()
const translate = ({clientX, clientY}) => {
  point.x = clientX
  point.y = clientY
  return point.matrixTransform(svg.getScreenCTM().inverse())
}

const CURSOR = {
  n: 'ns-resize',
  s: 'ns-resize',
  e: 'ew-resize',
  w: 'ew-resize',
  nw: 'nwse-resize',
  se: 'nwse-resize',
  ne: 'nesw-resize',
  sw: 'nesw-resize',
  m: 'move',
}

let drag = null
let previous = null

document.addEventListener('mouseup', () => {
  drag = previous = null
})

document.addEventListener('mousedown', (event) => {
  if (event.button !== 0) return
  previous = translate(event)
})

document.addEventListener('mousemove', (event) => {
  if (!drag) return
  const {x, y} = translate(event)
  drag({
    x: x - previous.x,
    y: y - previous.y
  })
  previous = {x, y}
})

class EditableBar extends Bar {
  constructor (...args) {
    super(...args)
    this.element.addEventListener('dblclick', this.dblclick.bind(this))
    this.element.addEventListener('mousemove', this.mousemove.bind(this))
    this.element.addEventListener('mousedown', this.mousedown.bind(this))
  }

  dblclick () {
    this.on = !this.on
  }

  mousemove (event) {
    const {x, y} = translate(event)
    this.element.style.cursor = CURSOR[this.region(x, y)]
  }

  mousedown (event) {
    if (event.button !== 0) return
    const {x, y} = translate(event)
    drag = this.resize.bind(this, this.region(x, y))
  }

  resize (region, {x, y}) {
    switch (region) {
      case 'm':
        this.x += x
        this.y += y
        break
      case 'n':
        this.y += y
        this.height -= y
        break
      case 's':
        this.height += y
        break
      case 'e':
        this.width += x
        break
      case 'w':
        this.x += x
        this.width -= x
        break
      case 'nw':
        this.resize('n', {x, y})
        this.resize('w', {x, y})
        break
      case 'ne':
        this.resize('n', {x, y})
        this.resize('e', {x, y})
        break
      case 'sw':
        this.resize('s', {x, y})
        this.resize('w', {x, y})
        break
      case 'se':
        this.resize('s', {x, y})
        this.resize('e', {x, y})
        break
    }
  }

  region (x, y) {
    x -= this.x
    y -= this.y

    if (x <= PADDING) {
      if (y <= PADDING) return 'nw'
      else if (y < this.height - PADDING) return 'w'
      else return 'sw'
    }

    else if (x < this.width - PADDING) {
      if (y <= PADDING) return 'n'
      else if (y < this.height - PADDING) return 'm'
      else return 's'
    }

    else {
      if (y <= PADDING) return 'ne'
      else if (y < this.height - PADDING) return 'e'
      else return 'se'
    }
  }
}

class EditableGuy extends Guy {
  constructor (...args) {
    super(...args)
    this.element.style.cursor = 'move'
    this.element.addEventListener('mousedown', this.mousedown.bind(this))
  }

  mousedown (event) {
    if (event.button !== 0) return
    drag = ({x, y}) => {
      this.x += x
      this.y += y
    }
  }
}

class EditableGoal extends Goal {
  constructor (...args) {
    super(...args)
    this.element.style.cursor = 'move'
    this.element.addEventListener('mousedown', this.mousedown.bind(this))
  }

  mousedown (event) {
    if (event.button !== 0) return
    drag = ({x, y}) => {
      this.x += x
      this.y += y
    }
  }
}

class Editor extends Body {
  constructor () {
    super(document.getElementById('editor'))
    this.bars = []
    this.guy = new EditableGuy
    this.append(this.guy)
    this.goal = new EditableGoal
    this.append(this.goal)
    this.level = 0
    document.addEventListener('keydown', this.keydown.bind(this))
  }

  get level () {
    return this._level
  }

  set level (value) {
    this._level = Math.max(0, Math.min(levels.length - 1, value))

    const [guy, goal, bars] = levels[this.level]
    this.guy.x = guy[0]
    this.guy.y = guy[1]
    this.goal.x = goal[0]
    this.goal.y = goal[1]
    for (const bar of this.bars) bar.remove()
    for (const bargs of bars) {
      const bar = new EditableBar(...bargs)
      this.bars.push(bar)
      this.append(bar)
    }
  }

  keydown ({key}) {
    switch (key) {
      case 'ArrowRight':
        this.level += 1
        break
      case 'ArrowLeft':
        this.level -= 1
        break
      case 'b':
        const bar = new EditableBar(0, 0, 100, 100, true)
        this.bars.push(bar)
        this.append(bar)
        break
      case 'c':
        navigator.clipboard.writeText(JSON.stringify(this))
        break
    }
  }

  toJSON () {
    return [this.guy, this.goal, this.bars]
  }
}

new Editor
