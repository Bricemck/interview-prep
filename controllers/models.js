const { default: mongoose } = require('mongoose');
const Model = require('../models/mlmodels');

// This is the model controller for MVC routing.  With one significant exception, this page is kept clean from comments. Please see comments in BUILDPROCESS.md for more logic behind routing decisions.

const home = async (req, res) => {
    res.render("index.ejs");
};

const create = async (req, res) => {
    await Model.create(req.body);
    res.redirect("/models");
};

const newForm = (req, res) => {
    res.render("models/new.ejs");
};

const index = async (req, res) => {
    const findModel = await Model.find();
    res.render('models/index.ejs', { models: findModel});
}

// The show route logic was conflicting with lookupByName and lookupByUUID
// because all three controller actions attempted to render the same `models/show.ejs` view.
// When a model was not found (e.g., an invalid UUID or name), it would try to render
// the view with a `null` model, leading to runtime errors like:
// `Cannot read properties of null (reading 'name')`.
//
// Adding error handling to each controller helps avoid these conflicts by:
// - Detecting when a model isn't found and returning an appropriate 404 response.
// - Preventing attempts to render the `show.ejs` template with undefined data.
// - Making debugging easier by surfacing meaningful messages in logs or the browser.
//
// This pattern keeps behavior consistent and avoids misleading template errors
// when the real issue is simply that the model wasn't found.
// 
// const show = async (req, res) => {
//     const { id } = req.params;
//     const isMongoId = mongoose.Types.ObjectId.isValid(id);
//     const readModel = isMongoId
//     res.render("models/show.ejs", { model: readModel });
// };

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
    await Model.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/models/${req.params.id}`);
};

const edit = async (req, res) => {
    const findModel = await Model.findById(req.params.id);
    res.render("models/edit.ejs", {
        model: findModel,
    });
};

const destroy = async (req, res) => {
    await Model.findByIdAndDelete(req.params.id)
    res.redirect("/models")
};

const lookupByUUID = async (req, res) => {
  try {
    const readModel = await Model.findOne({ id: req.params.uuid });

    if (!readModel) {
      return res.status(404).render("errors/404.ejs", { message: "Model not found" });
    }

    res.render("models/show.ejs", { model: readModel });
  } catch (err) {
    console.error(err);
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