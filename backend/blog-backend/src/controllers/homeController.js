const homeModel = require('../models/homeModel')

const getCards = async (req, res) => {
  const cards = await homeModel.getCards()
  return res.status(200).json(cards)
}

module.exports = {
  getCards
}
