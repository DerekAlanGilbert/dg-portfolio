import React, { Component } from 'react';
import Axios from 'axios';

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    // BINDINGS
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
      errorText: ''
    });
  }

  handleSubmit(event) {
    Axios.post('https://api.devcamp.space/sessions',
    {
      client: {
        email: this.state.email,
        password: this.state.password,
        errorText: ''
      }
    },
    { 
    withCredentials: true })
    .then( res => {
      if (res.data.status === 'created') {
        this.props.handleSuccessfulAuth();
      } else {
        this.props.handleUnsuccessfulAuth();
        this.setState({ errorText: 'Wrong Email or Password' })
      }
      })
    .catch( err => {
      this.setState({ errorText: 'An Error Has Occured'})
      this.props.handleUnsuccessfulAuth();
      console.log(err)
    });
    event.preventDefault();
  }

  render() {
    return (
 <div>
        <h1>LOGIN TO ACCESS YOUR DASHBOARD</h1>

        <div> { this.state.errorText } </div>

        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={this.state.email}
            onChange={this.handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Your password"
            value={this.state.password}
            onChange={this.handleChange}
          />

          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    );
  }
}