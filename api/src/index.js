require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { fakeDB } = require('./fake-db');
const { authenticateToken } = require('./authenticate');
const {
  generateAccessToken,
  generateRefreshToken,
  sendAccessToken,
  sendRefreshToken
} = require('./token');

const SALT = 10;

const app = express();
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
  const { email, password } = req.body;

  try {
    // check user exists
    const user = fakeDB.find(user => user.email === email);
    if (user) throw new Error('User has already existed!');

    const hashedPassword = await bcrypt.hash(password, SALT);
    // insert new registered user to DB
    fakeDB.push({ id: fakeDB.length, email, password: hashedPassword });
    res.send({ message: 'Registered user!!'});
  } catch (err) {
    res.send({ message: err.message })
  }
})

app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = fakeDB.find(user => user.email === email);
    console.log('user: ', user);
    if (!user) throw new Error('User does not exist!!');

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) throw new Error('Password is incorrect');

    const accessToken = generateAccessToken(user.id);
    const refreshToken = generateRefreshToken(user.id);

    user.refreshToken = refreshToken;
    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken);
  } catch (err) {
    res.send({ message: err.message });
  }
})

app.post('/protected', async (req, res) => {
  try {
    const userId = authenticateToken(req, res);
    if (userId !== null) {
      res.send({ data: 'This is protected data!!' });
    }
  } catch (err) {
    res.send({ message: err.message });
  }
})

app.post('/refresh_token', (req, res) => {
  const token = req.cookies.refreshtoken;
  // If we don't have a token in our request
  if (!token) return res.send({ accesstoken: '' });
  // We have a token, let's verify it!
  let payload = null;
  try {
    payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }
  // token is valid, check if user exist
  const user = fakeDB.find(user => user.id === payload.userId);
  if (!user) return res.send({ accesstoken: '' });
  // user exist, check if refreshtoken exist on user
  if (user.refreshtoken !== token)
    return res.send({ accesstoken: '' });
  // token exist, create new Refresh- and accesstoken
  const accesstoken = generateAccessToken(user.id);
  const refreshtoken = generateRefreshToken(user.id);
  // update refreshtoken on user in db
  // Could have different versions instead!
  user.refreshtoken = refreshtoken;
  // All good to go, send new refreshtoken and accesstoken
  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
})

app.post('/logout', (req, res) => {
  res.clearCookie('refreshtoken', { path: '/refresh_token' });
  res.send({ message: 'Logged out'});
})

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`)
})