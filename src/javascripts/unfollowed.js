import StorageRecord from './storage_record.js'

class Unfollowed extends StorageRecord {
  constructor(userId) {
    super(userId)
    this._value = ''
    super.fetch().then((storageValue) => {
      this._value = storageValue
    })
  }
  includes(recordId) {
    return this._value.includes(recordId)
  }
  add(recordId) {
    this._value += recordId
    super.save()
  }
  isNotReady() {
    return typeof(this.fetched) === 'undefined'
  }
}

export default Unfollowed
