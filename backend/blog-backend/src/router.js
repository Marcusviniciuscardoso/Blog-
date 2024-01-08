const express = require('express')
const homeController = require('./controllers/homeController')

const router = express.Router()

router.get('/cardsHome', homeController.getCards)

module.exports = router
