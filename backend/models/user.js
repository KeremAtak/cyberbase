const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  /* passwordHash: String, */
  password: String,
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message' }],
  admin: String,
  access: String
})

userSchema.statics.format = (user) => {
  return {
    id: user.id,
    username: user.username,
    messages: user.messages,
    password: user.password,
    /* passwordHash: user.passwordHash, */
    access: user.access
  }
}

const User = mongoose.model('User', userSchema)

module.exports = User