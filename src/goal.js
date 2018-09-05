import Body from './body.js'

export default class Goal extends Body {
  constructor () {
    super(document.getElementById('goal'))
    this.width = 22
    this.height = 20
  }
}
