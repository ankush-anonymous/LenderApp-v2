// create-user.js

const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('./src/sequelize'); // Adjust the path as necessary
const User = require('./src/models/user'); // Adjust the path as necessary

async function createUser(name, email, password) {
  try {
    // Sync all defined models with the database
    await sequelize.sync();

    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    console.log(`User ${newUser.name} (${newUser.email}) created successfully.`);
  } catch (err) {
    console.error('Error creating user:', err);
  } finally {
    // Close the database connection
    await sequelize.close();
  }
}

// Read command line arguments
const [,, name, email, password] = process.argv;

// Check if all required arguments are provided
if (!name || !email || !password) {
  console.error('Usage: node create-user.js <name> <email> <password>');
  process.exit(1);
}

// Call the createUser function with provided arguments
createUser(name, email, password);
