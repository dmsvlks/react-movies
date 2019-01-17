import React, { Component } from 'react';
import styled from 'styled-components';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
const cSWT = Slider.createSliderWithTooltip;
const Range = cSWT(Slider.Range);

import Select, { Async }  from 'react-select';
import 'react-select/dist/react-select.css';

import Results from 'components/Results';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
`;

const SideMenu = styled.div`
  width: 270px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
`;

const Option = styled.div`
  margin-bottom: 30px;
  padding: 5px;
`;

const Search = styled.button`
  background: none;
  padding: 8px 15px;
  font-family: 'Assistant', sans-serif;
  font-size: 1rem;
  background:  hsl(210, 60%, 52%);
  border: 1px solid hsl(210, 55%, 40%);
  color: white;
  border-radius: 3px;
  cursor: pointer;
  align-self: flex-end;
  margin-top: 25px;
  transition: all 0.2s ease-in-out;
  box-shadow: 0px 1px 2px hsla(0, 0%, 0%, 0.2);

  :hover {
    background:  hsl(210, 60%, 47%);
  }

  :active {
    transform: scale(0.98);
    background:  hsl(210, 50%, 42%);
  }
`;

const Sort = Search.extend`
  position: absolute;
  margin: 0;
  font-size: 0.9rem;
  padding: 5px 10px;
  right: 10px;
  top: 8px;
  background: none; 
  color: hsl(210, 60%, 55%); 
  border: 1px solid hsl(210, 60%, 52%);
  transition: all 0.2s ease-in-out;

  :hover {
   background:  hsl(210, 60%, 52%);
   color: white;
  }

  :active {
    background:  hsl(210, 60%, 47%);
    transform: scale(0.98);
    color: white;
  }
`;

const Saying = styled.div`
  height: 40px;
  font-size: 1.3rem;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
`;

const Label = styled.label`
  margin-top: 20px;

  input {
    margin-left: 10px;
    vertical-align: middle;
  }
`;

class Discover extends Component {
  state = {
    results: [],
    genres: [],
    sortBy: '',
    ratings: [0, 10],
    years: [1918, 2018],
    includeUnpopular: false
  }

  getOptions = () => (
    fetch(`http://api.themoviedb.org/3/genre/movie/list?api_key=0b002a83940472278a2adfacec7a12d8`)
      .then(res => res.json())
      .then(res => ({ options: res.genres.map(item => ({ value: item.id, label: item.name }))}))
    )

  handleGenreChange = genres => {
    this.setState({ genres });
  }

  handleRatingChange = ratings => {
    this.setState({ ratings });
  }

  handleYearChange = years => {
    this.setState({ years });
  }

  handleUnpopularChange = e => {
    this.setState({ includeUnpopular: e.target.checked });
  }

  handleSearch = () => {
    const sortBy = this.state.sortBy.value || 'popularity.desc';
    const ids = this.state.genres.map(item => item.value).join(',');
    const voteGte = this.state.ratings[0];
    const voteLte = this.state.ratings[1];
    const yearGte = this.state.years[0];
    const yearsLte = this.state.years[1];
    const voteCount = this.state.includeUnpopular ? 0 : 50;

    fetch(`http://api.themoviedb.org/3/discover/movie?api_key=0b002a83940472278a2adfacec7a12d8&with_genres=${ids}&vote_average.gte=${voteGte}&vote_average.lte=${voteLte}&release_date.gte=${yearGte}&release_date.lte=${yearsLte}&vote_count.gte=${voteCount}&sort_by=${sortBy}`)
      .then(res => res.json())
      .then(res => this.setState({ results: res.results }))
  }

  handleRatingSort = () => {
    const sorted = [...this.state.results].sort((a, b) => b.vote_average - a.vote_average);
    this.setState({ results: sorted });
  }

  handleSortChange = sortBy => {
    this.setState({ sortBy })
  }

  render() {
    return (
      <Wrapper>
        <SideMenu>
          <Async
            placeholder='Select genres..'
            multi={true}
            value={this.state.genres}
            onChange={this.handleGenreChange}
            loadOptions={this.getOptions}
          />

          <Option style={{marginTop: 25}}>
            <div style={{marginLeft: -5, marginBottom: 5}}>Rating:</div>
            <Range min={0} max={10} defaultValue={[0, 10]} onAfterChange={this.handleRatingChange} allowCross={false} pushable={true} marks={{0: '0', 10: '10'}} step={0.1} />
          </Option>

          <Option>
            <div style={{marginLeft: -5, marginBottom: 5}}>Release date:</div>
            <Range min={1918} max={2018} defaultValue={[1918, 2018]} onAfterChange={this.handleYearChange} allowCross={false} pushable={true} marks={{1918: '1918', 2018: '2018'}} />
          </Option>

          <Select
            placeholder='Sort by...'
            value={this.state.sortBy}
            onChange={this.handleSortChange}
            options={[
              {value: 'vote_average.desc', label: 'Rating'},
              {value: 'popularity.desc', label: 'Popularity'},
              {value: 'release_date.desc', label: 'Release date'}
            ]}
          />
          <span style={{ marginTop: 2, color: 'hsl(0, 0%, 60%)',  fontStyle: 'italic', fontSize: '0.85rem'}}>Default: popularity</span>

          <Label>
            <span>Include unpopular</span>
            <input type="checkbox" onChange={this.handleUnpopularChange} />
          </Label>
          

          <Search onClick={this.handleSearch}>Search</Search>        
        </SideMenu>

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', flexGrow: 1, background: 'hsl(0, 0%, 97%)' }}>
          {this.state.results.length > 0 && <Saying>Check out these movies:</Saying>}
          {this.state.results.length > 0 && <Sort onClick={this.handleRatingSort}>Sort by rating</Sort>}
          <Results data={this.state.results}/>
        </div>
        
      </Wrapper>
    );
  }
}

export default Discover;

