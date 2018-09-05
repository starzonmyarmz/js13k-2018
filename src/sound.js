const ac = new AudioContext()

export const JUMP_FX = new TinyMusic.Sequence(ac, 180, [
  'C4 e',
  'G5 e',
  'C5 e'
]);

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
]);

export const DEATH_FX = new TinyMusic.Sequence(ac, 180, [
  'E2 e',
  'E1 q'
]);

JUMP_FX.loop = false
JUMP_FX.smoothing = 1

GOAL_FX.loop = false
GOAL_FX.smoothing = 0.2
GOAL_FX.staccato = 0.1

DEATH_FX.loop = false
DEATH_FX.waveType = 'sawtooth'
DEATH_FX.bass.gain.value = 10;
DEATH_FX.smoothing = 0.5
