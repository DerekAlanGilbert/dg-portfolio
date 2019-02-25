import React, { Component } from "react";
import axios from "axios";
import PortfolioSideBarList from "../portfolio/portfolio-sidebar-list";
import PortfolioForm from "../portfolio/portfolio-form";

export default class PortfolioManager extends Component {
  constructor(){
    super();

    this.state = {
      portfolioItems: [],
      portfolioToEdit: {}
    }
    this.handleNewFormSubmission = this.handleNewFormSubmission.bind(this);
    this.handleEditFormSubmission = this.handleEditFormSubmission.bind(this);
    this.handleFormSubmissionError = this.handleFormSubmissionError.bind(this);
    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.clearPortfolioToEdit = this.clearPortfolioToEdit.bind(this);
  }
  
  clearPortfolioToEdit () {
    this.setState({
      portfolioToEdit: {}
    })
  }
  
  handleNewFormSubmission(portfolioItem) {
    this.setState({
      portfolioItems: [portfolioItem].concat(this.state.portfolioItems)
    })
  }
  handleEditFormSubmission () {
    this.getPortfolioItems();
  }
  
  handleFormSubmissionError (error) {
    console.log("ERROR::handleFormSubmissionError", error)
  }
  //get
  getPortfolioItems () {
    axios.get('https://derekgilbert.devcamp.space/portfolio/portfolio_items?order_by=created_at&direction=desc')
    .then( response => {
      this.setState({ portfolioItems: [...response.data.portfolio_items]})
    })
    .catch( error => {
      console.log('ERROR::getPortfolioItems ', error)
    })
  }
  //edit
  handleEditClick (portfolioItem){
    this.setState({portfolioToEdit: portfolioItem})
  }
  //delete
  handleDeleteClick (portfolioItem) {
    axios.delete(`https://derekgilbert.devcamp.space/portfolio/portfolio_items/${portfolioItem.id}`, { withCredentials: true})
    .then(response => {
      this.setState({ portfolioItems: this.state.portfolioItems.filter(item => { return item.id !== portfolioItem.id })})
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
            portfolioToEdit={this.state.portfolioToEdit}
            clearPortfolioToEdit={this.clearPortfolioToEdit}
            handleNewFormSubmission={this.handleNewFormSubmission}
            handleEditFormSubmission={this.handleEditFormSubmission}
            handleFormSubmissionError={this.handleFormSubmissionError}
            />
        </div>
        <div className="right-column">
          <PortfolioSideBarList 
            data={this.state.portfolioItems} 
            handleDeleteClick={this.handleDeleteClick} 
            handleEditClick={this.handleEditClick}/>
        </div>
      </div>
    );
  }
}