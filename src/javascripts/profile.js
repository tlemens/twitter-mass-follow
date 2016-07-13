let nth = 0
let attempts = 0

class Profile {
  static present() {
    nth = 0
    return (CardProfile.present() || StreamProfile.present())
  }
  static next() {
    console.log('Profile.next()')
    return new Promise((resolve, reject) => {
      let klass = CardProfile.present() ? CardProfile : StreamProfile
      let element = klass.all()[nth]
      console.log('nth:' + nth)
      if ( element ) {
        resolve(new klass(element))
        nth++
        attempts = 0
      } else {
        attempts++
        reject(attempts)
      }
    })
  }
  static reset() {
    console.log('Profile.reset()')
    nth = 0
    attempts = 0
  }
  constructor(element) {
    this.element = element
    this.btn = this.element.getElementsByClassName('user-actions-follow-button')[0]
    this.recordId = this.element.dataset.userId + '-'
    console.log(this.toString())
  }
  isFollowable() {
    return this.element.getElementsByClassName('user-actions')[0].classList.contains('not-following')
  }
  isFollowed() {
    return this.element.getElementsByClassName('user-actions')[0].classList.contains('following')
  }
  follow(options) {
    console.log('follow')
    console.log(options)
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
      } else {
        this.clickBtn()
        this.log('success', 'Successfully followed')
        return true
      }
    } else {
      console.log('not Followable')
      return false
    }
  }
  unfollow(options) {
    console.log('unfollow')
    console.log(options)
    if ( this.isFollowed() ) {
      if ( options.blacklisted ) {
        this.log('warn', 'User is blacklisted')
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
    console.log('profile.btnClicked')
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
  isFollowing() {
    return this.element.getElementsByClassName('FollowStatus').length
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
    return StreamProfile.all().length > 3
  }
  isFollowing() {
    // FIXME
    return false
  }
  get bioEl() {
    return this.element.getElementsByClassName('bio')[0]
  }
  get username() {
    return this.element.getElementsByClassName('username')[0].textContent.trim()
  }
}

export default Profile;
