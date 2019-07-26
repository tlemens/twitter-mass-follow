import Record from './record'

export default {
  add (userId, createdAt) {
    const record  = { createdAt: createdAt, userId: userId }
    return Record.add('followRecord', record)
  }
}
