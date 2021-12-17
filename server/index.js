import express from 'express'
import mongoose from 'mongoose'
import config from 'config'

const app = express()
const PORT = config.get('serverPort') || 5000
const URI = config.get('dbConnect')

//connect server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

//connect mongo
mongoose.connect(URI, {}, (err) =>
  err ? console.log(err) : console.log('Connected to MongoDB')
)
