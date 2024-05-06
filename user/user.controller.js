const jwt = require('jsonwebtoken');
const userActions = require('./user.actions');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const newUser = await userActions.createUserMongo(req.body);
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '1d'
    });
    res.status(201).json({ token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userActions.findUserByEmail(email);
  
      if (!user) {
        return res.status(401).json({ message: 'Auth failed' });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ message: 'Auth failed' });
      }
  
      const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
      );
  
      res.status(200).json({
        message: 'Auth successful',
        token: token
      });
  
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };