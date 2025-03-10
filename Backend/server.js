const express = require("express");
const sequelize = require("./config/database");
const claimRoutes = require("./routes/ClaimRoutes");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173", 
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  })
);


app.use("/api", claimRoutes);

const PORT = process.env.PORT || 5000;

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("Database sync failed:", error));
