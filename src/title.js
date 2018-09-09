import Body from './body.js'

const START = 0
const CONTROLS = 1
const ITEMS = [START, CONTROLS]

export default class Title extends Body {
  constructor ({start}) {
    super(document.getElementById('title'))

    this.start = start
    this.items = [].slice.call(this.element.querySelectorAll('#menu .item'))

    this.selected = START

    document.addEventListener('keydown', this.keydown.bind(this))
  }

  keydown ({key}) {
    if (this.hidden) return

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
