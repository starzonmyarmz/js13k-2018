const svg = document.querySelector('svg')
const WIDTH = 768
const HEIGHT = 480

const KEYS = {}
document.addEventListener('keydown', ({key}) => { KEYS[key] = true })
document.addEventListener('keyup', ({key}) => { KEYS[key] = false })

document.addEventListener('keypress', ({key}) => {
  if (key === ' ') {
    scene.on = !scene.on
    document.body.classList.toggle('on', scene.on)
    document.body.classList.toggle('off', !scene.on)
  }
})

class Body {
  get top () { return this.y }

  get bottom () { return this.y + this.height }

  set bottom (value) { this.y = value - this.height }

  get left () { return this.x }

  get right () { return this.x + this.width }
}

class Goal extends Body {
  constructor (x, y) {
    super()
    this.x = x
    this.y = y
    this.width = 22
    this.height = 20
    this.element = document.getElementById('goal')
    this.element.setAttribute('transform', `translate(${this.x}, ${this.y})`)
  }
}

class Guy extends Body {
  constructor (x, y) {
    super()
    this.x = x
    this.y = y
    this.element = document.getElementById('guy')
    this.height = 48
    this.width = 26
    this.speed = 5
    this.vy = 0
  }

  tick () {
    if (KEYS.ArrowLeft) {
      this.x = Math.max(0, this.x - this.speed)
      this.element.classList.add('left')
    }

    if (KEYS.ArrowRight) {
      this.x = Math.min(WIDTH - this.width, this.x + this.speed)
      this.element.classList.remove('left')
    }

    this.y += this.vy

    this.element.classList.toggle('walk', KEYS.ArrowLeft || KEYS.ArrowRight)
    this.element.setAttribute('transform', `translate(${this.x}, ${this.y})`)
  }
}

class Bar extends Body {
  constructor (x, y, width, height, on) {
    super()
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.on = on
    this.element = document.createElementNS(svg.namespaceURI, 'rect')
    this.element.setAttribute('x', this.x)
    this.element.setAttribute('y', this.y)
    this.element.setAttribute('width', this.width)
    this.element.setAttribute('height', this.height)
    this.element.classList.toggle('light', on)
    this.element.classList.toggle('dark', !on)
  }
}

class Scene {
  constructor (guy, goal, bars) {
    this.on = true
    this.guy = new Guy(...guy)
    this.goal = new Goal(...goal)
    this.bars = bars.map((args) => new Bar(...args))
    for (const bar of this.bars) svg.appendChild(bar.element)
  }

  standing () {
    return this.bars.some((bar) =>
      bar.on === this.on &&
      this.guy.left <= bar.right &&
      this.guy.right >= bar.left &&
      this.guy.bottom === bar.top
    )
  }

  landing () {
    return this.bars.find((bar) =>
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

  tick () {
    if (KEYS.ArrowUp && this.standing()) this.guy.vy = -15

    if (this.landing()) {
      this.guy.bottom = this.landing().y
      this.guy.vy = 0
    }

    this.guy.tick()

    if (this.won()) document.body.classList.add('finish')

    if (!this.standing()) {
      this.guy.vy = Math.min(10, this.guy.vy + 2)
    }
  }
}

const scene = new Scene([100, 320], [570, 350], [
  [0, 400, 200, 16, true],
  [200, 400, 200, 16, false],
  [400, 400, 200, 16, true],
])

requestAnimationFrame(function tick () {
  scene.tick()
  requestAnimationFrame(tick)
})
