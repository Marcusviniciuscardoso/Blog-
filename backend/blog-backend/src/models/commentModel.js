const connection = require('./connection')

const getComment = async (id) => {
  const query = `SELECT commentssection.*, profile.name, profile.surname, profile.avatar 
  FROM commentssection
  INNER JOIN profile ON commentssection.profileid = profile.idprofile
  WHERE commentssection.cardid = $1`
  const comment = await connection.query(query, [id])
  return comment.rows
}

const getProfileComment = async () => {
  const query = 'SELECT * FROM profile '
  const profileComment = await connection.query(query)
  return profileComment.rows
}

const postComment = async (data) => {
  const { comment, likes, dislikes, profileid, cardid, commentdate } = data
  const query = `INSERT INTO commentssection (comment, likes, dislikes, profileid, cardid, commentdate) 
                 VALUES ($1, $2, $3, $4, $5, $6)`
  const comments = await connection.query(query, [comment, likes, dislikes, profileid, cardid, commentdate])
  return comments.rows
}

const putComment = async (data) => {
  try {
    const { likes, dislikes, idcomment } = data
    const query = ` UPDATE commentssection
                    SET likes = $1, dislikes = $2
                    WHERE idcomment = $3`
    const comment = await connection.query(query, [likes, dislikes, idcomment])
    return comment.rows
  } catch (error) {
    console.error('Error to update comments', error)
  }
}
module.exports = {
  getComment,
  getProfileComment,
  postComment,
  putComment
}
