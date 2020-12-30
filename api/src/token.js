const jwt = require('jsonwebtoken');

const generateAccessToken = userId => {
  return jwt.sign({id: userId}, process.env.TOKEN_SECRET, {expiresIn: '15m'});
}

const generateRefreshToken = userId => {
  return jwt.sign({id: userId}, process.env.TOKEN_SECRET, { expiresIn: '7d'});
}

const sendAccessToken = (req, res, accesstoken) => {
  res.send({ accesstoken, email: req.body.email })
}

const sendRefreshToken = (res, token) => {
  res.cookie('refreshtoken', token, {
    httpOnly: true,
    path: '/refresh_token'
  })
}

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken
}
