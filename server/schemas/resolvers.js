const { AuthenticationError } = require('apollo-server-express');
const { Team, Votes, User, Matchup } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id }).populate('thoughts');
      }
      throw new AuthenticationError('You need to be logged in!');
    },    
    user: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return User.findOne(params);
    },  
    users: async () => {
      return User.find();
    },        
    // login: async (parent, { name, password }) => {
    //   const params = { name, password };
    //   return User.find(params);
    // },
    teams: async () => {
      return Team.find();
    },            
    team: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Team.find(params);
    },
    matchups: async (parent, { _id }) => {
      const params = _id ? { _id } : {};
      return Matchup.find(params);
    },
    votes: async (parent, { userid }) => {
      const params = userid ? { userid } : {};
      return Votes.find(params);
    },    
  },
  Mutation: {
    createMatchup: async (parent, args) => {
      const matchup = await Matchup.create(args);
      return matchup;
    },    
    createUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      return {token,user};
    },
    login: async (parent, { name, password }) => {
      const user = await User.findOne({ name });

      if (!user) {
        throw new AuthenticationError('No User with this name found!');
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('Incorrect password!');
      }

      const token = signToken(user);
      return { token, user };
    },    
    createVote: async (parent, args) => {
      const vote = await Votes.create(args);
      return vote;
    },
    updateMatchup: async (parent, { _id, teamNum }) => {
      const vote = await Matchup.findOneAndUpdate(
        { _id },
        { $inc: { [`team${teamNum}_votes`]: 1 } },
        { new: true }
      );
      return vote;
    },
  },
};

module.exports = resolvers;
