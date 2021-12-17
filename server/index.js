import express from 'express'
import mongoose from 'mongoose'
import config from 'config'

import authRouter from './routes/auth.routes.js'

const app = express()
const PORT = config.get('serverPort') || 5000
const URI = config.get('dbConnect')


app.use(express.json())

//routes
app.use('/api/auth', authRouter)

//connect server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

//connect mongo
mongoose.connect(URI, {}, (err) =>
  err ? console.log(err) : console.log('Connected to MongoDB')
)
