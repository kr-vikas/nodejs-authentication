module.exports = function (app) {
  app.use('/api/user', require('../models/users/users.routes'));
  app.use('/api', (req, res) => { res.send('App authentication service is running successfully.') });
};