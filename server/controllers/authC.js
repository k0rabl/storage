import User from '../models/User.js' 
import bcrypt from 'bcrypt'
import {validationResult} from 'express-validator'
import jwt from 'jsonwebtoken'
import config from 'config'

const privateKey = config.get('privateKey')

export const Registration = async (req, res) => {
  try {
    const validErrors = validationResult(req)

    if (!validErrors.isEmpty()){
      return res.status(400).json({ msg: 'Incorrect req ', validErrors })
    }

    const {email, password, name} = req.body

    const user = await User.findOne({email})

    if (user)
      return res.status(400).json({ msg: 'The email already exists.' })

    const hashPass = await bcrypt.hash(password, 8)
    const newUser = new User({
      email,
      name,
      password: hashPass
    })

    await newUser.save()
    return res.json({message: 'User is create!'})

  } catch (e) {
    console.log(e)
    res.send({message: 'Server error'})
  }
}

export const Login = async (req, res) => {
  try {
    const {email, password} = req.body
    const user = await User.findOne({email})
    
    if (!user)
      return res.status(400).json({ msg: `${email} is not found.` })
  
    const isMatch = await bcrypt.compare(password, user.password)
  
    if (!isMatch)
      return res.status(400).json({ msg: 'Password is incorrect.' })
      
    const token = jwt.sign({ id: user.id }, privateKey, { expiresIn: '1h'});
  
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        diskSpace: user.diskSpace,
        usedSpace: user.usedSpace,
        avatar: user.avatar,
        files: user.files
      }
    })
  } catch (e) {
    console.log(e)
    res.send({message: 'Server error'})
  }

}