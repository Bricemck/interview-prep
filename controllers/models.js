const { default: mongoose } = require('mongoose'); // Import mongoose to interact with MongoDB
const Model = require('../models/mlmodels'); // Import Model schema for machine learning Models

// The routing logic follows consistent patterns. 
// I’ve commented the first few routes to explain the structure and reasoning. 
// Subsequent routes are left uncommented unless they introduce new logic or need clarification.


const home = async (req, res) => {
  res.render("index.ejs");
}; // Renders the homepage view (index.ejs) when a user visits the root route.

// Handles form submission to create a new model in the database.  Awaits user input, then redirects to model index page.
const create = async (req, res) => {
  try {
    await Model.create(req.body);
    res.redirect("/models");
  } catch (err) {
    console.error("Error in create():", err);
    res.status(500).send("Server error");
  }
}; // Error handling avoids applications failing silently.  If this route fails, the console should tell me how it failed.


const newForm = (req, res) => {
  res.render("models/new.ejs");
}; // JavaScript reserves keywords like "new" and "delete", so we use alternative names like "newForm" and "destroy" to avoid unexpected behavior.


const index = async (req, res) => {
  try {
    const findModel = await Model.find();
    res.render("models/index.ejs", { models: findModel });
  } catch (err) {
    console.error("Error in index():", err);
    res.status(500).send("Server error");
  }
}; 

const show = async (req, res) => {
  try {
    const readModel = await Model.findById(req.params.id);

    if (!readModel) {
      return res.status(404).render("errors/404.ejs", { message: "Model not found" });
    }

    res.render("models/show.ejs", { model: readModel });
  } catch (err) {
    console.error("Error in show():", err);
    res.status(500).send("Server error");
  }
};

const update = async (req, res) => {
  try {
    const updated = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updated) {
      return res.status(404).render("errors/404.ejs", { message: "Model not found" });
    }

    res.redirect(`/models/${req.params.id}`);
  } catch (err) {
    console.error("Error in update():", err);
    res.status(500).send("Server error");
  }
};

const edit = async (req, res) => {
  try {
    const findModel = await Model.findById(req.params.id);

    if (!findModel) {
      return res.status(404).render("errors/404.ejs", { message: "Model not found" });
    }

    res.render("models/edit.ejs", { model: findModel });
  } catch (err) {
    console.error("Error in edit():", err);
    res.status(500).send("Server error");
  }
};

const destroy = async (req, res) => {
  try {
    const deleted = await Model.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).render("errors/404.ejs", { message: "Model not found" });
    }

    res.redirect("/models");
  } catch (err) {
    console.error("Error in destroy():", err);
    res.status(500).send("Server error");
  }
};

const lookupByUUID = async (req, res) => {
  try {
    const readModel = await Model.findOne({ id: req.params.uuid });

    if (!readModel) {
      return res.status(404).render("errors/404.ejs", { message: "Model not found" });
    }

    res.render("models/show.ejs", { model: readModel });
  } catch (err) {
    console.error("Error in lookupByUUID():", err);
    res.status(500).send("Server error");
  }
};

const lookupByName = async (req, res) => {
  try {
    const readModel = await Model.findOne({ name: req.params.name });

    if (!readModel) {
      return res.status(404).render("errors/404.ejs", { message: "Model not found" });
    }

    res.render("models/show.ejs", { model: readModel });
  } catch (err) {
    console.error("Error in lookupByName():", err);
    res.status(500).send("Server error");
  }
};

module.exports = {
  index,
  home,
  show,
  create,
  update,
  destroy,
  newForm,
  edit,
  lookupByUUID,
  lookupByName,
};
