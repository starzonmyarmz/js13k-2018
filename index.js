import KEYS from './src/keys.js'
import levels from './src/levels.js'
import sleep from './src/sleep.js'
import Body from './src/body.js'
import {GOAL_FX, JUMP_FX, DEATH_FX} from './src/sound.js'

const svg = document.querySelector('svg')
const WIDTH = 768
const HEIGHT = 480

class Goal extends Body {
  constructor () {
    super(document.getElementById('goal'))
    this.x = 0
    this.y = 0
    this.width = 22
    this.height = 20
  }
}

class Guy extends Body {
  constructor (x, y) {
    super(document.getElementById('guy'))
    this.x = x
    this.y = y
    this.height = 48
    this.width = 26
    this.speed = 7
    this.vx = 0
    this.vy = 0
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

    this.element.classList.toggle('walk', KEYS.ArrowLeft || KEYS.ArrowRight)
  }
}

class Bar extends Body {
  constructor (x, y, width, height, on, spike) {
    super(document.createElementNS(svg.namespaceURI, 'rect'))
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

class Scene {
  constructor (levels) {
    this.index = 0
    this.deaths = 0
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

  get deaths () {
    return this._deaths
  }

  set deaths (value) {
    this._deaths = value
    const counter = document.getElementById('counter')
    counter.innerHTML = ''
    let s = value.toString()
    for (let i = 0; i < s.length; i++) {
      const rect = document.createElementNS(svg.namespaceURI, 'rect')
      rect.setAttribute('fill', `url(#n${s[i]})`)
      rect.setAttribute('width', 10)
      rect.setAttribute('height', 16)
      rect.setAttribute('x', 12 * i)
      counter.appendChild(rect)
    }
  }

  async advance () {
    GOAL_FX.play()
    this.paused = true
    document.body.classList.add('finish')
    await sleep(1000)
    this.index = Math.min(this.index + 1, this.levels.length - 1)
    this.load(...this.levels[this.index])
    document.body.classList.remove('finish')
    await sleep(1000)
    this.paused = false
  }

  async death () {
    DEATH_FX.play()
    this.deaths += 1
    this.paused = true
    const death = document.getElementById('death')
    death.setAttribute('x', this.guy.x - 32 + this.guy.width / 2)
    death.setAttribute('y', this.guy.y - 32 + this.guy.height / 2)
    this.guy.element.setAttribute('hidden', true)
    document.body.classList.add('dying')
    await sleep(700)
    document.body.classList.remove('dying')
    this.reset()
    this.guy.element.removeAttribute('hidden')
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

  lost () {
    return this.guy.bottom > HEIGHT || this.bars.some((bar) =>
      bar.on === this.on && bar.overlaps(this.guy)
    )
  }

  setBounds (body) {
    const {bounds} = body

    bounds.left = -body.left
    bounds.right = WIDTH - body.right
    bounds.top = -body.top
    bounds.bottom = HEIGHT - body.bottom + 1

    for (const bar of this.bars) {
      if (bar.spike || bar.on !== this.on) continue

      if (bar.top < body.bottom && bar.bottom > body.top) {
        if (bar.isRightOf(body)) {
          bounds.right = Math.min(bounds.right, bar.left - body.right)
        } else if (bar.isLeftOf(body)) {
          bounds.left = Math.max(bounds.left, bar.right - body.left)
        }
      }

      if (bar.left < body.right && bar.right > body.left) {
        if (bar.isBelow(body)) {
          bounds.bottom = Math.min(bounds.bottom, bar.top - body.bottom)
        } else if (bar.isAbove(body)) {
          bounds.top = Math.max(bounds.top, bar.bottom - body.top)
        }
      }
    }

    return bounds
  }

  tick () {
    if (this.paused) return

    this.guy.tick()

    const {left, right} = this.setBounds(this.guy)
    this.guy.x += Math.min(right, Math.max(left, this.guy.vx))

    const {top, bottom} = this.setBounds(this.guy)
    this.guy.y += Math.min(bottom, Math.max(top, this.guy.vy))

    if (bottom === 0) {
      this.guy.vy = KEYS.ArrowUp ? -21 : 0
      if (KEYS.ArrowUp) JUMP_FX.play()
    } else {
      this.guy.vy = Math.min(10, this.guy.vy + 2)
    }

    if (this.lost()) {
      this.death()
    } else if (this.guy.overlaps(this.goal)) {
      this.advance()
    }
  }
}

const scene = new Scene(levels)

document.addEventListener('keydown', ({key}) => {
  if (key === ' ') scene.on = !scene.on
})

requestAnimationFrame(function tick () {
  scene.tick()
  requestAnimationFrame(tick)
})
