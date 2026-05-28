// On Render, use Dashboard env vars. Locally, load backend/.env.
if (!process.env.RENDER) {
  require("dotenv").config();
}

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
    console.error(
      `Env present: PORT=${Boolean(process.env.PORT)}, MONGO_URI=${Boolean(process.env.MONGO_URI)}, JWT_SECRET=${Boolean(process.env.JWT_SECRET)}`
    );
    if (process.env.RENDER) {
      // eslint-disable-next-line no-console
      console.error(
        "Render fix: Dashboard -> your service -> Environment -> Add MONGO_URI and JWT_SECRET -> Save -> Manual Deploy"
      );
    } else {
      // eslint-disable-next-line no-console
      console.error("Local fix: copy backend/.env.example to backend/.env and fill all values.");
    }
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
