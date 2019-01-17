import React, { Component } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const Wrapper = styled.header`
  display: flex;
  align-items: flex-end;
  height: 70px;
  padding: 0 10px 0 10px;
`;

const Title = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 2.1rem;
  font-weight: bolder;
  color: #333;
  height: 100%;
  border-top: 5px solid hsl(210, 60%, 55%);;
  transform: translateX(-50%);
  letter-spacing: 1px;
`;

const Menu = styled.nav`
  display: inline-block;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: bolder;
  color: #999;
  padding-bottom: 10px;

  li {
    display: inline-block;
    transition: border-bottom ease-in-out 0.15s;
    border-bottom: 3px solid transparent;
    margin: 0 10px;
    padding-bottom: 3px;
    cursor: pointer;

    a {
      color: #444;
    }

    :hover {
      border-bottom: 3px solid hsl(210, 60%, 55%);
    }
  }

    li:first-child {
      margin-left: 0;
    }
`;

class Header extends Component {
  render() { 
    const { onPopular, onTopRated } = this.props;
    return (
      <Wrapper>
        <div style={{width: '50%'}}>
          <Menu>
            <li><NavLink exact to='/'>Home</NavLink></li>
            {' | '}
            <li><NavLink to="/discover">Discover</NavLink></li>
          </Menu>
        </div>
        <Title><span style={{marginBottom: 15}}>{this.props.children}</span></Title>
      </Wrapper>
    )
  }
}
 
export default Header;