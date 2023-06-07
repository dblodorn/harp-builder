import * as Tone from 'tone'

export function harp1() {
  const reverb = new Tone.Reverb({
    decay: 40,
    wet: 0.5,
  }).toDestination();

  const delay = new Tone.PingPongDelay("2n", 0.68).toDestination();

  const synth = new Tone.FMSynth({
    harmonicity: 1,
    modulationIndex: 20,
    detune: 0,
    modulationEnvelope: {
      attack: 0.01,
      decay: 0.9,
      release: 0.5,
      sustain: 0.272,
    },
    envelope: {
      attack: 0.964,
      decay: .9,
      release: 1,
      sustain: 0.9,
    },
    modulation: {
      type: "triangle19"
    },
  }).connect(delay).connect(reverb).toDestination();

  let initialized = false
  var keyCount = 20

  const notes = [
    'D3',
    'A3',
    'C3',
    'B3',
    'G3',

    'D4',
    'A4',
    'C4',
    'B4',
    'G4',

    'D5',
    'A5',
    'C5',
    'B5',
    'G5',

    'D6',
    'A6',
    'C6',
    'B6',
    'G6',
  ]

  const harpTitle = document.getElementById('harp-title')
  const startButton =  document.getElementById('harps')
  
  harpTitle.innerHTML = '♪ click 2 Start ♪'

  startButton.addEventListener('click', () => {
    if (!initialized) {
      initialized = true
      harpTitle.innerHTML = '♪ Harps ♪'
      Tone.start()
    } else {
      console.log('already initialized')
    }
  })

  function pluckHandler(e) {
    if (e && e.target.dataset.note) {
      const note = notes[e.target.dataset.note - 1]
      const now = Tone.now()
      console.log('𝓃𝑜𝓉𝑒𝓈 𝓃𝑜𝓉𝑒𝓈 𝓃𝑜𝓉𝑒𝓈s', now, note)
      synth.triggerAttackRelease(note, "10n", now + e.target.dataset.note);
    }
  }

  /** 
   * Lets string up the harp....
   * 𝓃𝑜𝓉𝑒𝓈 𝓃𝑜𝓉𝑒𝓈 𝓃𝑜𝓉𝑒𝓈
  */
  while (keyCount--) {
    window['harpString' + (keyCount + 1)] = document.querySelector(`.key-${keyCount + 1}`)
    window['harpString' + (keyCount + 1)].addEventListener("mouseover", pluckHandler, false )
    window['harpString' + (keyCount + 1)].addEventListener("mousedown", pluckHandler, false)
  }
}