const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
  const body = request.body

  const user = await User.findOne({ username: request.body.username })
  const passwordCorrect = user === null ?
    /* false : await bcrypt.compare(body.password, user.password) */
    false : await body.password === user.password

  if (!(user && passwordCorrect)) {
    return response.status(401).send({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
    access: user.access
  }

  /*   const token = jwt.sign(userForToken, process.env.SECRET) */

  response.status(200).send({ /* token, */ id: user._id, username: user.username })
})

module.exports = loginRouter
