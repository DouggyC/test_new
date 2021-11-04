import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache,createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Matchup from './pages/Matchup';
import Vote from './pages/Vote';
import NotFound from './pages/NotFound';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex-column justify-center align-center min-100-vh bg-primary">
          <Switch>
            <Route exact path="/">
              <Login />
            </Route>
            <Route exact path="/signup">
              <SignUp />
            </Route>               
            <Route exact path="/home/">
              <Home />
            </Route>            
            <Route exact path="/matchup/">
              <Matchup />
            </Route>
            <Route exact path="/matchup/:id">
              <Vote />
            </Route>
            <Route>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
