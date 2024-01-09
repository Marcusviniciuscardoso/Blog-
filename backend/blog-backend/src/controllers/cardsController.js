const cardsModel = require('../models/cardsModel')

const getCards = async (request, response) => {
  const cards = await cardsModel.getCards()
  return response.status(200).json(cards)
}

module.exports = {
  getCards
}
