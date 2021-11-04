const { gql } = require('apollo-server-express');

const typeDefs = gql`
type User {
  _id: ID!
  name: String!
  password: String!
}

type Auth {
  token: ID!
  user: User
}

  type Team {
    _id: ID!
    name: String!
  }

  type Matchup {
    _id: ID!
    team1: String!
    team2: String!
    team1_votes: Int
    team2_votes: Int
  }

  type Votes {
    _id: ID!
    userid: String!
    matchupid: String!
    voteno: Int!
  }

  type Query {
    login(name: String, password: String): [User]
    user(_id: String): [User]
    users: [User]
    me: User
    team(_id: String): [Team]
    teams: [Team]
    votes(userid: String): [Votes]
    matchups(_id: String): [Matchup]
  }

  type Mutation {
    createUser(name: String!, password: String!): Auth
    login(name: String!, password: String!): Auth

    createMatchup(team1: String!, team2: String!): Matchup
    updateMatchup(_id: String!, teamNum: Int!): Matchup
    createVote(userid: String!, matchupid: String!, voteno: Int!): Votes
  }
`;

module.exports = typeDefs;
