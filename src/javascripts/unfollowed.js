import StorageRecord from './storage_record.js'

class Unfollowed {
  constructor(userId) {
    this.storage = new StorageRecord(userId)
  }
  load() {
    return new Promise((resolve, reject) => {
      this.storage.fetch().then((storageValue) => {
        this.value = storageValue
        resolve()
      }, resolve)
    })
  }
  includes(recordId) {
    return this.value.includes(recordId)
  }
  add(recordId) {
    this.value += recordId
    this.storage.save(this.value)
  }
}

export default Unfollowed
