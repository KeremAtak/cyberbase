if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

let port = process.env.PORT
let mongoUrl = process.env.MONGODB_URI
let COOKIE_SECRET = process.env.COOKIE_SECRET

module.exports = {
    mongoUrl,
    port,
    COOKIE_SECRET
}