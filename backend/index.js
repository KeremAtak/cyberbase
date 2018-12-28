const http = require('http')
const https = require('https')
const fs = require('fs')
const express = require('express')
const config = require('./utils/config')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const messagesRouter = require('./controllers/messages')
const morgan = require('morgan');

mongoose.connect(config.mongoUrl)
mongoose.Promise = global.Promise

app.use(cors())
app.use(bodyParser.json())
app.use(express.static('../frontend/build'))
app.use(middleware.logger)

/* app.use(morgan('combined', {
  stream: fs.createWriteStream('./access.log', {flags: 'a'})
})); */

app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)
app.use('/api/messages', messagesRouter)

app.disable("x-powered-by");

/* const httpsOptions = {
  key: fs.readFileSync('./security/cert.key'),
  cert: fs.readFileSync('./security/cert.pem')
};


const server = https.createServer(httpsOptions, app) */

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  mongoose.connection.close()
})

module.exports = {
  app, server
}