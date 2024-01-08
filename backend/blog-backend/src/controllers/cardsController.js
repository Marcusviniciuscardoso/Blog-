const cardsModel = require('../models/cardsModel')

const getCards = async (request, response) => {
  const cards = await cardsModel.getCards()
  console.log('Ó o landing page cards funcionando: ', cards)
  return response.status(200).json(cards)
}

module.exports = {
  getCards
}
