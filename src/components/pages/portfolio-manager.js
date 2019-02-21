import React, { Component } from "react";
import axios from "axios";
import PortfolioSideBarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor(){
    super();

    this.state = {
      portfolioItems: []
    }
    this.handleSuccessfulFormSubmission = this.handleSuccessfulFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
  }
  
  handleSuccessfulFormSubmission(portfolioItem) {
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
    })
  }
  
  handleFormSubmissionError (error) {
    console.log("ERROR::handleFormSubmissionError", error)
  }
  
  getPortfolioItems () {
    axios.get('https://derekgilbert.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc')
    .then( response => {
      this.setState({ portfolioItems: [...response.data.portfolio_items]})
    })
    .catch( error => {
      console.log('ERROR::getPortfolioItems ', error)
    })
  }
  
  handleDeleteClick (portfolioItem) {
    axios.delete(`https://derekgilbert.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { withCredentials: true})
    .then(response => {
      this.setState({ portfolioItems: this.state.portfolioItems.filter(item => { return item.id !== portfolioItem.id })})

      console.log(response)
    })
    .catch( error => {
      console.log('ERROR::handleDeleteClick', error)
    })
  }
  // lifecycyle
  componentDidMount(){
    this.getPortfolioItems()
  }
  render() {
    return (
      <div className="portfolio-manager-wrapper">
        <div className="left-column">
          <PortfolioForm 
            handleSuccessfulFormSubmission={this.handleSuccessfulFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}/>
        </div>
        <div className="right-column">
          <PortfolioSideBarList data={this.state.portfolioItems} handleDeleteClick={this.handleDeleteClick}/>
        </div>
      </div>
    );
  }
}