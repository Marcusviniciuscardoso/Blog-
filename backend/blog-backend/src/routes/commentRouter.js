const express = require('express')
const commentRouter = express.Router()
const commentController = require('../controllers/commentController')

commentRouter.get('/profileCardsComment/:id', commentController.getComment)
commentRouter.get('/profileInfoComment', commentController.getProfileComment)
commentRouter.post('/profileCardsComment', commentController.postComment)
commentRouter.put('/profileCardsComment', commentController.putComment)

module.exports = commentRouter
