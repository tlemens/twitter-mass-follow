import Button from './button.js'
import Profile from './profile.js'
import get from './xhttp_helper.js'
import { CheckboxSetting, TextSetting } from './setting.js'

class TwitterMassFollow {
  constructor() {
    this.settings = {}
  }
  load() {
    return new Promise((resolve, reject) => {
      get(chrome.extension.getURL('extension.html'))
        .then((responseText) => {
          this.element = document.createElement('aside')
          this.element.className = 'tmf tmf--initial'
          this.element.innerHTML = responseText
          document.body.appendChild(this.element)
          resolve()
        })
    })
  }
  showOrHide() {
    console.log('showOrHide')
    if ( Profile.present() ) {
      console.log('show')
      this.show()
    } else {
      this.hide()
    }
  }
  show() {
    this._init()
    this.element.classList.remove('tmf--hide')
    this.element.classList.add('tmf--show')
    document.getElementById('tmfLogo').src = chrome.extension.getURL("icon128.png")
  }
  hide() {
    this.element.classList.remove('tmf--show')
    this.element.classList.add('tmf--hide')
  }
  _init() {
    try {
      this.userId = document.getElementById('user-dropdown').querySelectorAll('[data-user-id]')[0].dataset.userId
      this.element.classList.remove('tmf--initial')
      this._addSetting(CheckboxSetting, 'followWithoutException', false)
      this._addSetting(TextSetting, 'followWait', 1000)
      this._addSetting(TextSetting, 'followBlacklist', '@handle1,@handle2')
      this._addSetting(CheckboxSetting, 'unfollowWithoutException', false)
      this._addSetting(TextSetting, 'unfollowWait', 100)
      this._addSetting(TextSetting, 'unfollowBlacklist', '@handle1,@handle2')
      // Bind everything
    }
    catch(err) {
      this.element.classList.add('tmf--initial')
    }
  }
  _addSetting(klass, ID, defaultValue) {
    this.settings[ID] = new klass(ID, defaultValue)
  }
}

export default TwitterMassFollow;
