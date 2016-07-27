import Button from './button.js'
import Profile from './profile.js'
import Unfollowed from './unfollowed.js'
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
      .then(() => {
        this.element.classList.remove('tmf--initial')
        this.element.classList.remove('tmf--hide')
        this.element.classList.remove('tmf--follow')
        this.element.classList.remove('tmf--unfollow')
        this.element.classList.remove('tmf--error')
        this.element.classList.add('tmf--show')
      }, (errorMessage) => {     
        this.error = errorMessage
      })
  }
  set error(newError) {
    this.element.getElementsByClassName('tmf__error')[0].innerHTML = newError
    this.element.classList.remove('tmf--initial')
    this.element.classList.remove('tmf--hide')
    this.element.classList.add('tmf--error')
    this.element.classList.add('tmf--show')
  }
  hide() {
    this.element.classList.remove('tmf--show')
    this.element.classList.add('tmf--hide')
  }
  _showSettings() {
    this.settingsEl.style.display = 'block'
    this.modalOverlayEl.style.display = 'block'
    this.element.style.zIndex = 3999
  }
  _hideSettings() {
    this.settingsEl.style.display = 'none'
    this.modalOverlayEl.style.display = 'none'
    this.element.style.zIndex = 9999
  }
  wait() {
    this.waiting = true
    this.activeBtn.countDown(this._setting('extensionWait')).then(() => { 
      this.waiting = false
      this.activeBtn.text = 'Click to pause'
      this._run()
    })
  }
  _reset() {
    this.activeBtn = undefined
    this.mode = undefined
    this.followBtn.title = 'Follow All'
    this.followBtn.text = ''
    this.unfollowBtn.title = 'Unfollow All'
    this.unfollowBtn.text = ''
    Profile.reset()
    return true;
  }
  _init() {
    return new Promise((resolve, reject) => {
      this.count = 0
      this.paused = false
      this.waiting = false
      if (this.userId) {
        this._reset()
        resolve()
      } else {
        try {
          this.userId = document.getElementById('user-dropdown').querySelectorAll('[data-user-id]')[0].dataset.userId.toString()
          this._setButtons()
          this._initSettings()
          this.unfollowed = new Unfollowed(this.userId)
          this.unfollowed.load().then(() => { resolve() })
        }
        catch(err) {
          reject(err)
        }
      }
    })
  }
  _initSettings() {
    this._addSetting(TextSetting, 'followWait', 1000)
    this._addSetting(TextSetting, 'followLimit', 1000)
    this._addSetting(CheckboxSetting, 'followSkipUnfollowed', true)
    this._addSetting(CheckboxSetting, 'followProfileImageRequired', false)
    this._addSetting(CheckboxSetting, 'followSkipProtected', false)
    this._addSetting(CheckboxSetting, 'followSkipFollower', false)
    this._addSetting(TextSetting, 'followBlacklist', '@username1,@username2')
    this._addSetting(TextSetting, 'unfollowWait', 100)
    this._addSetting(TextSetting, 'unfollowLimit', '')
    this._addSetting(CheckboxSetting, 'unfollowSkipFollower', true)
    this._addSetting(TextSetting, 'unfollowBlacklist', '@username1,@username2')
    this._addSetting(TextSetting, 'extensionWait', 1)
    let showElements = document.getElementsByClassName('tmf-show-settings')
    for (let i=0; i<showElements.length; i++) {
      showElements[i].addEventListener('click', () => { this._showSettings() })
    }
    let hideElements = document.getElementsByClassName('tmf-hide-settings')
    for (let i=0; i<hideElements.length; i++) {
      hideElements[i].addEventListener('click', () => { this._hideSettings() })
    }
    document.onkeydown = (e) => {
      if (e.key === 'Escape') {
        this._hideSettings()
      }
    }
  }
  _setButtons() {
    ['follow', 'unfollow'].forEach((mode) => {
      let btnEl = this.element.getElementsByClassName(`tmf-btn--${mode}`)[0]
      let btn = new Button(btnEl)
      btnEl.addEventListener('click', () => {
        if ( this.waiting ) {
          return false
        }
        if ( this.activeBtn ) {
          if ( this.paused ) {
            this.paused = false
            this._run()
            btn.text = 'Click to pause'
          } else {
            this.paused = true
            btn.text = 'Click to continue'
          }
        } else {
          this.activeBtn = btn
          this.mode = mode
          this.element.classList.add(`tmf--${mode}`)
          this.blacklist = this._setting(`${mode}Blacklist`).split(',')
          this.limit = parseInt(this._setting(`${mode}Limit`))
          btn.text = 'Click to pause'
          this._run()
        }
      })
      this[`${mode}Btn`] = btn
    })
  }
  _followProfile(profile) {
    let options = {
      blacklisted: this.blacklist.includes(profile.username),
      skipUnfollowed: this._setting('followSkipUnfollowed'),
      skipProtected: this._setting('followSkipProtected'),
      skipFollower: this._setting('followSkipFollower'),
      unfollowed: this.unfollowed.includes(profile.recordId),
      profileImageRequired: this._setting('followProfileImageRequired')
    }
    if ( profile.follow(options) ) {
      this.count++
      this.activeBtn.title = this.count
      this._sleep(this._setting('followWait'))
    } else {
      this._run()
    }
  }
  _unfollowProfile(profile) {
    let options = {
      blacklisted: this.blacklist.includes(profile.username),
      skipFollower: this._setting('unfollowSkipFollower')
    }
    if ( profile.unfollow(options) ) {
      this.unfollowed.add(profile.recordId)
      this.count++
      this.activeBtn.title = this.count
      this._sleep(this._setting('unfollowWait'))
    } else {
      this._run()
    }
  }
  _sleep(milliseconds) {
    setTimeout(() => { this._run() }, parseInt(milliseconds))
  }
  _isLimitReached() {
    return this.count === this.limit
  }
  _run() {
    if ( this.paused || this.waiting ) {
      return false
    }
    if ( this._isLimitReached() ) {
      this.activeBtn.text = 'Limit reached (see settings)'
      this.paused = true
      return false
    }
    Profile.next()
      .then((profile) => {
        this.currentProfile = profile
        this[`_${this.mode}Profile`](profile)
      }, (attempts) => {
        if ( attempts > 10 ) {
          this.activeBtn.text = 'No more profiles found'
          this.paused = true
        } else {
          this.currentProfile.btn.focus()
          this._sleep(1000)
        }
      })
  }
  _addSetting(klass, ID, defaultValue) {
    this.settings[ID] = new klass(ID, defaultValue)
  }
  _setting(ID) {
    return this.settings[ID]._value
  }
}

export default TwitterMassFollow;
