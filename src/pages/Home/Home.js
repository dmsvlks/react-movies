import React, { Component } from 'react';
import styled from 'styled-components';

import Search from 'components/Search';
import Results from 'components/Results';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-bottom: 70px;
`;

class Home extends Component {
  state = {
    results: []
  }

  componentDidMount() {
    fetch(`http://api.themoviedb.org/3/movie/now_playing?api_key=0b002a83940472278a2adfacec7a12d8`)
      .then(res => res.json())
      .then(res => this.setState({ results: res.results }))
  }

  handleResults = results => this.setState({ results });
  
  render() {
    return (
      <Wrapper>
        <Search onResults={this.handleResults}/>
        <Results data={this.state.results}/>
      </Wrapper>
    );
  }
}

export default Home;