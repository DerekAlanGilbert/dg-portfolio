import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';

import NavigationContainer from './navigation/navigation-container.js';
import Home from './pages/home.js';
import About from './pages/about.js';
import Auth from './pages/auth.js';
import Contact from './pages/contact.js';
import Blog from './pages/blog.js';
import NoMatch from './pages/no-match.js';
import PortfolioManager from './pages/portfolio-manager.js';
import PortfolioDetail from './portfolio/portfolio-detail.js';

export default class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN"
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
  }

  handleSuccessfulLogin () {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    });
  }

  handleUnsuccessfulLogin () {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  checkLoginStatus () {
    return axios
        .get('https://api.devcamp.space/logged_in', { 
          withCredentials: true
         })
        .then(res => {
          const loggedIn = res.data.logged_in;
          const loggedInStatus = this.state.loggedInStatus;

          if (loggedIn && loggedInStatus === "LOGGED_IN") {
            return loggedIn
            } else if (loggedIn && loggedInStatus === "NOT_LOGGED_IN") {
              this.setState({ loggedInStatus: "LOGGED_IN"});
              } else if (!loggedIn && loggedInStatus  === "LOGGED_IN") {
                this.setState({loggedInStatus: "NOT_LOGGED_IN"});
            }
          })
        .catch(err => {
          console.log(`ERROR:: ${err}`)
        });
      }

  componentDidMount() {
    this.checkLoginStatus();
    }

  athorizedPages() {
    return [<Route key="porfolio-manager" path="/portfolio-manager" component={PortfolioManager} />];
  }

  render() {
    return (
      <div className='container'>
      <Router>
        <div>
        <NavigationContainer loggedInStatus={ this.state.loggedInStatus } handleSuccessfulLogout={ this.handleSuccessfulLogout }/>
        <Switch>
          <Route exact path="/" component={Home} />

          <Route 
            path="/auth" 
            render={ props => (
              <Auth { ...props }
                handleSuccessfulLogin={this.handleSuccessfulLogin}
                handleUnSuccessfulLogin={this.handleUnsuccessfulLogin} />) } />
          
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/blog" component={Blog} />
          { this.state.loggedInStatus === "LOGGED_IN" ? this.athorizedPages() : null }
          <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
          <Route component={NoMatch} />
        </Switch>
        </div>
      </Router>
      </div>
    );
  }
}
