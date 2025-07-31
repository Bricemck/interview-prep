# Server Build Explanation

This document explains the development process behind setting up the server for this application. It is **not functional code** but rather a walkthrough of how the project was structured and tested incrementally.

---

# Basic Structure of Express App

After initializing the repository and setting up the Node.js runtime, the application begins by loading the Express framework and creating an instance of the app:
const express = require('express');

const app = express();

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

I prefer to test incrementally at each step to avoid debugging large sections of code at once. A simple console.log() helps confirm the server is up and listening as expected.

# Build a landing page

// server.js

// GET /
app.get("/", async (req, res) => {
  res.send("Hello, Model Management Team!");
});

I define a basic route using Express, with the GET method serving the root ("/") of the application. This route handler is asynchronous, meaning it waits for an incoming request before sending a response. In this case, it sends a simple string to confirm that the server is running properly.

This type of incremental testing helps isolate errors early in the development process. Later, I’ll replace this with a more dynamic response using EJS templates rendered from a views directory, allowing me to serve structured HTML with embedded JavaScript for interactivity.

I chose to include a views directory and served simple responses to the browser to demonstrate my comfort with fullstack development.
When I'm not directly responsible for the frontend, I typically use Postman to preview and validate backend responses efficiently.
I have also used Curl for similar purposes.

## Environment Setup

I like to use the MVC (Model-View-Controller) pattern because it helps me keep my server file free from distraction, and the individual pieces of code organized and easier to manage as the project grows. By separating the logic into Models, Views, and Controllers, I can work more efficiently and isolate problems faster.

const modelCtrl = require('./controllers/models');
const dotenv = require("dotenv");
dotenv.config();

const express = require('express');
const mongoose = require("mongoose");

- Environment variables are loaded from a `.env` file using `dotenv`.
- .env is included in the .gitignore file, as well as our node_modules, so that our database is not made public.
- Express is initialized for handling server-side routing.
- Mongoose is used to connect and interact with MongoDB.

---

## Database Connection

mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB`);
});

- Establishes connection to MongoDB using the URI from `.env`.
- Logs success upon connection.

---

## App Initialization

const path = require("path");
const app = express();
const Model = require("./models/mlmodels.js");

In this Model variable, I'm defining the path to our Mongoose Model file to be called frequently through the app.

## Model Schema (Mongoose)

const modelSchema = new mongoose.Schema({
    id: {
        type: String,
        default: uuidv4,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    version: {
        type: String,
    }
}, {
    timestamps: { createdAt: 'created_at', updatedAt: false }
});

In this file, I’m defining the **schema** for my database model using Mongoose. I use `uuidv4` to assign a unique identifier to each model instance. That’s important because human-readable names might not be unique, and I want a consistent, machine-friendly way to track each record. The `id` field ensures that every model in the database has a globally unique value.

I included a `name` field, which is required and meant to be a more human-readable label for the model. The `version` field is optional and stored as a string — that way I can represent semantic versions (like `v1.2.3`) or even tags like `"beta"` or `"final"` without being locked into numeric formats.

I also enabled Mongoose’s `timestamps` option so that each model automatically tracks when it was created. I decided not to include an `updatedAt` field for now since model updates in this demo app are minimal, but I could easily enable that if the scope expanded.

At the end, I create and export the `Model` so it can be used in my controller and route files. Keeping this logic in a separate file under a `models` directory aligns with the MVC pattern and keeps the codebase easier to read and maintain.


---

## Middleware Configuration

const methodOverride = require("method-override");
const morgan = require("morgan");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

- `method-override`: Allows HTML forms to support PUT and DELETE.
- `morgan`: Logs HTTP request details.
- `express.static`: Serves static files like CSS and images.
- `ejs`: Template engine for rendering dynamic views.

---

## Route Development Process

### Basic Test Route

app.get("/", async (req, res) => {
    res.send("Hello, Model Management Team!");
});

- Simple response to confirm the server is up and routing works.

---

### Rendering a View

app.get("/", async (req, res) => {
    res.render("index.ejs");
});

- Once routing is confirmed, renders the `index.ejs` landing page.

---

### New Model Form

app.get("/models/new", (req, res) => {
    res.render("models/new.ejs");
});

- Displays a form for creating new model entries.
- In production, access would be restricted with permissions.

---

### Create New Model

app.post("/models", async (req, res) => {
    await Model.create(req.body);
    res.redirect("/models");
});

- Handles form submission and stores data in MongoDB.
- Redirects user to the model index page to confirm creation.

---

### Model Index Route

app.get("/models", async (req, res) => {
    const allModels = await Model.find();
    res.render("models/index.ejs", { models: allModels });
});

- Fetches all model entries and passes them to the `index.ejs` view.
- Uses EJS to dynamically render a list of models.

---

### Show Model Route

app.get("/models/:id", async (req, res) => {
    const readModel = await Model.findById(req.params.id);
    res.render("models/show.ejs", { model: readModel });
});

- Displays the details of a single model entry based on ID.

---

### Delete Route

app.delete("/models/:id", async (req, res) => {
    await Model.findByIdAndDelete(req.params.id);
    res.redirect("/models");
});

- Deletes a model entry and redirects to the model list.

---

### Edit Model Form

app.get("/models/:id/edit", async (req, res) => {
    const findModel = await Model.findById(req.params.id);
    res.render("models/edit.ejs", { model: findModel });
});

- Pre-fills an edit form with existing model data.

---

### Update Model Route

app.put("/models/:id", async (req, res) => {
    await Model.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/models/${req.params.id}`);
});

- Updates the model entry with new data from the form.
- Redirects to the updated model's show page.

---

*This file documents the core server setup and routing logic for the Model Management application.*
