import Body from './body.js'

const START = 0
const CONTROLS = 1
const EDITOR = 2
const ITEMS = [START, CONTROLS, EDITOR]

export default class Title extends Body {
  constructor (game) {
    super(document.getElementById('title'))
    this.game = game
    this.items = [].slice.call(this.element.querySelectorAll('.menu .item'))
    this.selected = START
  }

  keydown ({key}) {
    switch (key) {
      case 'ArrowUp':
        this.selected -= 1
        break
      case 'ArrowDown':
        this.selected += 1
        break
      case 'Enter':
        this.choose()
        break
    }
  }

  choose () {
    switch (this.selected) {
      case START:
        this.game.scene.index = 0
        this.game.scene.paused = false
        this.game.state = 'play'
        break
      case EDITOR:
        this.game.state = 'edit'
        break
      case CONTROLS:
        this.game.state = 'controls'
        break
    }
  }

  get selected () {
    return this._selected
  }

  set selected (value) {
    this._selected = Math.min(ITEMS.length - 1, Math.max(0, value || 0))

    this.items.forEach((item, index) => {
      item.classList.toggle('selected', index === this.selected)
    })
  }
}
