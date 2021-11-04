const { Schema, model } = require('mongoose');

const teamSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const Team = model('Team', teamSchema);

module.exports = Team;
