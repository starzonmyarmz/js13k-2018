import {Note, Sequence} from './tinymusic.js'
const ac = new AudioContext()

export const MUSIC_LOW_A = new Sequence(ac, 100, [
  'B2 q',
  '- q',
  'Db3 q',
  '- q',
  'D3 q',
  '- q',
  'Gb3 q',
  'Bb3 q',
  'B2 q',
  '- q',
  'Db3 q',
  '- q',
  'D3 q',
  '- q',
  'Gb3 q',
  'B2 q',
  'B2 q',
  '- q',
  'Db3 q',
  '- q',
  'D3 q',
  '- q',
  'Gb3 q',
  'Bb3 q',
  'B2 q',
  '- q',
  'Db3 q',
  '- q',
  'D3 q',
  '- q',
  'Gb3 q',
  'B2 q',
  '- 32'
])

export const MUSIC_MID_A = new Sequence(ac, 100, [
  '- w',
  '- h',
  'D3 q',
  'Db3 q',
  '- w',
  '- h',
  'D3 q',
  'Gb3 q',
  '- w',
  '- h',
  'D3 q',
  'Db3 q',
  '- w',
  '- h',
  'D3 q',
  'Gb3 q',
  '- 32'
])

export const MUSIC_HIGH_A = new Sequence(ac, 100, [
  'B4 e',
  '- e',
  'Bb4 e',
  '- e',
  'A4 s',
  'A4 s',
  'Ab4 e',
  'G4 e',
  '- e',
  'Gb4 s',
  'B4 s',
  'Gb4 e',
  'D4 e',
  'B3 e',
  'D4 e',
  '- e',
  'Db4 e',
  '- e',
  'B4 e',
  '- e',
  'Bb4 e',
  '- e',
  'A4 s',
  'A4 s',
  'Ab4 e',
  'G4 e',
  '- e',
  'Gb4 s',
  'B4 s',
  'Gb4 e',
  'D4 e',
  'B3 e',
  'D4 e',
  'Db4 e',
  'B3 e',
  '- e',
  'B4 e',
  '- e',
  'Bb4 e',
  '- e',
  'A4 s',
  'A4 s',
  'Ab4 e',
  'G4 e',
  '- e',
  'Gb4 s',
  'B4 s',
  'Gb4 e',
  'D4 e',
  'B3 e',
  'D4 e',
  '- e',
  'Db4 e',
  '- e',
  'B4 e',
  '- e',
  'Bb4 e',
  '- e',
  'A4 s',
  'A4 s',
  'Ab4 e',
  'G4 e',
  '- e',
  'Gb4 s',
  'B4 s',
  'Gb4 e',
  'D4 e',
  'B3 e',
  'D4 e',
  'Db4 e',
  'B3 e',
  '- e',
  '- 32'
])

export const MUSIC_LOW_B = new Sequence(ac, 100, [
  '- 32',
  'G3 e',
  'E3 e',
  'D3 e',
  'C3 e',
  'A2 e',
  'G2 e',
  'C2 e',
  'Bb2 e',
  'B2 e',
  'Db3 e',
  'D3 e',
  'E3 e',
  'Gb3 e',
  'G3 e',
  'Gb3 e',
  'Bb2 e',
  'G3 e',
  'E3 e',
  'D3 e',
  'C3 e',
  'A2 e',
  'G2 e',
  'C2 e',
  'Bb2 e',
  'B2 e',
  'Db3 e',
  'D3 e',
  'E3 e',
  'D3 e',
  'Db3 e',
  'B2 e',
  '- e',
  'G3 e',
  'E3 e',
  'D3 e',
  'C3 e',
  'A2 e',
  'G2 e',
  'C2 e',
  'Bb2 e',
  'B2 e',
  'Db3 e',
  'D3 e',
  'E3 e',
  'Gb3 e',
  'G3 e',
  'Gb3 e',
  'Bb2 e',
  'G3 e',
  'E3 e',
  'D3 e',
  'C3 e',
  'A2 e',
  'G2 e',
  'C2 e',
  'Bb2 e',
  'B2 e',
  'Db3 e',
  'D3 e',
  'E3 e',
  'D3 e',
  'Db3 e',
  'B2 e',
  '- e'
])

export const MUSIC_MID_B = new Sequence(ac, 100, [
  '- 32',
  'G4 w',
  'Gb4 w',
  'G4 w',
  'Gb4 w',
  'G4 w',
  'Gb4 w',
  'G4 w',
  'Gb4 w'
])

export const MUSIC_HIGH_B = new Sequence(ac, 100, [
  '- 32',
  'C4 w',
  'D4 w',
  'C4 w',
  'D4 w',
  'C4 w',
  'D4 w',
  'C4 w',
  'D4 w'
])

export const MUSIC_WINNING_LOW = new Sequence(ac, 200, [
  'C3 q',
  '- q',
  'G3 q',
  '- q',
  'C3 q',
  '- q',
  'G3 q',
  'G2 q',
  'C3 q',
  '- q',
  'G3 q',
  '- q',
  'B2 q',
  '- q',
  'B2 q',
  'A2 q',
  'G2 q',
  '- h',
  '- q',
  'E3 q',
  '- h',
  '- q',
  'G2 q',
  '- w',
  '- h',
  'B2 q'
])

export const MUSIC_WINNING_HIGH = new Sequence(ac, 200, [
  'G4 e',
  'Gb4 e',
  'G4 e',
  'Gb4 e',
  'G4 q',
  'A4 q',
  'G4 h',
  'C4 q',
  'E4 q',
  'G4 e',
  'Gb4 e',
  'G4 e',
  'Gb4 e',
  'G4 q',
  'E4 q',
  'F4 h',
  'D4 q',
  'E4 q',
  'F4 e',
  'E4 e',
  'F4 e',
  'E4 e',
  'F4 q',
  'G4 q',
  'E4 e',
  'D4 e',
  'E4 e',
  'D4 e',
  'E4 q',
  'F4 q',
  'G3 e',
  'A3 e',
  'B3 e',
  'C4 e',
  'D4 e',
  'E4 e',
  'F4 e',
  'E4 e',
  'D4 e',
  'C4 e',
  'B3 e',
  'A3 e',
  'G3 q',
  'E4 q'
])

MUSIC_WINNING_LOW.staccato = 0.3
MUSIC_WINNING_HIGH.staccato = 0.5

MUSIC_WINNING_LOW.waveType = 'sine'

MUSIC_WINNING_LOW.gain.gain.value = 0.7
MUSIC_WINNING_HIGH.gain.gain.value = 0.3


MUSIC_LOW_A.staccato = 0.5
MUSIC_LOW_B.staccato = 0.3
MUSIC_MID_A.staccato = 0.5
MUSIC_HIGH_A.staccato = 0.5

MUSIC_LOW_A.waveType = 'sine'
MUSIC_LOW_B.waveType = 'sine'
MUSIC_MID_A.waveType = 'sine'

MUSIC_LOW_A.gain.gain.value = 0.4
MUSIC_LOW_B.gain.gain.value = 0.6
MUSIC_MID_A.gain.gain.value = 0.4
MUSIC_HIGH_A.gain.gain.value = 0.4

// Fade the Mid/High B in and out

let fade = 1
let direction = 'up'

setInterval(function() {
  if (direction === 'up') {
    fade += 1
    if (fade > 9) {
      direction = 'down'
      fade -= 1
    }
  }

  if (direction === 'down') {
    fade -= 1
    if (fade < 1) {
      direction = 'up'
      fade += 2
    }
  }

  MUSIC_MID_B.gain.gain.value = fade * 0.01
  MUSIC_HIGH_B.gain.gain.value = fade * 0.01
}, 300)

export const playMusic = () => {
  MUSIC_LOW_A.play()
  MUSIC_MID_A.play()
  MUSIC_HIGH_A.play()
  MUSIC_LOW_B.play()
  MUSIC_MID_B.play()
  MUSIC_HIGH_B.play()
  MUSIC_WINNING_LOW.stop()
  MUSIC_WINNING_HIGH.stop()
}

export const playWin = () => {
  MUSIC_LOW_A.stop()
  MUSIC_MID_A.stop()
  MUSIC_HIGH_A.stop()
  MUSIC_LOW_B.stop()
  MUSIC_MID_B.stop()
  MUSIC_HIGH_B.stop()
  MUSIC_WINNING_LOW.play()
  MUSIC_WINNING_HIGH.play()
}

playMusic()

//  Sound Effects

export const JUMP_FX = new Sequence(ac, 320, [
  'Bb3 e',
  'G5 e',
  'Bb4 e'
])

export const ON_FX = new Sequence(ac, 400, [
  'Bb6 e',
  'D6 e'
])

export const OFF_FX = new Sequence(ac, 400, [
  'D6 e',
  'Bb6 e'
])

export const GOAL_FX = new Sequence(ac, 280, [
  'C4 s',
  'G4 s',
  'C5 h'
])

export const DEATH_FX = new Sequence(ac, 280, [
  'Bb3 e',
  'Bb2 q'
])

JUMP_FX.loop = false
GOAL_FX.loop = false
DEATH_FX.loop = false
ON_FX.loop = false
OFF_FX.loop = false

JUMP_FX.smoothing = 1
DEATH_FX.smoothing = 0.5

GOAL_FX.staccato = 0.2
ON_FX.staccato = 0.5
OFF_FX.staccato = 0.5

DEATH_FX.waveType = 'sawtooth'

DEATH_FX.bass.gain.value = 10

JUMP_FX.gain.gain.value = 0.3
GOAL_FX.gain.gain.value = 0.6
DEATH_FX.gain.gain.value = 0.4
ON_FX.gain.gain.value = 0.3
OFF_FX.gain.gain.value = 0.3
