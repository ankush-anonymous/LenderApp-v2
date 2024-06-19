const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize'); // Adjust the path as necessary
const { hash, compare } = require('bcrypt');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  hooks: {
    beforeCreate: async (user) => {
      user.password = await hash(user.password, 10);
    },
  },
});

User.prototype.validPassword = async function(password) {
  return await compare(password, this.password);
};

module.exports = User;