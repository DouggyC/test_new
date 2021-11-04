const { Schema, model } = require('mongoose');

const matchupSchema = new Schema({
  team1: {
    type: String,
    required: true,
  },
  team2: {
    type: String,
    required: true,
  },
  team1_votes: {
    type: Number,
    default: 0,
  },
  team2_votes: {
    type: Number,
    default: 0,
  },
});

const Matchup = model('Matchup', matchupSchema);

module.exports = Matchup;
