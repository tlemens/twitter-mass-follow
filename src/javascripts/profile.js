let nth = 0

class Profile {
  static present() {
    nth = 0
    return (CardProfile.present() || StreamProfile.present())
  }
  static next() {
    let klass = CardProfile.present() ? CardProfile : StreamProfile
    new klass(klass.all()[nth])
  }
  constructor() {
    if ( this.isLoaded() ) {
      nth++
      this.btn = this.element.getElementsByClassName('user-actions-follow-button')[0]
      this.userId = this.element.dataset.userId
    }
  }
  isLoaded() {
    return typeof(this.element) === 'object'
  }
  isNotFollowing() {
    return !this.isFollowing();
  }
  isFollowable() {
    return this.btn.getElementsByClassName('follow-text')[0].style.display === 'block'
  }
  isFollowed() {
    return this.btn.getElementsByClassName('following-text')[0].style.display === 'block'
  }
  follow() {
    if ( this.isFollowable() ) {
      if ( settings.follow.blacklist.includes(this.userId) ) {
        this.log('warn', 'User is blacklisted');
      } else if ( settings.follow.withoutException || unfollowed.includes(this.userId) ) {
        this.clickBtn()
        this.log('success', 'Successfully followed')
        return true
      } else {
        this.log('warn', 'Already unfollowed once');
      }
    }
    return false
  }
  unfollow() {
    if ( this.isFollowed() ) {
      if ( settings.unfollow.blacklist.includes(this.userId) ) {
        this.log('warn', 'User is blacklisted');
      } else if ( settings.unfollow.withoutException || this.isNotFollowing() ) {
        this.clickBtn()
        this.log('success', 'Successfully unfollowed')
        unfollowed.add(this.userId)
        return true
      }
    }
    return false
  }
  clickBtn() {
    this.btn.click()
  }
  log(type, text) {
    let el = document.createElement('div')
    el.className = `tmf-log tmf-log--${type}`
    el.innerHTML = text
    let bioEl = this.getBioElement()
    bioEl.parentNode.insertBefore(el, bioEl)
  }
}

class CardProfile extends Profile {
  static all() {
    return document.getElementsByClassName('ProfileCard')
  }
  static present() {
    CardProfile.all().length > 8
  }
  isFollowing() {
    return this.element.getElementsByClassName('FollowStatus').length
  }
  getBioElement() {
    return this.element.getElementsByClassName('ProfileCard-bio')[0]
  }
}

class StreamProfile extends Profile {
  static all() {
    return document.getElementsByClassName('account')
  }
  static present() {
    StreamProfile.all().length > 3
  }
  isFollowing() {
    throw "Not implemented!";
  }
  getBioElement() {
    return this.element.getElementsByClassName('bio')[0]
  }
}

export default Profile;
/*
function Profile(nth) {
  this.$el = $('.ProfileCard:eq(' + nth + ')');
  if ( this.isLoaded() ) {
    this.$btn = this.$el.find('.user-actions-follow-button');
    this.id = this.$el.data('user-id') + '-';
  }
}

$.extend(Profile.prototype, {
  isLoaded: function() {
    return this.$el.isPresent();
  },
  isFollowing: function() {
    return this.$el.find('.FollowStatus').isPresent();
  },
  isNotFollowing: function() {
    return !this.isFollowing();
  },
  isFollowable: function() {
    return this.$btn.children('.follow-text').is(':visible');
  },
  isFollowed: function() {
    return this.$btn.children('.following-text').is(':visible');
  },
  follow: function() {
    if ( this.isFollowable() ) {
      if ( tmf.withoutException || !Record.includes(this.id) ) {
        this.click();
        tmf.followBtn.incrementCount();
      } else {
        this.log('warn', 'Already unfollowed once');
      }
    }
  },
  unfollow: function() {
    if ( this.isFollowed() ) {
      if ( tmf.withoutException || this.isNotFollowing() ) {
        this.click();
        tmf.unfollowBtn.incrementCount();
        Record.add(this.id);
      }
    }
  },
  click: function() {
    this.log('success', 'Clicked on "' + this.$btn.children(':visible').text().trim() + '"');
    this.$btn.click();
    this.clicked = true;
  },
  log:  function(type, text) {
    $('<div>')
      .addClass('tmf-log')
      .addClass('tmf-log--' + type)
      .text(text)
      .insertBefore(this.$el.find('.ProfileCard-bio'));
  }
});
*/
