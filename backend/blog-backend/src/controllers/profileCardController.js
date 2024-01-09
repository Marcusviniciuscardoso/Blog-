const profileCardsModel = require('../models/profileCardsModel')

const getProfileCards = async (req, res) => {
  const { id } = req.params
  const profileCards = await profileCardsModel.getProfileCards(id)
  return res.status(200).json(profileCards)
}

const deleteProfileCards = async (req, res) => {
  const { id, cardId } = req.params
  const profileCards = await profileCardsModel.deleteProfileCards(id, cardId)
  return res.status(200).json(profileCards)
}

module.exports = { getProfileCards, deleteProfileCards }
