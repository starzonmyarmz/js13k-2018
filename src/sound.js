const ac = new AudioContext()

export const MUSIC_LOW_A = new TinyMusic.Sequence(ac, 100, [
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

export const MUSIC_MID_A = new TinyMusic.Sequence(ac, 100, [
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

export const MUSIC_HIGH_A = new TinyMusic.Sequence(ac, 100, [
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

export const MUSIC_LOW_B = new TinyMusic.Sequence(ac, 100, [
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

export const MUSIC_MID_B = new TinyMusic.Sequence(ac, 100, [
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

export const MUSIC_HIGH_B = new TinyMusic.Sequence(ac, 100, [
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

MUSIC_LOW_A.play()
MUSIC_MID_A.play()
MUSIC_HIGH_A.play()
MUSIC_LOW_B.play()
MUSIC_MID_B.play()
MUSIC_HIGH_B.play()



//  Sound Effects

export const JUMP_FX = new TinyMusic.Sequence(ac, 280, [
  'Bb3 e',
  'G5 e',
  'Bb4 e'
])

export const GOAL_FX = new TinyMusic.Sequence(ac, 280, [
  'G3 0.125',
  'Ab3 0.125',
  'A3 0.125',
  'Bb3 0.125',
  'B3 0.125',
  'C4 0.125',
  'Db4 0.125',
  'D4 0.125',
  'Eb4 0.125',
  'E4 0.125',
  'F4 0.125',
  'Gb4 0.125',
  'G4 w'
])

export const DEATH_FX = new TinyMusic.Sequence(ac, 280, [
  'Bb3 e',
  'Bb2 q'
])

JUMP_FX.loop = false
GOAL_FX.loop = false
DEATH_FX.loop = false

JUMP_FX.smoothing = 1
GOAL_FX.smoothing = 0.2
DEATH_FX.smoothing = 0.5

GOAL_FX.staccato = 0.1

DEATH_FX.waveType = 'sawtooth'

DEATH_FX.bass.gain.value = 10

JUMP_FX.gain.gain.value = 0.4
GOAL_FX.gain.gain.value = 0.4
DEATH_FX.gain.gain.value = 0.4
