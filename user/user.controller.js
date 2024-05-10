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

  exports.getUser = async (req, res) => {
    try {      
      const user = await userActions.findUserById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  exports.updateUser = async (req, res) => {
    try {
      const userId = req.userData.id;
      const updates = req.body;
  
      const user = await userActions.updateUser(userId, updates);
      if (!user) {
        return res.status(404).json({ message: 'User not found or inactive' });
      }
  
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteUser = async (req, res) => {
    try {
      const userId = req.userData.id;
  
      const user = await userActions.deactivateUser(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found or already inactive' });
      }
  
      res.status(200).json({ message: 'User deactivated successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };