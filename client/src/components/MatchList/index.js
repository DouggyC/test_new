import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS,QUERY_USER_VOTES } from '../../utils/queries';

const MatchList = ({ userid }) => {

    const QueryMultiple = () => {
        const res1 =  useQuery(QUERY_MATCHUPS, {
          fetchPolicy: "no-cache"
        });
         const res3 =  useQuery(QUERY_USER_VOTES, {
          variables: { userid: userid },
          fetchPolicy: "no-cache"
        });     
        return [res1, res3];
      }
      
      const [
          { loading: loading, data: data1 },
          { loading: loading3, data: data3 }
      ] = QueryMultiple()
    
    const matches = data1?.matchups || [];    
    const myvotes = data3?.votes || [];




  return (
    <div>
        <div className="card-body m-5">
            <h2>2022 Grand final match lists:</h2>
            {loading ? (
            <div>Loading...</div>
            ) : (
            <ul className="square">
                {matches.map((matchup) => {
                    if (myvotes.some(el => el.matchupid === matchup._id)){
                        return;
                    }
                    return (
                        <li key={matchup._id}>
                        <Link to={{ pathname: `/matchup/${matchup._id}` }}>
                            {matchup.team1} vs. {matchup.team2} ({(matchup.team1_votes+matchup.team2_votes)})
                        </Link>
                        </li>
                    );                
                })}
            </ul>
            )}
        </div>
        <div className="card-body m-5">
            {myvotes.length >0 ? (<h2>Your current match bet:</h2>) : ""}
            {loading3 ? (
            <div>Loading...</div>
            ) : (      
                <ul className="square">
                {myvotes.map((votes) => {

                var matchup = matches.find(el => el._id === votes.matchupid);

                return (
                    <li key={matchup._id}>
                        {matchup.team1} vs. {matchup.team2}
                        {" "}({(matchup.team1_votes+matchup.team2_votes)}) 
                        {/* {votes.voteno==1?" ("+matchup.team1+")":" ("+matchup.team2+")"} */}
                    </li>
                );
                })}
            </ul>    
            )}
     </div>
    </div>
    
  );
};

export default MatchList;

{/* <div className="card-body m-5">
    <h2>2022 Grand final match lists:</h2>
    {loading ? (
      <div>Loading...</div>
    ) : (
      <ul className="square">
        {matches.map((matchup) => {

          if (myvotes.some(el => el.matchupid === matchup._id)){
            return;
          }

          return (
            <li key={matchup._id}>
              <Link to={{ pathname: `/matchup/${matchup._id}` }}>
                {matchup.team1} vs. {matchup.team2} ({(matchup.team1_votes+matchup.team2_votes)})
              </Link>
            </li>
          );
        })}
      </ul>
    )}
  </div>



    <div className="card-body m-5">
    {myvotes.length >0 ? (<h2>Your current match bet:</h2>) : ""}
    {loading3 ? (
      <div>Loading...</div>
    ) : (      
        <ul className="square">
        {myvotes.map((votes) => {

        var matchup = matches.find(el => el._id === votes.matchupid);

        return (
            <li key={matchup._id}>
                {matchup.team1} vs. {matchup.team2}
                {votes.voteno==1?" ("+matchup.team1+")":" ("+matchup.team2+")"}
            </li>
        );
        })}
    </ul>    
    )}
     </div> */}