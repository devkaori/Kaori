const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    Guild: String,
    User: String,
    Parent: { type: String, default: null },
    Partner: { type: String, default: null },
    Children: { type: String, default: null },
});

module.exports = mongoose.model("family", Schema);
