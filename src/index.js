import "./scss/main.scss";
import * as Tone from 'tone'

const delay = new Tone.PingPongDelay("2n", 0.8).toDestination();
const synth = new Tone.Synth().connect(delay).toDestination();
/** THR GRAM */
// alert(`ђคгקร Hαɾρʂ ɦǟʀքֆ ᏂᏗᏒᎮᏕ ɧąཞ℘ ʂhคrpŞ`)

let initialized = false
var keyCount = 20

const notes = [
  'Cb5',
  'D5',
  'E5',
  'F5',
  'G5',
  'A5',
  'B5',
  'C3',
  'Db3',
  'E#3',
  'F3',
  'G3',
  'A3',
  'B3',
  'C4',
  'D4',
  'E4',
  'F4',
  'G#4',
  'A4',
  'B4',
]

function init() {
  console.log('init')
  initialized = false
}


function pluckHandler(e) {
  if (e && e.target.dataset.note) {
    if (!initialized) {
      initialized = true
      Tone.start()
    } else {
      const note = notes[e.target.dataset.note - 1]
      const now = Tone.now()
      console.log('𝓃𝑜𝓉𝑒𝓈 𝓃𝑜𝓉𝑒𝓈 𝓃𝑜𝓉𝑒𝓈s', now, note)
      synth.triggerAttackRelease(note, "10n", now + e.target.dataset.note);
    }
  }
}

function releaseHandler(e) {
  if (e && e.target.dataset.note) {
    // console.log('release', e.target.dataset.note)
  }
}

/** 
 * Lets string up the harp....
 * 𝓃𝑜𝓉𝑒𝓈 𝓃𝑜𝓉𝑒𝓈 𝓃𝑜𝓉𝑒𝓈
*/
while (keyCount--) {
  window['harpString' + (keyCount + 1)] = document.querySelector(`.key-${keyCount + 1}`)
  window['harpString' + (keyCount + 1)].addEventListener("mouseover", pluckHandler, false )
  window['harpString' + (keyCount + 1)].addEventListener("mouseleave", releaseHandler, false)
}


init()