const Model = require('../models/mlmodels');

// This is the model controller for MVC routing.  This page is kept clean from comments. Please see comments in BUILDPROCESS.md for route logic.

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

const show = async (req, res) => {
    const readModel = await Model.findById(req.params.id);
    res.render("models/show.ejs", { model: readModel });
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

module.exports = {
  index,
  home,
  show,
  create,
  update,
  destroy,
  newForm,
  edit,
};