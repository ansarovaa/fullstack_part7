const app = require('./app') // varsinainen Express-sovellus
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

const PORT = config.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})