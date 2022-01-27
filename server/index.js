import express from 'express'
import mongoose from 'mongoose'
import config from 'config'
import cors from 'cors'

import authRouter from './routes/auth.routes.js'
import fileRouter from './routes/file.routes.js'
const app = express()
const PORT = config.get('serverPort') || 5000
const URI = config.get('dbConnect')


//cors
app.use(cors())

app.use(express.json())

//routes
app.use('/api/auth', authRouter)
app.use('/api/file', fileRouter)

//connected server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

//connected mongo
mongoose.connect(URI, {}, (err) =>
  err ? console.log(err) : console.log('Connected to MongoDB')
)
