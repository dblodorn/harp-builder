import "./scss/main.scss";

/** THR GRAM */
// alert(`ђคгקร Hαɾρʂ ɦǟʀքֆ ᏂᏗᏒᎮᏕ ɧąཞ℘ ʂhคrpŞ`)

var keyCount = 20

function pluck(e) {
  console.log(e.target.dataset.note)
}

function release(e) {
  console.log(e.target.dataset.note)
}

/** 
 * Lets string up the harp....
 * 𝓃𝑜𝓉𝑒𝓈 𝓃𝑜𝓉𝑒𝓈 𝓃𝑜𝓉𝑒𝓈
*/
while (keyCount--) {
  window['harpString' + (keyCount + 1)] = document.querySelector(`.key-${keyCount + 1}`)
  window['harpString' + (keyCount + 1)].addEventListener("mouseover", pluck, false )
  window['harpString' + (keyCount + 1)].addEventListener("mouseleave", release, false)
}

console.log(window.harpString1.dataset)