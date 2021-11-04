import React, { useState } from 'react';
import { useHistory,useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_TEAM } from '../utils/queries';
import { CREATE_MATCHUP } from '../utils/mutations';

const Matchup = () => {
  
  //let { userid } = Auth.getUser().data._id;

  const { loading, data } = useQuery(QUERY_TEAM);

  const teamList = data?.team || [];

  const [formData, setFormData] = useState({
    team1: 'Rabbitohs',
    team2: 'Rabbitohs',
  });
  let history = useHistory();

  const [createMatchup, { error }] = useMutation(CREATE_MATCHUP);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createMatchup({
        variables: { ...formData },
      });

      history.push(`/matchup/${data.createMatchup._id}`);
    } catch (err) {
      console.error(err);
    }

    setFormData({
      team1: 'Rabbitohs',
      team2: 'Rabbitohs',
    });
  };

  return (
    <div className="card bg-white card-rounded w-25">
      <div className="card-header bg-dark text-center">
        <h1>Create your 2022 grand final match</h1>
      </div>
      <div className="card-body m-5">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <form onSubmit={handleFormSubmit}>
            <label>Team 1: </label>
            <select name="team1" onChange={handleInputChange}>
              {teamList.map((team) => {
                return (
                  <option key={team._id} value={team.name}>
                    {team.name}
                  </option>
                );
              })}
            </select>
            <label>Team 2: </label>
            <select name="team2" onChange={handleInputChange}>
              {teamList.map((team) => {
                return (
                  <option key={team._id} value={team.name}>
                    {team.name}
                  </option>
                );
              })}
            </select>
            <button className="btn btn-danger" type="submit">
              Create Game
            </button>
          </form>
        )}
      </div>
      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default Matchup;
