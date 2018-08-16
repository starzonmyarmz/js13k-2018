const svg = document.querySelector('svg')
const WIDTH = 768
const HEIGHT = 480

const KEYS = {}
document.addEventListener('keydown', ({key}) => { KEYS[key] = true })
document.addEventListener('keyup', ({key}) => { KEYS[key] = false })

class Guy {
  constructor (element) {
    this.element = element
    this.speed = 5
    this.height = 48
    this.width = 26
    this.x = Math.round(WIDTH / 2)
    this.y = 320
    this.vy = 0
  }

  tick () {
    if (KEYS.ArrowLeft) this.x -= this.speed
    if (KEYS.ArrowRight) this.x += this.speed

    if (this.x < 0) this.x = 0
    if (this.x > WIDTH - this.width) this.x = WIDTH - this.width

    if (KEYS.ArrowLeft) this.element.classList.add('left')
    if (KEYS.ArrowRight) this.element.classList.remove('left')

    if (KEYS.ArrowUp && this.y === ground.y - this.height) this.vy = 15

    if (this.y <= ground.y - this.height && this.y - this.vy >= ground.y - this.height && this.x >= ground.x && this.x <= ground.x + ground.width) {
      this.y = ground.y - this.height
      this.vy = 0
    } else {
      this.y -= this.vy
      this.vy -= 2
      if (this.vy < -10) this.vy = -10
    }

    this.element.classList.toggle('walk', KEYS.ArrowLeft || KEYS.ArrowRight)
    this.element.setAttribute('transform', `translate(${this.x}, ${this.y})`)
  }
}

class Ground {
  constructor (x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.element = document.createElementNS(svg.namespaceURI, 'rect')
    this.element.setAttribute('x', this.x)
    this.element.setAttribute('y', this.y)
    this.element.setAttribute('width', this.width)
    this.element.setAttribute('height', this.height)
  }
}

const guy = new Guy(document.getElementById('guy'))

const ground = new Ground(100, 400, 400, 16)
svg.appendChild(ground.element)

const tick = () => {
  guy.tick()
  requestAnimationFrame(tick)
}

requestAnimationFrame(tick)
