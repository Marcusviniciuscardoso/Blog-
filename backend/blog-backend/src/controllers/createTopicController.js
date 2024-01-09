const createTopicModel = require('../models/createTopicModel')

const postCards = async (req, res) => {
  const cards = await createTopicModel.postCards(req.body, req.files.featuredimage)
  await createTopicModel.postCardsTexts(req.body, cards[0].idcard)

  res.status(200).json(cards)
}

module.exports = { postCards }
