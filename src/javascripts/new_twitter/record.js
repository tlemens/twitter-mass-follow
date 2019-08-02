const request = window.indexedDB.open('MassFollowForTwitter', 3)
let db

request.onupgradeneeded = (event) => {
  db = event.target.result
  db.createObjectStore('v2FollowRecord', { keyPath: ['creatorId', 'userId'] })
}

request.onerror = (event) => {
  console.log(event)
}

request.onsuccess = (event) => {
  db = event.target.result
}

export default {
  add (storeName, record) {
    db.transaction([storeName], 'readwrite')
      .objectStore(storeName)
      .add(record)
  }
}
