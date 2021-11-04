import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_MATCHUPS,QUERY_USER_VOTES,QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import MatchList from '../components/MatchList';

const Home = () => {

  //let { userid } = useParams();

  // if (!Auth.loggedIn()) {
  //   history.push('/');
  // }

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };  

  let { userid } = Auth.getUser().data._id;

  const QueryMultiple = () => {
     const res3 =  useQuery(QUERY_ME, {
      fetchPolicy: "no-cache"
    });     
    return [res3];
  }
  
  const [
      { loading: loading3, data: data3 }
  ] = QueryMultiple()

  const profile = data3?.me|| {};

  return (
    <div className="card bg-white card-rounded w-50">
      <div className="card-header bg-dark text-center">
        <h1>Welcome to the NRL 2022 Grand final tipping tracker!</h1>
        <h4>Place your bet on who will be in the final head to head of the season</h4>
          <button className="btn btn-lg btn-danger" onClick={logout}>Log Out</button>
      </div>
        

        <MatchList
            userid={profile._id}
            />          

      
     
      <div className="card-footer text-center m-3">
        <h2>Can't find your ideal bet? Create a new competition here</h2>
        <Link to={{ pathname: `/matchup/` }}>
          <button className="btn btn-lg btn-danger">Create Game!</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
