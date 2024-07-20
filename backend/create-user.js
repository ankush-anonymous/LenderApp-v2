const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function createUser(name, email, password) {
  try {
    // Hash the password before creating the user
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await prisma.Employee.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone: " ",
        photo: " ",
        address: "",
        govt_id: "",
        roles: [],
        centerUuid: null,
      },
    });

    console.log(
      `User ${newUser.name} (${newUser.email}) created successfully.`
    );
  } catch (err) {
    console.error("Error creating user:", err);
  } finally {
    // Close the Prisma Client connection
    await prisma.$disconnect();
  }
}

// Read command line arguments
const [, , name, email, password] = process.argv;

// Check if all required arguments are provided
if (!name || !email || !password) {
  console.error("Usage: node create-user.js <name> <email> <password>");
  process.exit(1);
}

// Call the createUser function with provided arguments
createUser(name, email, password);
