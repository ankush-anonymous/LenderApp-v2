const express = require("express");
const bodyParser = require("body-parser");
const passport = require("./src/passport");
const prisma = require("./prismaClient");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(passport.initialize());

// Synchronize the models with the database (Prisma does not require a sync step)
// Ensure migrations have been applied before running the server
// npx prisma migrate dev --schema=path/to/your/schema.prisma

// Add a route to authenticate users and provide a JWT
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.employee.findUnique({ where: { email } });
    if (!user || !bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = jwt.sign({ id: user.uuid }, "your_jwt_secret"); // Use an environment variable for the secret in production
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Database query failed", err });
  }
});

// Protect your generic CRUD routes with JWT authentication
app.get(
  "/api/:resource",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { resource } = req.params;
    try {
      const Model = prisma[resource];
      if (Model) {
        const records = await Model.findMany();
        res.json(records);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Database query failed" });
    }
  }
);

app.get(
  "/api/:resource/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { resource, id } = req.params;
    try {
      const Model = prisma[resource];
      if (Model) {
        const record = await Model.findUnique({ where: { uuid: id } });
        if (record) {
          res.json(record);
        } else {
          res.status(404).json({ error: "Resource not found" });
        }
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Database query failed" });
    }
  }
);

app.post(
  "/api/:resource",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { resource } = req.params;
    try {
      const Model = prisma[resource];
      if (Model) {
        const record = await Model.create({ data: req.body });
        res.status(201).json(record);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Database query failed" });
    }
  }
);

app.put(
  "/api/:resource/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { resource, id } = req.params;
    try {
      const Model = prisma[resource];
      if (Model) {
        const record = await Model.update({
          where: { uuid: id },
          data: req.body,
        });
        res.json(record);
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Database query failed" });
    }
  }
);

app.delete(
  "/api/:resource/:id",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const { resource, id } = req.params;
    try {
      const Model = prisma[resource];
      if (Model) {
        const record = await Model.delete({ where: { uuid: id } });
        res.json({ message: "Resource deleted" });
      } else {
        res.status(404).json({ error: "Resource not found" });
      }
    } catch (err) {
      res.status(500).json({ error: "Database query failed" });
    }
  }
);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
