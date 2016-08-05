import get from './xhttp_helper.js'

let nth = 0
let attempts = 0

class Profile {
  static present() {
    nth = 0
    return (CardProfile.present() || StreamProfile.present())
  }
  static next() {
    return new Promise((resolve, reject) => {
      let klass = CardProfile.present() ? CardProfile : StreamProfile
      let element = klass.all()[nth]
      if ( element ) {
        let profile = new klass(element)
        if ( profile.isMyProfile() ) {
          nth++
          reject(attempts)
        } else if ( profile.isStream() ) {
          profile.setIsFollowing().then(() => {
            resolve(profile)
            nth++
            attempts = 0
          })
        } else {
          resolve(profile)
          nth++
          attempts = 0
        }
      } else {
        attempts++
        reject(attempts)
      }
    })
  }
  static reset() {
    nth = 0
    attempts = 0
  }
  constructor(element) {
    this.element = element
    this.btn = this.element.getElementsByClassName('user-actions-follow-button')[0]
    this.userId = this.element.dataset.userId
    this.recordId = this.userId + '-'
    console.log(this.toString())
  }
  isMyProfile() {
    return this.btn === undefined
  }
  isFollowable() {
    return this.element.getElementsByClassName('user-actions')[0].classList.contains('not-following')
  }
  isFollowed() {
    return this.element.getElementsByClassName('user-actions')[0].classList.contains('following')
  }
  follow(options) {
    if ( this.isFollowable() ) {
      if ( options.blacklisted ) {
        this.log('warn', 'User is blacklisted')
        return false
      } else if ( options.skipUnfollowed && options.unfollowed ) {
        this.log('warn', 'Already unfollowed once');
        return false
      } else if ( options.profileImageRequired && this.hasNoProfileImage() ) {
        this.log('warn', 'No profile image');
        return false
      } else if ( options.skipProtected && this.isProtected() ) {
        this.log('warn', 'Protected profile');
        return false
      } else if ( options.skipFollower && this.isFollowing() ) {
        this.log('warn', 'Allready following')
        return false
      } else {
        this.clickBtn()
        this.log('success', 'Successfully followed')
        return true
      }
    } else {
      return false
    }
  }
  unfollow(options) {
    console.log(this.isVerified())
    if ( this.isFollowed() ) {
      if ( options.blacklisted ) {
        this.log('warn', 'User is blacklisted')
        return false
      } else if ( options.skipVerified && this.isVerified() ) {
        this.log('warn', 'Account is verified')
        return false
      } else if ( options.skipFollower && this.isFollowing() ) {
        return false
      } else {
        this.clickBtn()
        this.log('success', 'Successfully unfollowed')
        return true
      }
    } else {
      return false
    }
  }
  clickBtn() {
    this.btn.click()
  }
  log(type, text) {
    let el = document.createElement('div')
    el.className = `tmf-log tmf-log--${type}`
    el.innerHTML = text
    let bioEl = this.bioEl
    bioEl.parentNode.insertBefore(el, bioEl)
  }
  hasNoProfileImage() {
    return this.element.getElementsByClassName('js-action-profile-avatar')[0].src.includes('default_profile')
  }
  isProtected() {
    return this.element.getElementsByClassName('Icon--protected').length > 0
  }
  isVerified() {
    return this.element.getElementsByClassName('Icon--verified').length > 0
  }
  toString() {
    return `${this.constructor.name} ${this.recordId} ${this.username}`
  }
}

class CardProfile extends Profile {
  static all() {
    return document.getElementsByClassName('ProfileCard')
  }
  static present() {
    return CardProfile.all().length > 8
  }
  isStream() {
    return false
  }
  isFollowing() {
    return this.element.getElementsByClassName('FollowStatus').length > 0
  }
  get bioEl() {
    return this.element.getElementsByClassName('ProfileCard-bio')[0]
  }
  get username() {
    return this.element.getElementsByClassName('ProfileCard-screennameLink')[0].textContent.trim()
  }
}

class StreamProfile extends Profile {
  static all() {
    return document.getElementsByClassName('account')
  }
  static present() {
    return StreamProfile.all().length > 5
  }
  isStream() {
    return true
  }
  setIsFollowing() {
    return new Promise((resolve, reject) => {
      get(`https://twitter.com/i/profiles/popup?user_id=${this.userId}&wants_hovercard=true`)
        .then((responseText) => {
          this._isFollowing = responseText.includes('FollowStatus')
          resolve()
        }, (statusText) => {
          this._isFollowing = false
          resolve()
        })
    })
  }
  isFollowing() {
    return this._isFollowing
  }
  get bioEl() {
    return this.element.getElementsByClassName('bio')[0]
  }
  get username() {
    return this.element.getElementsByClassName('username')[0].textContent.trim()
  }
}

export default Profile;
