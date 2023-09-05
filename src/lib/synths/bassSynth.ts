import * as Tone from 'tone'

export const bassSynth = () => {
  const reverb = new Tone.Reverb({
    decay: 30,
    wet: 0.15,
  }).toDestination();
  const vibrato = new Tone.Vibrato("4n", 0.8).toDestination();
  
  const synth = new Tone.MonoSynth({
    oscillator: {
      type: "square"
    },
    envelope: {
      attack: 0.1,
      decay: 1.5,
    },
  }).connect(vibrato).connect(reverb).toDestination();

  return synth
}
