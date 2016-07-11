let storage = chrome.storage.local

class StorageRecord {
  constructor(key) {
    this.key = key
  }
  get value() {
    return new Promise((resolve, reject) => {
      storage.get(this.key, (result) => {
        if ( result.hasOwnProperty(this.key) ) {
          resolve(result[this.key])
        }
      })
    })
  }
  save() {
    let object = {}
    object[this.key] = this._value
    storage.set(object)
  }
}

export default StorageRecord

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
