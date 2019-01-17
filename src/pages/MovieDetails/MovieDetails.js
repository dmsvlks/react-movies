import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const api = 'api_key=0b002a83940472278a2adfacec7a12d8';

import Image from 'components/Image';

const Wrapper = styled.div`
  overflow: hidden;
  position: relative;
  padding: 10px;
  background: hsl(0, 0%, 98%);
`;

const Poster = styled.img`
  margin-right: 20px;
  border-radius: 3px;
  box-shadow: 0px 1px 2px hsla(0, 0%, 0%, 0.2);

  @media screen and (max-width: 450px) {
    & {
      display: none;
    }
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-self: stretch;
`;

const Title = styled.h2`
  text-align: center;
  margin: 0;
  margin-bottom: 5px;
`;

const Tagline = styled.div`
  text-align: center;
  margin-bottom: 20px;
  font-size: 0.9rem;
`;

const Overview = styled.div`
  margin-bottom: 10px;
  text-align: justify;
`;

const VideoWrapper = styled.div`
  position: relative;
  width: 49.8%;
  height: 0;
  padding-bottom: 26%;
  margin-bottom: 5px;
  box-shadow: 0px 1px 2px hsla(0, 0%, 0%, 0.2);
  border-radius: 3px;

  @media screen and (max-width: 450px) {
    & {
      width: 100%;
      padding-bottom: 56.5%;
    }
  }
`;

const StyledLink = styled(Link)`
  width: 16.3%;
  box-shadow: 0px 1px 2px hsla(0, 0%, 0%, 0.2);
  border-radius: 3px;
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);

  :hover {
    transform: scale(1.03);
  }

  @media screen and (max-width: 450px) {
    & {
      width: 33%;
    }
  }
`;

class MovieDetailsPage extends Component {
  state = {
    details: null,
    images: null,
    videos: null,
    recommendations: null,
    reviews: null
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.fetchMovie(id);
  }

  componentDidUpdate = prevProps => {
    const oldId = prevProps.match.params.id;
    const newId = this.props.match.params.id;

    if (newId !== oldId) {
      this.fetchMovie(newId)
      window.scrollTo(0, 0);
    }
  }

  fetchMovie = id => {
    fetch(`http://api.themoviedb.org/3/movie/${id}?${api}`)
      .then(res => res.json())
      .then(details => this.setState({ details }));

    fetch(`http://api.themoviedb.org/3/movie/${id}/images?${api}`)
      .then(res => res.json())
      .then(res => this.setState({ images: res.backdrops.slice(0, 6) }))

    fetch(`http://api.themoviedb.org/3/movie/${id}/videos?${api}`)
      .then(res => res.json())
      .then(res => {
        const filteredVideos = res.results.filter(video => video.name.toLowerCase().includes('official') || video.name.toLowerCase().includes('trailer')).slice(0, 2);
        this.setState({ videos: filteredVideos });
      })

    fetch(`http://api.themoviedb.org/3/movie/${id}/recommendations?${api}`)
      .then(res => res.json())
      .then(res => this.setState({ recommendations: res.results.slice(0, 6) }))

    fetch(`http://api.themoviedb.org/3/movie/${id}/reviews?${api}`)
      .then(res => res.json())
      .then(res => console.log(res));
  }

  render() {
    const { details, images, videos, recommendations } = this.state;
    return (
      <Wrapper>
        <div style={{display: 'flex', justifyContent: 'center', marginBottom: 30}}>
          {details && <div><Poster src={`https://image.tmdb.org/t/p/w342${details.poster_path}`} /></div>}
          <Info>
            {details && 
              <Fragment>      
                <Title>{details.title} <span style={{fontSize: '1.2rem'}}>({details.release_date.split('-')[0]})</span></Title>
                <Tagline>{details.tagline}</Tagline>
                <div style={{textAlign: 'center', marginBottom: 30}}>{details.genres.map(genre => <a key={genre.id} style={{marginRight: 10}} href=''>{genre.name}</a>)}</div>
                <Overview>{details.overview}</Overview>
                <div style={{display: 'flex', justifyContent: 'space-around', marginBottom: 20}}>
                  <span>Budget: {details.budget > 0 ? <span style={{fontWeight: 'bold'}}>${details.budget.toLocaleString()}</span> : 'No data'}</span>
                  <span>Revenue: {details.revenue > 0 ? <span style={{fontWeight: 'bold'}}>${details.revenue.toLocaleString()}</span> : 'No data'}</span>
                </div>
              </Fragment>
            }

            {images && 
              <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                {images.map(image => <Image key={image.file_path} path={image.file_path} />)}
              </div>
            }  
          </Info>
        </div>     

        {videos && 
          <Fragment>
            <span style={{display: 'inline-block', fontSize: '1.1rem', marginBottom: 5, fontWeight: 'bolder'}}>Videos:</span>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: videos.length === 1 ? 'center' : 'space-between', alignItems: 'flex-start', marginBottom: 30}}>
              {videos.map(video => 
                <VideoWrapper key={video.key}>
                  <iframe style={{position: 'absolute', left: 0, right: 0, width: '100%', height: '100%', borderRadius: 3}} src={`https://www.youtube.com/embed/${video.key}`} allowFullScreen />
                </VideoWrapper>
              )}
            </div>
          </Fragment>
        }
        
        {recommendations &&
          <Fragment>
            <span style={{display: 'inline-block', fontSize: '1.1rem', marginBottom: 5, fontWeight: 'bolder'}}>Recommended movies: </span>
            <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center'}}>
              {recommendations.map(image => 
                <StyledLink key={image.id} to={`/movie/${image.id}`}>
                  <img style={{width: '100%', marginBottom: -3, borderRadius: 3}} src={`https://image.tmdb.org/t/p/w185${image.poster_path}`} />
                </StyledLink> 
              )}
            </div>
          </Fragment>
        }
      </Wrapper>
    );
  }
}

export default MovieDetailsPage;

