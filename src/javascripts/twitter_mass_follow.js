import Button from './button.js'
import Profile from './profile.js'
import get from './xhttp_helper.js'

class TwitterMassFollow {
  constructor() {
  }
  load() {
    return new Promise((resolve, reject) => {
      get(chrome.extension.getURL('extension.html'))
        .then((responseText) => {
          this.element = document.createElement('div')
          this.element.className = 'tmf tmf--initial'
          this.element.innerHTML = responseText
          document.body.appendChild(this.element)
          resolve()
        })
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
    this._init()
    this.element.classList.remove('tmf--hide')
    this.element.classList.add('tmf--show')
  }
  hide() {
    this.element.classList.remove('tmf--show')
    this.element.classList.add('tmf--hide')
  }
  _init() {
    try {
      this.userId = document.getElementById('user-dropdown').querySelectorAll('[data-user-id]')[0].dataset.userId
      this.element.classList.remove('tmf--initial')
      // Bind everything
    }
    catch(err) {
      this.element.classList.add('tmf--initial')
    }
  }
}

export default TwitterMassFollow;
