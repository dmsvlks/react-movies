import React, { Component } from 'react';
import styled from 'styled-components';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/filter';

import { searchMovie } from '../services/searchService';

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 10px;
  background: hsl(0, 0%, 98%);
  padding: 10px;
`;

const SearchBar = styled.input`
  width: 100%;
  max-width: 700px;
  padding: 5px;
  padding-left: 10px;
  border-radius: 5px;
  font-size: 1rem;
  font-family: 'Assistant', sans-serif;
  border: 1px solid hsl(0, 0%, 60%);
  box-shadow: inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08);
  outline: none;
  transition: all 0.2s ease-in-out;

  :focus {
    box-shadow: 0 0 0 1px #4D90FE;
  }
`;

class Search extends Component {
  componentDidMount() {
    this.search.focus();
    Observable.fromEvent(this.search, 'input')
      .debounceTime(500)
      .map(e => e.target.value)
      .filter(query => query.length > 1)
      .distinctUntilChanged()
      .subscribe(async query => {
        const results = await searchMovie(query);
        this.props.onResults(results);
      });
  }

  render() { 
    return (
      <Wrapper>
        <SearchBar innerRef={node => this.search = node} placeholder='Search...' />
      </Wrapper>
    )
  }
}
 
export default Search;