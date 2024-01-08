const commentModel = require('../models/commentModel')

const getComment = async (req, res) => {
  const { id } = req.params
  const comments = await commentModel.getComment(id)
  console.log('passou aqui')
  return res.status(200).json(comments)
}

const getProfileComment = async (req, res) => {
  const profilecomments = await commentModel.getProfileComment()
  return res.status(200).json(profilecomments)
}

const postComment = async (req, res) => {
  const comments = await commentModel.postComment(req.body)
  return res.status(200).json(comments)
}

const putComment = async (req, res) => {
  const comments = await commentModel.putComment(req.body)
  console.log('Comments updated', comments)
  return res.status(200).json(comments)
}

module.exports = {
  getComment,
  getProfileComment,
  postComment,
  putComment
}
