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
          document.body.insertAdjacentHTML('beforeend', responseText);
          this.element = document.getElementById('tmf')
          this.settingsEl = document.getElementById('tmf-settings')
          this.modalOverlayEl = document.getElementsByClassName('modal-overlay')[0]
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
  showSettings() {
    this.settingsEl.style.display = 'block'
    this.modalOverlayEl.style.display = 'block'
  }
  hideSettings() {
    this.settingsEl.style.display = 'none'
    this.modalOverlayEl.style.display = 'none'
  }
  _init() {
    try {
      this.userId = document.getElementById('user-dropdown').querySelectorAll('[data-user-id]')[0].dataset.userId
      this.element.classList.remove('tmf--initial')
      this._addSetting(TextSetting, 'followWait', 1000)
      this._addSetting(CheckboxSetting, 'followSkipUnfollowed', true)
      this._addSetting(CheckboxSetting, 'followProfileImageRequired', false)
      this._addSetting(TextSetting, 'followBlacklist', '@handle1,@handle2')
      this._addSetting(TextSetting, 'unfollowWait', 100)
      this._addSetting(CheckboxSetting, 'unfollowSkipFollower', true)
      this._addSetting(TextSetting, 'unfollowBlacklist', '@handle1,@handle2')
      for (let el of document.getElementsByClassName('js-tmf-show-settings')) {
        el.addEventListener('click', () => { this.showSettings() })
      }
      for (let el of document.getElementsByClassName('js-tmf-hide-settings')) {
        el.addEventListener('click', () => { this.hideSettings() })
      }
      document.onkeydown = (e) => {
        if (e.key === 'Escape') {
          this.hideSettings()
        }
      }
    }
    catch(err) {
      console.log(err)
      this.element.classList.add('tmf--initial')
    }
  }
  _addSetting(klass, ID, defaultValue) {
    this.settings[ID] = new klass(ID, defaultValue)
  }
}

export default TwitterMassFollow;
