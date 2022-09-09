const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const CustomError = require('../errors')

// Register user controller
const register = async (req, res) => {
  const { email, name, password } = req.body

  const isEmailExists = await User.findOne({ email })

  if (isEmailExists) {
    throw new CustomError.BadRequestError('Email already exists!')
  }

  // First registerd user is an admin
  const isFirstAccount = (await User.countDocuments({})) === 0

  const role = isFirstAccount ? 'admin' : 'user'

  const user = await User.create({ email, name, password, role })
  res.status(StatusCodes.CREATED).json({ user })
}

const login = async (req, res) => {
  res.send('Login Controller')
}

const logout = async (req, res) => {
  res.send('Logout Controller')
}

module.exports = {
  register,
  login,
  logout
}
