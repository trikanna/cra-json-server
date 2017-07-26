import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import styled from 'styled-components';

const DataDebug = styled.pre`
  padding: 5px;
  text-align: left;
  background: #eee;
  border-radius: 3px;
  margin: 30px auto;
  position: relative;
  width: calc(50% - 40px);
  float: right;
  overflow: scroll;

  &:before {
    text-transform: uppercase;
    font-size: 11px;
    font-family: arial, helvetica, sans-serif;
    font-weight: bold;
    position: absolute;
    top: -20px;
    left: 0px;
    content: 'data from json-server';
    color: red;
  }
`;

const AuthorList = styled.ul`
  margin: 20px auto;
  padding: 0;
  list-style: none;
  text-align: left;
  width: calc(50% - 40px);
  float: left;
`;

const ListItem = styled.li`
  padding: 10px;
  margin: 10px 0 20px 0;
  border: 1px solid #eee;
  text-align: left;
  border-radius: 5px;
  box-shadow: 1px 2px 1px rgba(0,0,0,0.2);

  ul {
    float: none;
    list-style: none;
    margin: 0;
    padding: 0;

    li {
      margin: 10px;
      background: rgb(97, 218, 251);
      color: black;
      border: none;
      box-shadow: none;
    }
  }
`;

const Loading = styled.p`
  text-align: center;
  font-weight: bold;
  color: silver;
  margin-top: 50px;
`;

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:4000/authors?_embed=posts')
      .then(response => response.json())
      .then(json => {

        setTimeout(_ => {
          this.setState({
            data: json
          });
        }, 2000);

      });
  }

  render() {
    return (
      <div className="App">

        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>

        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>

        <hr />

        {/* data rendering start */}

        <div style={{width: '90%', margin: '0 auto'}}>

          <AuthorList>
            {this.state.data ? this.state.data.map(author => {
              return (
                <ListItem key={author.id}>
                  #{author.id}, {author.name} <i style={{color:'silver'}}>as {author.email}</i>
                  <ul>
                    {author.posts.map(post => {
                      return(
                        <ListItem key={post.id}>#{post.id} - {post.title}</ListItem>
                      )
                    })}

                  </ul>
                </ListItem>
              )
            }) : <Loading>loading...</Loading>}
          </AuthorList>

          {/* data rendering end */}

          {
            this.state.data ? <DataDebug>{JSON.stringify(this.state.data, null, 2)}</DataDebug> : null
          }

        </div>

      </div>
    );
  }
}

export default App;
