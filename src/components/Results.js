import React, { Component } from 'react';
import styled from 'styled-components';
import FlipMove from 'react-flip-move';

import MovieCard from './MovieCard';

const Wrapper = styled.div`
  display: flex;
  padding: 10px;
`;

class Results extends Component {
  render() { 
    const { data } = this.props;
    return (
      <Wrapper>
        <FlipMove 
          duration={350}
          staggerDelayBy={20}
          enterAnimation='fade'
          leaveAnimation='fade'
          style={{ 
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            flexGrow: 1
          }}
        >
          {data.map(item => <MovieCard key={item.id} {...item}/>)}
        </FlipMove>
      </Wrapper>
    )
  }
}
 
export default Results;