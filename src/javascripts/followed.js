import StorageRecord from './storage_record.js'

class Followed {
  constructor(userId) {
    this.storage = new StorageRecord(userId)
  }
  load() {
    return new Promise((resolve, reject) => {
      this.storage.fetch()
        .then((storageValue) => {
          this.value = storageValue
          resolve()
        }, () => {
          this.value = {}
          resolve()
        })
    })
  }
  includes(userId) {
    return 'number' == typeof(this.value[userId])
  }
  migrate(callback) {
    if ('string' == typeof(this.value)) {
      let userIds = this.value.split('-').filter(String)
      this.value = {}
      for (let i=0; i<userIds.length; i++) {
        this.value[userIds[i]] = 0
        let percent = Math.floor((i/userIds.length) * 100)
        callback.call(this, percent)
      }
      this.storage.save(this.value)
    }
  }
  daysFollowed(userId) {
    if this.includes(userId) {
      let oneDay = 1000 * 60 * 60 * 24
      return Math.floor((Date.now() - this.value[userId]) / oneDay)
    }
  }
  add(userId) {
    this.value[userId] = Date.now()
    this.storage.save(this.value)
  }
  remove(userId) {
    delete this.value[userId]
    this.storage.save(this.value)
  }
}

export default Followed
