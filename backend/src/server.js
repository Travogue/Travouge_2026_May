require("dotenv").config();
const fs = require("fs");
const connectDB = require("./config/db");
const app = require("./app");
const User = require("./models/User");

const PORT = Number(process.env.PORT) || 5000;
const HOST = "0.0.0.0";

const validateRequiredEnv = () => {
  const required = ["MONGO_URI", "JWT_SECRET"];
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    // eslint-disable-next-line no-console
    console.error(`Startup failed: Missing required environment variable(s): ${missing.join(", ")}`);
    // eslint-disable-next-line no-console
    console.error("Set them in Render Dashboard -> Environment before deploying.");
    process.exit(1);
  }
};

const bootstrap = async () => {
  validateRequiredEnv();
  if (!fs.existsSync("uploads")) fs.mkdirSync("uploads");
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (adminEmail && adminPassword) {
    const admin = await User.findOne({ email: adminEmail });
    if (!admin) {
      await User.create({
        name: "Super Admin",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      // eslint-disable-next-line no-console
      console.log("Default admin created");
    }
  }

  app.listen(PORT, HOST, () => {
    // eslint-disable-next-line no-console
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
};

bootstrap().catch((error) => {
  // eslint-disable-next-line no-console
  console.error("Startup failed:", error.message);
  process.exit(1);
});
