/*
function BulkAction(callback, interval) {
  this.callback = callback;
  this.interval = interval;
  this.paused = true;
}

$.extend(BulkAction.prototype, {
  nth:  0,
  loadAttempts: 0,
  _loadProfiles: function() {
    if ( this.loadAttempts < 10 ) {
      this.last.$btn.focus();
      this.loadAttempts++;
      this._sleep(700);
    }
  },
  _sleep: function(milliseconds) {
    var self = this;
    setTimeout(function() { self.run(); }, milliseconds);
  },
  run: function() {
    if ( this.paused ) {
      return;
    }
    var profile = new Profile(this.nth);
    if ( profile.isLoaded() ) {
      this.loadAttempts = 0;
      this.callback.call(profile);
      this.last = profile;
      this.nth++;
      if ( profile.clicked ) {
        this._sleep(this.interval);
      } else {
        this.run();
      }
    } else {
      this._loadProfiles();
    }
  },
  pause: function() {
    this.paused = true;
  },
  proceed: function() {
    this.paused = false;
    this.run();
  }
});
*/
