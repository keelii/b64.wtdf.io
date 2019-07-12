import Utf8 from 'crypto-js/enc-utf8'
import Base64 from 'crypto-js/enc-base64'
import Hex from 'crypto-js/enc-hex'
import sha256 from 'crypto-js/sha256';
import md5 from 'crypto-js/md5';

window.sha256 = sha256
window.md5 = md5

window.getType = () => {
    var match = location.href.match(/type=\w+/)
    if (match && match.length) {
        var type = match[0].split('=')[1]
        return type || 'def'
    }
    return 'def'
}

function init(el, type) {
    const leftEl = el.querySelector('.content-left')
    const rightEl = el.querySelector('.content-right')
    const encBtn = el.querySelectorAll('button')[0]
    const decBtn = el.querySelectorAll('button')[1]
    const getLeftContent = () => leftEl.innerText
    const getRightContent = () => rightEl.innerText
    const fnMap = {
        base64: Base64,
        hex: Hex,
        def: Base64,
    }

    window.Base64 = Base64

    encBtn.onclick = (str) => {
        let fn = fnMap[getType()]
        
        if (fn) {
            try {
                rightEl.innerText = fn.stringify(Utf8.parse(getLeftContent()))
                console.log(`Type: ${type}\nBefore: ${leftEl.innerText}\nAfter: ${rightEl.innerText}`)
            } catch(e) {
                rightEl.innerText = '[ERROR]' + e
            }
        }
    }
    decBtn.onclick = (str) => {
        let fn = fnMap[getType()]
        
        if (fn) {
            try {
                leftEl.innerText = fn.parse(getRightContent()).toString(Utf8)
                console.log(`Type: ${type}\nBefore: ${rightEl.innerText}\nAfter: ${leftEl.innerText}`)
            } catch(e) {
                leftEl.innerText = '[ERROR]' + e
            }
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    document.querySelector('.content-left').focus()
    document.querySelectorAll('#editor [data-type]')
        .forEach(el => init(el, el.getAttribute('data-type')))
})
