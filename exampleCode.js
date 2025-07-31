// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config();

// mongoose.connect(process.env.MONGODB_URI);
// mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));

// const methodOverride = require('method-override');
// const morgan = require('morgan');
// const Model = require('./models/mlmodels.js');

// const app = express();
// app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride('_method'));
// app.use(morgan('dev'));

// // Home
// app.get('/', (req, res) => res.render('index.ejs'));

// // New model form
// app.get('/models/new', (req, res) => res.render('models/new.ejs'));
// app.post('/models', async (req, res) => {
//   await Model.create(req.body);
//   res.redirect('/models');
// });

// // Index
// app.get('/models', async (req, res) => {
//   const models = await Model.find();
//   res.render('models/index.ejs', { models });
// });

// // SHOW by UUID
// app.get('/models/:id', async (req, res) => {
//   const model = await Model.findOne({ id: req.params.id });
//   if (!model) return res.status(404).send('Model not found');
//   res.render('models/show.ejs', { model });
// });

// // EDIT form by UUID
// app.get('/models/:id/edit', async (req, res) => {
//   const model = await Model.findOne({ id: req.params.id });
//   if (!model) return res.status(404).send('Model not found');
//   res.render('models/edit.ejs', { model });
// });

// // UPDATE by UUID
// app.put('/models/:id', async (req, res) => {
//   const updated = await Model.findOneAndUpdate(
//     { id: req.params.id },
//     req.body,
//     { new: true }
//   );
//   if (!updated) return res.status(404).send('Model not found');
//   res.redirect(`/models/${req.params.id}`);
// });

// // DELETE by UUID
// app.delete('/models/:id', async (req, res) => {
//   const removed = await Model.findOneAndDelete({ id: req.params.id });
//   if (!removed) return res.status(404).send('Model not found');
//   res.redirect('/models');
// });

// app.listen(3000, () => console.log('Listening on port 3000'));
