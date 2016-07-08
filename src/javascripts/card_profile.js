import Profile from './profile.js'

class CardProfile extends Profile {
  static isPresent() {
    return (document.getElementsByClassName('ProfileCard').length > 0)
  }
}

export default CardProfile;
