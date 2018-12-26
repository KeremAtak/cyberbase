const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('notes', { content: 1, date: 1 })

  response.json(users.map(User.format))
})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    const existingUser = await User.find({ username: body.username })
    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    /* if (!strongPassword(body.password)) {
      return response.status(500).json({ error: 'Weak password' })
    }  const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds) */

    const user = new User({
      username: body.username,
      name: body.name,
      password: body.password,
      /* passwordHash: passwordHash, */
      access: "user"
    })

    const savedUser = await user.save()

    response.json(User.format(savedUser))
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

//checks strength, more than 10 chars, contains big and small letters and also numbers
strongPassword = (password) => {
  var matchedCase = new Array();

  //safety reasons..
  if (password.length > 100) {
    return false
  }

  if (password.length < 10) {
    return false
  }

  matchedCase.push("[A-Z]");
  matchedCase.push("[0-9]");
  matchedCase.push("[a-z]")

  let conditions = 0;
  for (let i = 0; i < matchedCase.length; i++) {
    if (new RegExp(matchedCase[i]).test(password)) {
      conditions++;
    }
  }

  switch (conditions) {
    case 3:
      return true
  }
  return false
}

module.exports = usersRouter
