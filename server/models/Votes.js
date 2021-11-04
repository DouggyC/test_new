const { Schema, model } = require('mongoose');

const votesSchema = new Schema({
  userid: {
    type: String,
    required: true,
    unique: false,
  },
  matchupid: {
    type: String,
    required: true,
    unique: false,
  },
  voteno: {
    type: Number,
    required: true,
    unique: false,
  },  
});

const Votes = model('Votes', votesSchema);

module.exports = Votes;
