import FollowRecord from './follow_record.js'

let link
let listItem

const migrateData = () => {
  chrome.storage.local.get(null, (items) => {
    console.log(items)
    Object.keys(items).forEach(creatorId => {
      const records = items[creatorId]
      if (typeof(records) === 'object') {
        Object.keys(records).forEach(userId => {
          const createdAt = records[userId]
          if (typeof(createdAt) === 'number') {
            FollowRecord.add(creatorId, userId, createdAt)
            listItem.innerHTML = `Migrated userId: ${userId} createdAt: ${createdAt}`
          }
        })
      }
    })
    listItem.innerHTML = 'Data migration completed'
  })
}

export default {
  initialize () {
    link = document.getElementById('tmf-migrate')
    listItem = link.parentNode
    link.addEventListener('click', () => migrateData())
  }
}
