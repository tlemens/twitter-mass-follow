const request = window.indexedDB.open('MassFollowForTwitter', 2)
let db

request.onupgradeneeded = (event) => {
  db = event.target.result
  db.createObjectStore('followRecord', { keyPath: 'userId' })
}

request.onerror = (event) => {
  console.log(event)
}

request.onsuccess = (event) => {
  db = event.target.result
}

export default {
  add (type, record) {
    db.transaction([type], 'readwrite')
      .objectStore(type)
      .add(record)
  },
  get (type, userId) {
    return new Promise(resolve => {
      const request = db.transaction([type]).objectStore(type).get(userId)
      request.onsuccess = () => {
        resolve(request.result)
      }
    })
  }
}
