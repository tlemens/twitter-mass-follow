import Profile from './profile.js'

class StreamProfile extends Profile {
  static isPresent() {
    return (document.getElementsByClassName('account').length > 0)
  }
}

export default StreamProfile;
