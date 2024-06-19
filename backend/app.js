const express = require('express');
const bodyParser = require('body-parser');
const passport = require('./src/passport');
const sequelize = require('./src/sequelize');
const jwt = require('jsonwebtoken');
const User = require('./src/models/user'); // Assuming the model file is user.js

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(passport.initialize());

// Synchronize the models with the database
sequelize.sync().then(() => {
  console.log('Database synced');
});

// Add a route to authenticate users and provide a JWT
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    console.log('Login: User found')
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log('Login: User verified')
    const token = jwt.sign({ id: user.id }, 'your_jwt_secret'); // Use an environment variable for the secret in production
    console.log('token created')
    res.json({ token });
  } catch (err) {
    console.log(err)
    res.status(500).json({ error: 'Database query failed', "err": err });
  }
});

// Protect your generic CRUD routes with JWT authentication
app.get('/api/:resource', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { resource } = req.params;
  try {
    const Model = sequelize.models[resource];
    if (Model) {
      const records = await Model.findAll();
      res.json(records);
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.get('/api/:resource/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { resource, id } = req.params;
  try {
    const Model = sequelize.models[resource];
    if (Model) {
      const record = await Model.findByPk(id);
      if (record) {
        res.json(record);
      } else {
        res.status(404).json({ error: 'Resource not found' });
      }
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.post('/api/:resource', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { resource } = req.params;
  try {
    const Model = sequelize.models[resource];
    if (Model) {
      const record = await Model.create(req.body);
      res.status(201).json(record);
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.put('/api/:resource/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { resource, id } = req.params;
  try {
    const Model = sequelize.models[resource];
    if (Model) {
      const record = await Model.findByPk(id);
      if (record) {
        await record.update(req.body);
        res.json(record);
      } else {
        res.status(404).json({ error: 'Resource not found' });
      }
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.delete('/api/:resource/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
  const { resource, id } = req.params;
  try {
    const Model = sequelize.models[resource];
    if (Model) {
      const record = await Model.findByPk(id);
      if (record) {
        await record.destroy();
        res.json({ message: 'Resource deleted' });
      } else {
        res.status(404).json({ error: 'Resource not found' });
      }
    } else {
      res.status(404).json({ error: 'Resource not found' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
