import { gql } from '@apollo/client';

export const QUERY_TEAM = gql`
  query team {
    team {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  query user($_id: String) {
    user(_id: $_id) {
      _id
      name
      password
    }
  }
`;

export const QUERY_LOGIN = gql`
  query login($name: String, $password: String) {
    login(name: $name, password: $password) {
      _id
      name
      password
    }
  }
`;

export const QUERY_MATCHUPS = gql`
  query matchups($_id: String) {
    matchups(_id: $_id) {
      _id
      team1
      team2
      team1_votes
      team2_votes
    }
  }
`;

export const QUERY_USER_VOTES = gql`
  query votes($userid: String) {
    votes(userid: $userid) {
      _id
      userid
      matchupid
      voteno
    }
  }
`;

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      name
    }
  }
`;

export const QUERY_ME = gql`
  query me {
    me {
      _id
      name
    }
  }
`;
