import TwitterMassFollow from './twitter_mass_follow.js'

let extension = new TwitterMassFollow()

extension.load().then(() => 
);

/*
$.fn.isPresent = function() {
  return this.length > 0;
}

var USER_ID = $('#user-dropdown').find('[data-user-id]').data('user-id');

var tmf = {
  init: function() {
    var self = this;
    self.$el = $('<div>').addClass('tmf animated').appendTo('body');
  },
  toggle: function() {
    var self = this;
    this.$el.removeClass('flipInY flipOutY tmf--active')
    if ( $('.ProfileCard').length > 10 ) {
      self.$el.load(chrome.extension.getURL('html/actions.html'), {}, function() {
        $('.tmf-btn').on('click', function() { self.$el.addClass('tmf--active') });
        self.followBtn = new Button($('.tmf-btn--follow'), function() {  this.follow(); }, 250);
        self.unfollowBtn = new Button($('.tmf-btn--unfollow'), function() {  this.unfollow(); }, 100);
        self.$el.addClass('flipInY');
        var messageObserver = new MutationObserver(function(mutations) {
          mutations.forEach(function(mutation) {
            var html = $('#message-drawer').html();
            // http://support.twitter.com/articles/66885-i-can-t-follow-people-follow-limits
            if ( html.includes('66885') ) {
              self.followBtn.setIdle();
            }
          });    
        });
        messageObserver.observe(document.getElementById('message-drawer'), { subtree: true, characterData: true, childList: true });
        $('#tmf_without_exception').on('change', function() {
          self.withoutException = this.checked;
          if ( this.checked ) {
            self.followBtn.$subtitle.text('without exception');
            self.unfollowBtn.$subtitle.text('without exception');
          } else {
            self.followBtn.$subtitle.text('who have never been unfollowed');
            self.unfollowBtn.$subtitle.text('who do not follow you');
          }
        });
      });
    } else {
      this.$el.addClass('flipOutY');
    }
  },
  withoutException: false
}

Record.get(function() {
  tmf.init();
  tmf.toggle();
});

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    tmf.toggle();
  });    
});
observer.observe(document.querySelector('head > title'), { subtree: true, characterData: true, childList: true });
*/
