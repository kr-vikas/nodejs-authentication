const Services = require('./users.services');

module.exports.register = async (req, res) => {
  try {
    const { email, password, userName } = req.body ?? {};
    if (!email || !password || !userName) {
      return res.status(400).json({ message: 'Email, password and userName are required' });
    };
    const newUser = await Services.register({ email, passwordHash: password, userName });
    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.login = async (req, res) => {
  try {
    const { password, userName } = req.body ?? {};
    if (!password || !userName) {
      return res.status(400).json({ message: 'Password and userName are required' });
    };
    const token = await Services.login({ password, userName });
    return res.status(201).json(token);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports.profile = async (req, res) => {
  try {
    const { id } = req.user ?? {};
    if (!id) {
      return res.status(403).json({ message: 'Id not found!' });
    };
    const user = await Services.getProfile(id);
    return res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};