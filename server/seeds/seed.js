const db = require('../config/connection');
const { Team, User,  Votes, Matchup} = require('../models');

const teamData = require('./teamData.json');
const userData = require('./userData.json');

db.once('open', async () => {

  await Votes.deleteMany({});
  await Matchup.deleteMany({});

  await Team.deleteMany({});
  const technologies = await Team.insertMany(teamData);
  console.log('Teams seeded!');

  await User.deleteMany({});
  const users = await User.insertMany(userData);
  console.log('Users seeded!');
  
  process.exit(0);
});
