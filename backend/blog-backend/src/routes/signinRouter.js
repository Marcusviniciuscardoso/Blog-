const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const signInController = require('../controllers/signInController')
const checkCred = require('../utils/checkCreds')
const jwt = require('jsonwebtoken')
const secret = process.env.my_secret

const signinRouter = express.Router()

const validationBody = (req, res, next) => {
  const { body } = req
  try {
    const requiredFields = ['username', 'userpassword']
    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === '') {
        return res.status(400).json({ message: `${field} undefined` })
      }
    }
    next()
  } catch (error) {
    console.error('Error to verify fields:', error)
    res.status(500).json({ message: 'Server internal error' })
  }
}

const validationCreds = async (req, res, next) => {
  const body = req.body
  try {
    const credsConfirm = await checkCred.checkCreds(body.username, body.userpassword)

    if (credsConfirm === false) {
      return res.status(400).json({ message: 'Invalid user or password' })
    } else {
      const id = credsConfirm.rows[0].idcredentials
      const token = await createToken(id)
      const decoded = jwt.verify(token, secret)
      next()
      return res.json({ auth: true, token, credsConfirm })
    }
  } catch (error) {
    console.error('Error to check credentials:', error)
    return res.status(500).json({ message: 'Server internal error' })
  }
}

const createToken = async (id) => {
  try {
    const token = await jwt.sign({ idcredentials: String(id) }, secret, { expiresIn: 3000 })
    return token
  } catch (error) {
    console.error('Error to create token:', error)
    throw error
  }
}
// authMiddleware.js

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({ error: 'Not any token' })
  }

  const payload = jwt.verify(token, secret)
  if (payload.exp < Date.now() / 1000) {
    return res.status(401).json({ error: 'Token expired' })
  }

  jwt.verify(token, secret, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Failure checking token' })
    }
    req.user = user
    next()
  })
}

module.exports = authenticateToken

signinRouter.post('/signIn', validationBody, validationCreds)
signinRouter.get('/protected-data', authenticateToken, signInController.getCredsProfile)

/* async (req, res) => {
  const idcredenciais = req.user.idcredenciais
  const idProfile = await signInController.getCredsProfile(idcredenciais)
  res.json({ idcredenciais, dadoId: idProfile })
}) */

module.exports = signinRouter
