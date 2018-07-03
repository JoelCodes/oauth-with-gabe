import React, { Component } from 'react';
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true };
  }

  componentDidMount() {
    axios.get('/api/me')
      .then(({ data }) => {
        this.setState({ loading: false, me: data });
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return (
        <h1>
Loading
        </h1>
      );
    }
    if (this.state.me) {
      return (
        <h1>
Hi, 
{' '}
{this.state.me.displayName}
        </h1>
      );
    }
    return (
      <h1>
I don't know you
        {' '}
        <a href="/auth/google">
Gooooooogs!
        </a>
      </h1>
    );
  }
}
