var unfollowed;
chrome.storage.local.get('tmf@wonnetrunken', function(result) {
  unfollowed = result['tmf@wonnetrunken'];
  //console.log(unfollowed);
});

$.extend(Profile.prototype, {
  oFollow:    Profile.prototype.follow,
  follow: function() {
    if ( unfollowed.includes(this.name()) ) {
      this.log('warn', 'Unfollowed by wonnetrunken');
      Record.add(this.id);
    } 
    this.oFollow();
  },
  name: function() {
    return '@' + this.$el.find('.u-linkComplex-target').text();
  }
});
