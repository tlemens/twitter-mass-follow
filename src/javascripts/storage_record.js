let storage = chrome.storage.local

class StorageRecord {
  constructor(key) {
    this.key = key
  }
  fetch() {
    return new Promise((resolve, reject) => {
      storage.get(this.key, (result) => {
        console.log(this.toString())
        console.log(".fetch()")
        if ( result.hasOwnProperty(this.key) ) {
          console.log(`=> ${result[this.key]}`)
          resolve(result[this.key])
        } else {
          console.log('=> Record not found!')
          reject('Record not found!')
        }
      })
    })
  }
  save(value) {
    console.log(this.toString())
    console.log(".save()")
    let object = {}
    object[this.key] = value
    storage.set(object)
  }
  toString() {
    return `StorageRecord ${this.key}`
  }
}

export default StorageRecord
