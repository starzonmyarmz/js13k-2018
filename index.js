import {onPress, upKey} from './src/keys.js'
import levels from './src/levels.js'
import sleep from './src/sleep.js'
import Body from './src/body.js'
import Goal from './src/goal.js'
import Guy from './src/guy.js'
import Bar from './src/bar.js'
import Title from './src/title.js'
import {GOAL_FX, JUMP_FX, DEATH_FX, ON_FX, OFF_FX, playWin} from './src/sound.js'
import create from './src/create.js'
import {WIDTH, HEIGHT} from './src/dimensions.js'
import Counter from './src/counter.js'
import Spikes from './src/spikes.js'
import Controls from './src/controls.js'
import Editor from './src/editor.js'

class Scene extends Body {
  constructor (levels) {
    super(document.getElementById('game'))
    this.deaths = new Counter(document.getElementById('death-counter'))
    this.stars = new Counter(document.getElementById('level-counter'))
    this.congrats = new Body(document.getElementById('congrats'))
    this.levels = levels
    this.bars = []
    this.spikes = []
    this.paused = false
    this.guy = new Guy
    this.append(this.guy)
    this.goal = new Goal
    this.append(this.goal)
    this.index = 0
  }

  get on () {
    return this._on
  }

  set on (value) {
    this._on = value
    document.body.classList.toggle('on', value)
    document.body.classList.toggle('off', !value)
  }

  get index () {
    return this._index
  }

  set index (value) {
    this._index = Math.min(this.levels.length, Math.max(value || 0))

    this.on = true
    this.stars.value = this.index
    while (this.bars.length) this.bars.pop().remove()
    while (this.spikes.length) this.spikes.pop().remove()

    if (!this.level) return

    const [guy, goal, bars, spikes] = this.level
    this.guy.load(...guy)
    this.goal.load(...goal)

    for (const values of bars) {
      const bar = new Bar(...values)
      this.append(bar)
      this.bars.push(bar)
    }

    for (const values of spikes) {
      const spike = new Spikes(...values)
      this.append(spike)
      this.spikes.push(spike)
    }
  }

  get level () {
    return this.levels[this.index]
  }

  get finished () {
    return this.index >= this.levels.length
  }

  async advance () {
    GOAL_FX.play()
    this.paused = true
    document.body.classList.add('finish')
    await sleep(1000)
    this.index += 1
    if (this.finished) {
      this.guy.hidden = true
      this.congrats.hidden = false
      playWin()
    }
    document.body.classList.remove('finish')
    await sleep(1000)
    if (this.finished) {
      this.goal.hidden = true
    } else {
      this.paused = false
    }
  }

  async death () {
    DEATH_FX.play()
    this.deaths.value += 1
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

  reset () {
    this.guy.load(...this.level[0])
  }

  lost () {
    return this.guy.bottom > HEIGHT || this.bars.some((bar) =>
      bar.on === this.on && bar.overlaps(this.guy)
    ) || this.spikes.some((spike) =>
      spike.on === this.on && spike.overlaps(this.guy)
    )
  }

  setBounds (body) {
    const {bounds} = body

    bounds.left = -body.left
    bounds.right = WIDTH - body.right
    bounds.top = -body.top
    bounds.bottom = HEIGHT - body.bottom + 1

    for (const bar of this.bars) {
      if (bar.on !== this.on) continue

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

  tick (scale) {
    if (this.paused || this.hidden) return

    this.guy.tick(scale)

    const {left, right} = this.setBounds(this.guy)
    this.guy.x += Math.min(right, Math.max(left, this.guy.vx))

    const {top, bottom} = this.setBounds(this.guy)
    this.guy.y += Math.min(bottom, Math.max(top, this.guy.vy))

    if (bottom === 0) {
      this.guy.vy = upKey() ? -scale(1200) : 0
      if (upKey()) JUMP_FX.play()
    } else {
      this.guy.vy = Math.min(scale(600), this.guy.vy + scale(120))
    }

    if (this.lost()) {
      this.death()
    } else if (this.guy.overlaps(this.goal)) {
      this.advance()
    }
  }
}

const scene = new Scene(levels)

const toggle = () => {
  scene.on = !scene.on
  if (scene.on) OFF_FX.play()
  if (!scene.on) ON_FX.play()
}

document.addEventListener('keydown', (event) => {
  if (!controls.hidden) controls.keydown(event)
  else if (!title.hidden) title.keydown(event)

  if (event.key === ' ') toggle()
})

onPress(1, toggle)

const controls = new Controls(document.getElementById('controls'), () => {
  controls.hidden = true
  title.hidden = false
})

const dialog = document.getElementById('dialog')
const editor = new Editor([[[100, 300], [500, 300], [[84,361,362,48,1]], [[446,401,176,8,1,"up"]]]])

const title = new Title({
  start: () => {
    title.hidden = true
    scene.index = 0
    scene.hidden = false
  },
  controls: () => {
    title.hidden = true
    controls.hidden = false
  },
  edit: () => {
    title.hidden = true
    editor.hidden = false
    dialog.hidden = false
  }
})

const level = new URL(window.location).searchParams.get('level')
if (level) {
  try {
    scene.levels = [JSON.parse(level)]
    title.start()
  } catch (error) {}
}

let previous = 0
requestAnimationFrame(function tick (time) {
  // To deal with different frame rates, we define per-second speeds and adjust
  // them according to the time since the last frame was rendered.
  const duration = time - previous
  scene.tick((value) => Math.round(value * duration / 1000))
  controls.tick()
  previous = time
  requestAnimationFrame(tick)
})
