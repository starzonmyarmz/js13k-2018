import Body from './body.js'

const START = 0
const CONTROLS = 1
const EDITOR = 2
const ITEMS = [START, CONTROLS, EDITOR]

export default class Title extends Body {
  constructor ({controls, edit, start}) {
    super(document.getElementById('title'))

    this.controls = controls
    this.edit = edit
    this.start = start
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
        this.start()
        break
      case EDITOR:
        this.edit()
        break
      case CONTROLS:
        this.controls()
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
