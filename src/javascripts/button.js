/*
function Button($el, profileAction, interval) {
  var self = this;
  self.$el = $el;
  self.count = 0;
  self.$title = $el.find('.tmf-btn__title');
  self.$subtitle = $el.find('.tmf-btn__subtitle');
  self.action = new BulkAction(profileAction, interval);
  
  self.$el.on('click', function() {
    self.$el.addClass('tmf-btn--active');
    self.$title.text(self.count);
    if ( self.action.paused ) {
      self.action.proceed();
      self.$subtitle.text('Click to pause');
    } else {
      self.action.pause();
      self.$subtitle.text('Click to continue');
    }
  });
}
$.extend(Button.prototype, {
  incrementCount: function() {
    this.count++;
    this.$title.text(this.count);
  },
  setIdle: function() {
    var self = this;
    if ( !self.action.paused ) {
      var count = 60;
      self.action.pause();
      var countDown = setInterval(function() {
        if ( self.action.paused ) {
          self.$subtitle.text('Continuing in ' + count + ' seconds...');
          if ( 0 == count ) {
            clearInterval(countDown);
            $('#message-drawer').find('.message-text').text("");
            self.$el.click();
          } else {
            count--;
          }
        } else {
          clearInterval(countDown);
        }
      }, 1000);
    }
  }
});
*/
