class Profile {
  
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
