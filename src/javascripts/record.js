
/*
var Record = {
  storage:  chrome.storage.local,
  key:      USER_ID.toString(),  
  get:      function(success) {
    var self = this;
    this.storage.get(this.key, function(result) {
      self.result = result;
      success.call();
    });
  },
  set:      function() {
    this.storage.set(this.result);
  },
  add:      function(id) {
    if ( this.result[this.key] ) {
      this.result[this.key] += id;
    } else {
      this.result[this.key] = id;
    }
    this.set();
  },
  includes: function(id) {
    if ( this.result[this.key] ) {
      return this.result[this.key].includes(id);
    } else {
      return false;
    }
  }
}
*/
