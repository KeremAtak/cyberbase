const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  content: String,
  date: Date,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

messageSchema.statics.format = (message) => {
  return {
    id: message._id,
    content: message.content,
    date: message.date,
    user: message.user
  }
}

const Message = mongoose.model('Message', messageSchema)

module.exports = Message