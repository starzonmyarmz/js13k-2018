const KEYS = {}

document.addEventListener('keydown', (event) => {
  KEYS[event.key] = true
})

document.addEventListener('keyup', (event) => {
  KEYS[event.key] = false
})

export default KEYS
