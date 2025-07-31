const dotenv = require("dotenv"); // require .env package which stores sensitive files.
//These files are needed to connect to MongoDB speficially, but have information I don't want pushed to github.
dotenv.config(); // Loads the environment variables from .env file

// We begin by loading Express
// We are also using ejs to deliver views, 
// This is not required in the server file, 
// Because express knows how to find this package
const express = require('express');
const mongoose = require("mongoose"); //requires package needed for connection to the database.

// Connect to MongoDB using the connection string in the .env file
mongoose.connect(process.env.MONGODB_URI);

// log connection status to terminal on start for ease of later debugging
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB`);
});

// HTML form elements only support GET and POST so if we want a form delete we would have to use Middleware like Morgan.
// In production delete would probably be hidden behind user permissions like admin privileges.
const methodOverride = require("method-override");
const morgan = require("morgan");
const path = require("path"); //stylesheet

const app = express();


// Import the Model to be used in routing.
const Model = require("./models/mlmodels.js");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));

// GET Route
// To serve a page, we start by adding a route in the server file.
// This is an asynchronous function that awaits a request from the client side, then sends a response.
// We start with a simple response for testing, then we come back to serve the EJS file later.
// By testing every step we better isolate problems before they occur.
// The following code returns a string to our local browser to let us know our route is working.
//    app.get("/", async (req, res) => {
//     res.send("Hello, Model Management Team!");
//    }); 
// I won't repeat the comment blurb for every route, but I did include one so you see the intention.


// Now that we know our dependencies are serving the route,
// We can use the same code to render a more traditional page using HTML.
// When we run the server, it renders the view at index.ejs at the landing page route.
app.get("/", async (req, res) => {
    res.render("index.ejs");
});

// This is the create page allowing users to create new Models.
// This would likely be locked behind permissions in production, 
// But for demonstration purposes I've put it here.
app.get("/models/new", (req, res) => {
    //   res.send("This route sends the user a form page!");
    res.render("models/new.ejs");
});

// This code awaits the request from our form page...
// However it responds to our database, in this case mongo.
// Our form page communicates with the Schema to create JSON Data.
// That data is then served to the server and stored.
// Then I use redirect to send the user to the index of all Models page to 'confirm' their model was added.
app.post("/models", async (req, res) => {
    // console.log(req.body)
    await Model.create(req.body);
    res.redirect("/models");
});

// Model Index Page
// Uses a find method to create an array of our database.
// We can then use EJS in our HTML to enable a for each function.
// This loops through our array and lists all Models.
app.get("/models", async (req, res) => {
    const allModels = await Model.find();
    // console.log(allModels); 
    // res.send("Welcome to the Models Index")
    res.render("models/index.ejs", { models: allModels });
});

//Show route
app.get("/models/:id", async (req, res) => {
    const readModel = await Model.findById(req.params.id);
    // res.send(`Renders the show page for ${req.params.id}`);
    res.render("models/show.ejs", { model: readModel });
});

//This was not requested, but I added the Edit & Delete routes.  I ran into a small problem with routing between Mongoose's built in Object Ids and the UUID requested.

//Delete route
app.delete("/models/:id", async (req, res) => {
    await Model.findByIdAndDelete(req.params.id)
    // res.send('this is the delete route');
    res.redirect("/models")
});

//Edit route
app.get("/models/:id/edit", async (req, res) => {
    const findModel = await Model.findById(req.params.id);
    // console.log(findModel);
    // res.send(`This is the edit route for ${findModel.name}`); 
    res.render("models/edit.ejs", {
        model: findModel,
    });
});

app.put("/models/:id/edit", async (req, res) => {
    await Model.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/models/${req.params.id}`);
});


app.listen(3000, () => {
    console.log('Listening on port 3000');
});

