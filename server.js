// This file represents a Clean server.js prioritizing readability, simplicity, and maintainability.
// For a description of my process, and how I build to this, please see serverBuildProcess.js


// === Load Environment Variables ===
const dotenv = require("dotenv");
dotenv.config(); // Loads .env file contents into process.env

// === Required Packages ===
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const morgan = require("morgan");

// === Express App Setup ===
const app = express();
app.set("view engine", "ejs"); // Use EJS for server-side templating

// === MongoDB Connection ===
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

// === Import Controller & Model ===
const modelCtrl = require("./controllers/models");
const Model = require("./models/mlmodels.js");

// === Middleware ===
app.use(express.urlencoded({ extended: false })); // Parse form data (application/x-www-form-urlencoded)
app.use(express.json());                           // Parse incoming JSON
app.use(methodOverride("_method"));                // Allow method overrides (e.g., PUT/DELETE)
app.use(morgan("dev"));                            // Log requests to the console
app.use(express.static(path.join(__dirname, "public"))); // Serve static assets from /public

// === Routes ===
app.get("/", modelCtrl.home);
app.get("/models/new", modelCtrl.newForm);
app.post("/models", modelCtrl.create);
app.get("/models", modelCtrl.index);
app.get("/models/:id", modelCtrl.show);
app.delete("/models/:id", modelCtrl.destroy);
app.get("/models/:id/edit", modelCtrl.edit);
app.put("/models/:id", modelCtrl.update);

// === Start Server ===
app.listen(3000, () => {
    console.log("Listening on port 3000");
});