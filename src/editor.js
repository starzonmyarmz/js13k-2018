import Bar from './bar.js'
import Guy from './guy.js'
import Goal from './goal.js'
import Body from './body.js'
import create from './create.js'
import Spikes from './spikes.js'
import {DOWN} from './keys.js'

const PADDING = 3

const svg = document.getElementById('editor')
const point = svg.createSVGPoint()
const translate = ({clientX, clientY}) => {
  point.x = clientX
  point.y = clientY
  return point.matrixTransform(svg.getScreenCTM().inverse())
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

document.getElementById('close-dialog').addEventListener('click', () => {
  document.getElementById('dialog').hidden = true
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
    this.element.style.cursor = this.cursor(this.region(x, y))
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

  cursor (region) {
    switch (region) {
      case 'n':
      case 's':
        return 'ns-resize'
      case 'e':
      case 'w':
        return 'ew-resize'
      case 'nw':
      case 'se':
        return 'nwse-resize'
      case 'ne':
      case 'sw':
        return 'nesw-resize'
      case 'm':
        return 'move'
    }
  }
}

class EditableSpikes extends Spikes {
  constructor (...args) {
    super(...args)
    this.element.style.cursor = 'move'
    this.element.addEventListener('dblclick', this.dblclick.bind(this))
    this.element.addEventListener('mousedown', this.mousedown.bind(this))
    this.element.addEventListener('mousemove', this.mousemove.bind(this))
  }

  get direction () {
    return super.direction
  }

  set direction (value) {
    super.direction = value
    this.rect.setAttribute('fill', `url(#edit-spike-${this.direction})`)
  }

  dblclick () {
    this.on = !this.on
  }

  mousemove (event) {
    const {x, y} = translate(event)
    this.element.style.cursor = this.cursor(this.region(x, y))
  }

  mousedown (event) {
    if (event.button !== 0) return
    const {x, y} = translate(event)
    drag = this.resize.bind(this, this.region(x, y))
  }

  resize (region, {x, y}) {
    switch (region) {
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
      case 'm':
        this.x += x
        this.y += y
        break
    }
  }

  region (x, y) {
    x -= this.x
    y -= this.y

    if (this.isUp || this.isDown) {
      if (x <= PADDING) return 'w'
      else if (x < this.width - PADDING) return 'm'
      else return 'e'
    }

    else {
      if (y <= PADDING) return 'n'
      else if (y < this.height - PADDING) return 'm'
      else return 's'
    }
  }

  cursor (region) {
    switch (region) {
      case 'n':
      case 's':
        return 'ns-resize'
      case 'e':
      case 'w':
        return 'ew-resize'
      case 'm':
        return 'move'
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

export default class Editor extends Body {
  constructor (levels, game) {
    super(document.getElementById('editor'))
    this.bars = []
    this.spikes = []
    this.levels = levels
    this.game = game
    this.guy = new EditableGuy
    this.append(this.guy)
    this.goal = new EditableGoal
    this.append(this.goal)
    this.level = 0
    document.addEventListener('keydown', this.keydown.bind(this))
  }

  addBar (bar) {
    this.bars.push(bar)
    this.append(bar)
    bar.element.addEventListener('click', ({shiftKey}) => {
      if (!shiftKey) return
      bar.remove()
      this.bars = this.bars.filter((other) => other === bar)
    })
  }

  addSpike (spike) {
    this.spikes.push(spike)
    this.append(spike)
    spike.element.addEventListener('click', ({shiftKey}) => {
      if (!shiftKey) return
      spike.remove()
      this.spikes = this.spikes.filter((other) => other === spike)
    })
  }

  get level () {
    return this._level
  }

  set level (value) {
    this._level = Math.max(0, Math.min(this.levels.length - 1, value))

    const [guy, goal, bars, spikes] = this.levels[this.level]
    this.guy.load(...guy)
    this.goal.load(...goal)
    while (this.bars.length) this.bars.pop().remove()
    for (const args of bars) {
      this.addBar(new EditableBar(...args))
    }
    while (this.spikes.length) this.spikes.pop().remove()
    for (const args of spikes) {
      this.addSpike(new EditableSpikes(...args))
    }
  }

  keydown ({key}) {
    if (this.hidden) return

    switch (key) {
      case 'ArrowRight':
        this.level += 1
        break
      case 'ArrowLeft':
        this.level -= 1
        break
      case 'p':
        this.addBar(new EditableBar(0, 0, 48, 48, true))
        break
      case 'c':
        navigator.clipboard.writeText(JSON.stringify(this))
        break
      case 'u':
      case 'd':
      case 'l':
      case 'r':
        if (!DOWN.has('s')) return
        this.addSpike(key === 'u' || key === 'd'
          ? new EditableSpikes(0, 0, 64, 8, true, key === 'u' ? 'up' : 'down')
          : new EditableSpikes(0, 0, 8, 64, true, key === 'l' ? 'left' : 'right')
        )
        break
      case 'h':
        document.getElementById('dialog').hidden = !document.getElementById('dialog').hidden
        break
      case 'g':
        const url = new URL(window.location)
        url.searchParams.set('level', JSON.stringify(this))
        window.location = url.toString()
        break
      case 'Escape':
        if (this.game) this.game.state = 'title'
        break
    }
  }

  toJSON () {
    return [this.guy, this.goal, this.bars, this.spikes]
  }
}
