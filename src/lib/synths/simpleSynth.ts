import * as Tone from 'tone'

export const simpleSynth = () => {
  const reverb = new Tone.Reverb({
    decay: 60,
    wet: 0.75,
  }).toDestination();

  const delay2 = new Tone.PingPongDelay("12n", .3).toDestination();
  const vibrato = new Tone.Vibrato("4n", 0.8).toDestination();
  
  const synth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 5,
    detune: 1,
    modulationEnvelope: {
      attack: 0.25,
      decay: 0.9,
      release: 0.5,
      sustain: 1,
    },
    envelope: {
      attack: 0.24,
      decay: .9,
      release: 1,
      sustain: 1,
    },
    modulation: {
      type: "sine"
    },
  }).connect(vibrato).connect(reverb).connect(delay2).toDestination();

  return synth
}
