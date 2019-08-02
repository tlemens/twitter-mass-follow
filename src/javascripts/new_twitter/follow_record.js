import Record from './record'

export default {
  add (creatorId, userId, createdAt) {
    const record  = { createdAt: createdAt, creatorId: creatorId, userId: userId }
    return Record.add('v2FollowRecord', record)
  }
}
