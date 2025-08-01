const mongoose = require("mongoose");

// UUID refers to 'universally unique identifier'. It creates a 128-bit number for unique identification
// UUID is preferable to MongoDB's default ObjectIDs because they are globaly unique, yet standardized across many systems and languages.
// Making them ideal for merging databases or in multi-language ecosystems.
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

// Create the model, capitalized to show it's a DB Model name.
const Model = mongoose.model('Model', modelSchema);

// Export the model
module.exports = Model;