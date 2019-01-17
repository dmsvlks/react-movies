import React, { Component } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Wrapper = styled(Link)`
  width: 19.5%;
  margin-bottom: 10px;
  border: 1px solid #333;
  border-radius: 3px;
  background: white;
  cursor: pointer;
  box-shadow: 0px 1px 2px hsla(0, 0%, 0%, 0.2);

  @media screen and (max-width: 980px) {
    & {
      width: 24.8%;
    }
  }

  @media screen and (max-width: 750px) {
    & {
      width: 33%;
    }
  }

  @media screen and (max-width: 450px) {
    & {
      width: 49.5%;
    }
  }
`;

const Image = styled.img`
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px;
  font-size: 0.9rem;
  color: hsl(0, 0%, 30%);
`;

const Rating = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Year = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  font-weight: bolder;
  padding: 5px;
  margin-top: -4px;
  font-size: 1.1rem;
  color: #333;
`;

class MovieCard extends Component {
  render() {
    const { id, title, vote_average, release_date, poster_path } = this.props;
    return (
      <Wrapper to={`/movie/${id}`}>
        {poster_path ? <Image src={`http://image.tmdb.org/t/p/w185/${poster_path}`} /> : <div style={{ display: 'flex', width: '100%', justifyContent: 'center', alignItems: 'center', letterSpacing: 1, flexGrow: 1}}>No image available</div>}
        <Title>{title}</Title>
        <Info>
          <Rating>
            <div>Rating</div>
            <div><span style={{fontWeight: 'bolder'}}>{vote_average}</span></div>
          </Rating>
          <Year>
            <div>Year</div>
            <div><span style={{fontWeight: 'bolder'}}>{release_date.split('-')[0]}</span></div>
          </Year>
        </Info>
      </Wrapper>
    )
  }
}
 
export default MovieCard;