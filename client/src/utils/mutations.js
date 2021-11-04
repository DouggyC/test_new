import { gql } from '@apollo/client';

export const CREATE_MATCHUP = gql`
  mutation createMatchup($team1: String!, $team2: String!) {
    createMatchup(team1: $team1, team2: $team2) {
      _id
      team1
      team2
    }
  }
`;

export const CREATE_USER = gql`
  mutation createUser($name: String!, $password: String!) {
    createUser(name: $name, password: $password) {
      token
      user {
        _id
        name
      }      
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($name: String!, $password: String!) {
    login(name: $name, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;

export const UPDATE_MATCHUP = gql`
  mutation updateMatchup($_id: String!, $teamNum: Int!) {
    updateMatchup(_id: $_id, teamNum: $teamNum) {
      _id
      team1
      team2
      team1_votes
      team2_votes
    }
  }
`;

export const CREATE_VOTE = gql`
  mutation createVote($userid: String!,$matchupid: String!,$voteno: Int!) {
    createVote(userid: $userid, matchupid: $matchupid, voteno: $voteno) {
      _id
      userid
      matchupid
      voteno
    }
  }
`;
