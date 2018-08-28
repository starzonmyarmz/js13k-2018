const svg = document.querySelector('svg')
const KEYS = {}
const WIDTH = 768
const HEIGHT = 480
const NO_DEFAULT = [
  ' ',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight'
]

const sleep = (delay) => new Promise((resolve, reject) => {
  let start = performance.now()
  requestAnimationFrame(function check (now) {
    if (now >= start + delay) return resolve()
    requestAnimationFrame(check)
  })
})

document.addEventListener('keydown', (event) => {
  KEYS[event.key] = true
  if (event.key === ' ') scene.on = !scene.on
  if (NO_DEFAULT.includes(event.key)) event.preventDefault()
})

document.addEventListener('keyup', (event) => {
  KEYS[event.key] = false
})

class Body {
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
}

class Goal extends Body {
  constructor () {
    super()
    this.element = document.getElementById('goal')
    this.x = 0
    this.y = 0
    this.width = 22
    this.height = 20
  }

  get x () {
    return this._x
  }

  set x (value) {
    this.element.setAttribute('x', this._x = value)
  }

  get y () {
    return this._y
  }

  set y (value) {
    this.element.setAttribute('y', this._y = value)
  }
}

class Guy extends Body {
  constructor (x, y) {
    super()
    this.element = document.getElementById('guy')
    this.x = x
    this.y = y
    this.height = 48
    this.width = 26
    this.speed = 7
    this.vx = 0
    this.vy = 0
  }

  get x () {
    return this._x
  }

  set x (value) {
    this.element.setAttribute('x', this._x = value)
  }

  get y () {
    return this._y
  }

  set y (value) {
    this.element.setAttribute('y', this._y = value)
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

    this.x = Math.min(WIDTH - this.width, Math.max(0, this.x + this.vx))
    this.y = Math.max(0, this.y + this.vy)

    this.element.classList.toggle('walk', KEYS.ArrowLeft || KEYS.ArrowRight)
  }
}

class Bar extends Body {
  constructor (x, y, width, height, on, spike) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.on = on
    this.spike = spike
    this.element = document.createElementNS(svg.namespaceURI, 'rect')
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

class Scene {
  constructor (levels) {
    this.index = 0
    this.paused = false
    this.guy = new Guy
    this.goal = new Goal
    this.levels = levels
    this.load(...levels[0])
  }

  get on () {
    return this._on
  }

  set on (value) {
    this._on = value
    document.body.classList.toggle('on', value)
    document.body.classList.toggle('off', !value)
  }

  async advance () {
    this.paused = true
    document.body.classList.add('finish')
    await sleep(1000)
    this.index = Math.min(this.index + 1, this.levels.length - 1)
    this.load(...this.levels[this.index])
    document.body.classList.remove('finish')
    await sleep(1000)
    this.paused = false
  }

  load (guy, goal, bars) {
    this.start = guy
    const [x, y] = goal
    this.goal.x = x
    this.goal.y = y
    if (this.bars) for (const bar of this.bars) bar.element.remove()
    this.bars = bars.map((args) => new Bar(...args))
    for (const bar of this.bars) svg.appendChild(bar.element)
    this.reset()
  }

  reset () {
    this.on = true
    const [x, y] = this.start
    this.guy.x = x
    this.guy.y = y
  }

  standing () {
    return this.bars.some((bar) =>
      !bar.spikes &&
      bar.on === this.on &&
      this.guy.left <= bar.right &&
      this.guy.right >= bar.left &&
      this.guy.bottom === bar.top
    )
  }

  landing () {
    return this.bars.find((bar) =>
      !bar.spikes &&
      bar.on === this.on &&
      this.guy.left <= bar.right &&
      this.guy.right >= bar.left &&
      this.guy.bottom < bar.top &&
      this.guy.bottom + this.guy.vy >= bar.top
    )
  }

  won () {
    return (
      this.guy.left <= this.goal.right &&
      this.guy.right >= this.goal.left &&
      this.guy.top <= this.goal.bottom &&
      this.guy.bottom >= this.goal.top
    )
  }

  lost () {
    return this.guy.top > HEIGHT || this.bars.some((bar) =>
      bar.spikes &&
      bar.on ===  this.on &&
      this.guy.left <= bar.right &&
      this.guy.right >= bar.left &&
      this.guy.top <= bar.bottom &&
      this.guy.bottom >= bar.top
    )
  }

  tick () {
    if (this.paused) return

    if (KEYS.ArrowUp && this.standing()) {
      this.guy.vy = -21
    }

    if (this.landing()) {
      this.guy.bottom = this.landing().y
      this.guy.vy = 0
    }

    this.guy.tick()

    if (!this.standing()) {
      this.guy.vy = Math.min(10, this.guy.vy + 2)
    }

    if (this.lost()) this.reset()
    if (this.won()) this.advance()
  }
}

const scene = new Scene([
  [[20, 200], [704, 244], [
    [0, 288, 330, 600, true],
    [438, 288, 330, 600, true]
  ]],
  [[371, 20], [704, 404], [
    [0, 100, 768, 16, true],
    [0, 216, 768, 16, false],
    [0, 332, 768, 16, true],
    [0, 448, 768, 600, false]
  ]],
  [[20, 200], [704, 244], [
    [0, 288, 330, 600, true],
    [438, 288, 330, 600, false]
  ]],
])

requestAnimationFrame(function tick () {
  scene.tick()
  requestAnimationFrame(tick)
})
