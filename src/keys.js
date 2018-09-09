const DOWN = new Set

const NO_DEFAULT = new Set([
  'w',
  'a',
  's',
  'd',
  ' ',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight'
])

export let upKey = false
export let leftKey = false
export let rightKey = false

const update = () => {
  upKey = DOWN.has('w') || DOWN.has('ArrowUp')
  leftKey = DOWN.has('a') || DOWN.has('ArrowLeft')
  rightKey = DOWN.has('d') || DOWN.has('ArrowRight')
}

document.addEventListener('keydown', (event) => {
  DOWN.add(event.key)
  if (NO_DEFAULT.has(event.key)) event.preventDefault()
  update()
})

document.addEventListener('keyup', ({key}) => {
  DOWN.delete(key)
  update()
})
