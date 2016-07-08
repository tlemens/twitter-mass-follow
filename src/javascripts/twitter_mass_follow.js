import Button from './button.js'
import Profile from './profile.js'

class TwitterMassFollow {
  constructor() {
  }
  load() {
    let xhttp = new XMLHttpRequest()
    xhttp.open('GET', chrome.extension.getURL('extension.html'), true)
    return new Promise((resolve, reject) => {
      xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4) {
          if (xhttp.status == 200) {
            this.element = document.createElement('div')
            this.element.className = 'tmf'
            this.element.innerHTML = xhttp.responseText
            document.body.appendChild(this.element)
            resolve()
          } else {
            reject(xhttp.statusText)
          }
        }
      }
      xhttp.send(null)
    })
  }
  showOrHide() {
    if ( Profile.present() ) {
      this.show()
    } else {
      this.hide()
    }
  }
  show() {
    this.userId = document.getElementById('user-dropdown').querySelectorAll('[data-user-id]')[0].dataset.userId
    this.element.classList.add('tmf--show')
  }
  hide() {
    this.element.classList.remove('tmf--show')
  }
}
export default TwitterMassFollow;
