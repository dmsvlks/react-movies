import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import styled from "styled-components";

import { Header } from './components';
import Home from './pages/Home/Home';
import Discover from './pages/Discover/Discover';
import MovieDetailsPage from './pages/MovieDetails/MovieDetails'

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div style={{ background: 'white', borderBottom: '1px solid hsl(0, 0%, 75%)'}}>
            <Container>
              <Header>Movie Info</Header>
            </Container>
          </div>
          <Container>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route path='/discover' component={Discover} />
              <Route path='/movie/:id' component={MovieDetailsPage} />
              <Redirect to='/'/>
            </Switch>
          </Container>
        </div>
      </Router>
    );
  }
}

export default App;

