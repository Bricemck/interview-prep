const mongoose = require("mongoose");
// UUID refers to 'universally unique identifier'
// It creates a 128-bit number for unique identification
const { v4: uuidv4 } = require('uuid');

// Schema definition
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


// This defines the schema for a model to be created.  
// A Unique ID is how the machine defines the model in the case of similar naming conventions.
// Name is stored as a string to allow for a human facing identifier of the model.
// Version stored as a string, not an interger, shows the number of iterations to the model, 
// Potentially this could show how users are behind in versions, or possibly even allowing users to go back to previous models.

// Create the model, capitalized to show it's a DB Model name.
const Model = mongoose.model('Model', modelSchema);

// Export the model
module.exports = Model;