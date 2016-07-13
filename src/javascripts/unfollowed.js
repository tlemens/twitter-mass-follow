import StorageRecord from './storage_record.js'

class Unfollowed extends StorageRecord {
  constructor(userId) {
    super(userId)
    this._value = ''
    console.log('unfollowed')
    super.fetch().then((storageValue) => {
      this._value = storageValue
      console.log('storageValue:' + storageValue)
    })
  }
  includes(recordId) {
    return this._value.includes(recordId)
  }
  add(recordId) {
    this._value += recordId
    super.save()
  }
}

export default Unfollowed
