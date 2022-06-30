const jwt = require('jsonwebtoken');
const User = require('../models/user')

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer', '').trim();
    const decoded = jwt.verify(token, 'thisismynewcourse');
    const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

    if (!user) {
      throw new Error();
    }

    // save it to user to access it later on
    req.token = token;
    req.user = user;
    next();
    console.log(token);
  } catch (e) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
}

module.exports = auth;