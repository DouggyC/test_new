import { useQuery, useMutation } from '@apollo/client';
import { useHistory, useParams, Link } from 'react-router-dom';
import { UPDATE_MATCHUP } from '../utils/mutations';
import { CREATE_VOTE } from '../utils/mutations';
import { QUERY_MATCHUPS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Vote = () => {
  let { id } = useParams();

  let { userid } = Auth.getUser().data._id;
  
console.log(userid)

  let history = useHistory();

  // const { loading, data } = useQuery(QUERY_MATCHUPS, {
  //   variables: { _id: id },
  // });

  const QueryMultiple = () => {
    const res1 =  useQuery(QUERY_MATCHUPS, {
      variables: { _id: id },
      fetchPolicy: "no-cache"
    });
     const res3 =  useQuery(QUERY_ME, {
      fetchPolicy: "no-cache"
    });     
    return [res1, res3];
  }

  const [
    { loading: loading, data: data1 },
    { loading: loading3, data: data3 }
] = QueryMultiple()

  const matchup = data1?.matchups || [];
  const profile = data3?.me|| {};

  userid = profile._id

  const [createVote, { error }] = useMutation(CREATE_VOTE);
  const [updateMatchup, { error2 }] = useMutation(UPDATE_MATCHUP);

  const handleVote = async () => {
    try {
      await createVote({
        variables: { userid: userid, matchupid: id, voteno: 1 },
      });
       await updateMatchup({
         variables: { _id: id, teamNum: 1 },
       });      


      history.push(`/home/`);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Bet on your grand final match</h1>
      </div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="card-body text-center mt-3">
          <h2>
            {matchup[0].team1} vs. {matchup[0].team2}
          </h2>
          {/* <h3>
            {matchup[0].team1_votes} : {matchup[0].team2_votes}
          </h3> */}
          {/* <button className="btn btn-info" onClick={() => handleVote(1)}>
            Vote for {matchup[0].team1}
          </button>{' '}
          <button className="btn btn-info" onClick={() => handleVote(2)}>
            Vote for {matchup[0].team2}
          </button> */}
          <button className="btn btn-info" onClick={() => handleVote()}>
            Bet on {matchup[0].team1} vs. {matchup[0].team2}
          </button>{' '}
          <div className="card-footer text-center m-3">
            <br></br>
            <Link to={{ pathname: `/home/` }}>
              <button className="btn btn-lg btn-danger">
                View all Games
              </button>
            </Link>
          </div>
        </div>
      )}
      {error && <div>Something went wrong...</div>}
    </div>
  );
};

export default Vote;
