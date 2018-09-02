const KEYS = {}
const NO_DEFAULT = [
  ' ',
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight'
]

document.addEventListener('keydown', ({key}) => {
  KEYS[key] = true
  if (NO_DEFAULT.includes(key)) event.preventDefault()
})

document.addEventListener('keyup', ({key}) => {
  KEYS[key] = false
})

export default KEYS
