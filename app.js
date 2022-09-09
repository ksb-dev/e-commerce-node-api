// Access Environment Variables
require('dotenv').config()

// Express async error npm (To avoid using try/catch & next to throw error)
require('express-async-errors')

// Morgan
const morgan = require('morgan')

// Express
const express = require('express')
const app = express()

// Database
const connectDB = require('./db/connect')

// Routers
const authRouter = require('./routes/authRoutes')

// Middlewares
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

// Parse incoming JSON requests (Built-in-middleware in Express)
app.use(express.json())
// Logs incoming http requests
app.use(morgan('tiny'))

app.get('/', (req, res) => {
  //throw new Error('Hello There!')
  res.send('e-commerce')
})

app.use('/api/v1/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// Port
const port = 5000 || PORT

const start = async () => {
  try {
    await connectDB(process.env.MONGO_CONNECTION_STRING)
    app.listen(port, console.log(`Server is listening on ${port}...`))
  } catch (error) {
    console.log(error)
  }
}

start()
