const messagesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Message = require('../models/message')
const User = require('../models/user')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

messagesRouter.get('/', async (request, response) => {
    const messages = await Message
        .find({})
        .populate('user', { username: 1 })

    response.json(messages.map(Message.format))
})

messagesRouter.post('/', async (request, response) => {
    const body = request.body

    console.log(request.body)
    try {
        console.log(request.body)
        /* const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)

        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        } */
        /* if (request.body.content === undefined) {
            return response.status(400).json({ error: 'content missing' })
        } */

        /*         const user = await User.findById(decodedToken.id)
         */
        const user = await User.findById(request.body.user.id)
        console.log(user)
        const message = new Message({
            content: eval(body.content),
            /* content: eval(body.content), */
            date: new Date(),
            user: user._id
        })

        const savedMessage = await message.save()

        user.messages = user.messages.concat(savedMessage._id)
        await user.save()

        response.json(Message.format(message))
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})

messagesRouter.delete('/:id', async (request, response) => {
    try {
        /* const token = getTokenFrom(request)
        const decodedToken = jwt.verify(token, process.env.SECRET)
        console.log(token + " " + decodedToken)
        if (!token || !decodedToken.id) {
            return response.status(401).json({ error: 'token missing or invalid' })
        }

        let user = await User.findById(decodedToken.id)

        if (user.access !== "admin") {
            response.status(403).send({ error: 'forbidden access' })
        }
 */
        const message = await Message.findById(request.params.id)
        await Message.remove(message)
        response.status(204).end()
    } catch (exception) {
        if (exception.name === 'JsonWebTokenError') {
            response.status(401).json({ error: exception.message })
        } else {
            console.log(exception)
            response.status(500).json({ error: 'something went wrong...' })
        }
    }
})
module.exports = messagesRouter
