// This file represents a Clean server.js prioritizing readability, simplicity, and maintainability.


// === Load Environment Variables ===
const dotenv = require("dotenv");
dotenv.config(); // Loads .env file contents into process.env

// === Required Packages ===
const express = require("express"); // Minimalist framework for node.js that handles our routing, middleware, and HTTP req, res logic.
const mongoose = require("mongoose"); // Provides schema-based models to simplify data validation, querying, and interaction with MongoDB
const path = require("path"); // Core node.js utility that provides functions for handlign file and directory paths.
const methodOverride = require("method-override"); // Middleware that enables PUT & Delete in clients that only support GET & POST.
const morgan = require("morgan"); // Middleware that logs requests and responses, useful for debugging and monitoring activity.

// === Express App Setup ===
const app = express(); // Initializes an express application instance. Handles routing, middleware, response logic, server communication, etc.  
app.set("view engine", "ejs"); // Use EJS for server-side templating

// === MongoDB Connection ===
mongoose.connect(process.env.MONGODB_URI); // Connects to the MongoDB database
mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
}); // Logs a message once connection is successfully established.
mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
}); // Throws an error if connection fails to connect to the database.

// === Import Controller & Model ===
const modelCtrl = require("./controllers/models"); // Imports the model controller, which contains route handler functions for managing model-related logic.


// === Middleware ===
app.use(express.urlencoded({ extended: false })); // Parse form data (application/x-www-form-urlencoded)
app.use(express.json());                           // Parse incoming JSON
app.use(methodOverride("_method"));                // Allow method overrides (e.g., PUT/DELETE)
app.use(morgan("dev"));                            // Log requests to the console
app.use(express.static(path.join(__dirname, "public"))); // Serve static assets from /public

// === Routes ===
// The routing logic follows consistent patterns. 
app.get("/models/uuid/:uuid", modelCtrl.lookupByUUID);
app.get("/models/name/:name", modelCtrl.lookupByName);
app.get("/models/new", modelCtrl.newForm);
app.post("/models", modelCtrl.create);
app.get("/models", modelCtrl.index);
app.get("/models/:id", modelCtrl.show);
app.delete("/models/:id", modelCtrl.destroy);
app.get("/models/:id/edit", modelCtrl.edit);
app.put("/models/:id", modelCtrl.update);
app.get("/", modelCtrl.home);


// === Start Server ===
app.listen(3000, () => {
    console.log("Listening on port 3000");
});