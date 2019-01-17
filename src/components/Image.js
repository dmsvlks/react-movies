import React, { PureComponent } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 33%;
  margin-top: 5px;
  box-shadow: 0px 1px 2px hsla(0, 0%, 0%, 0.2);
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(.25,.8,.25,1);

  :hover {
    ${props => props.hover && 'transform: scale(1.03);'}
  }

  @media screen and (max-width: 900px) {
    & {
      width: 49%;
    }
  }
`;

const ShowImage = styled.img`
  margin-bottom: -3px;
  border-radius: 3px;
  ${props =>
    props.open
      ? 'margin: auto; position: fixed; top:0; bottom:0; left:0; right:0; max-height:100%; max-width:100%; z-index: 900; border-radius: 0px;'
      : 'width: 100%;'}
`;

const Title = styled.div`
  position: absolute;
  top: 5px;
  width: 100%;
  color: #fff;
  font-size: 1.3rem;
  font-weight: bold;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
  text-align: center;
`;

const Background = styled.div`
  position: fixed;
  top: 0;
  bottom: -1px;
  left: 0;
  right: 0;
  background: hsla(0, 0%, 0%, 0.95);
  z-index: 800;
`;

const Spinner = styled.div`
  position: absolute;
  z-index: 999;
  ${props => props.open && 'position: fixed; top:50%; left:50%; transform: translate(-50%, -50%);' }
`

class Image extends PureComponent {
  state = {
    open: false,
    hover: false
  }

  render() {
    const { path } = this.props;
    const { open, hover } = this.state;

    return (
      <Wrapper hover={!open} onClick={() => { this.setState(state => ({ open: !state.open })); }}>
        <ShowImage 
          src={open ? `https://image.tmdb.org/t/p/w1280${path}` : `https://image.tmdb.org/t/p/w300${path}`}
          open={open}
        />

        {open && <Background />}
      </Wrapper>
    );
  }
}

export default Image;