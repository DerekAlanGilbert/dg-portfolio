import React, { Component } from 'react';
import axios from 'axios';

import PortfolioItem from './portfolio-item.js'

export default class PortfolioContainer extends Component {
  constructor () {
    super();

    this.state = {
      pageTitle: 'Welcome to my Portfolio',
      isLoading: false,
      data: [],
    }
    this.handlerFilter = this.handlerFilter.bind(this)
  }
  getPortfolioItems () {
    axios
    .get("https://derekgilbert.devcamp.space/portfolio/portfolio_items")
    .then(res => {
      this.setState({data: res.data.portfolio_items})
    })
    .catch(err => {
      console.log(err)
    })
  }

  handlerFilter (filter) {
    this.setState({
      data: this.state.data.filter(item => {
        return item.category === filter
      })
    })
  }

  portfolioItems () {
    return this.state.data.map( item => {
      return <PortfolioItem key={ item.id } item={ item }/>
    })
  }
// lifecycle hook
  componentDidMount () {
    this.getPortfolioItems();
  }

  render () {
    if (this.state.isLoading) {
      return <div>Loading...</div>
    }
    return (
      <div className="portfolio-items-wrapper">
        <button className="btn" onClick={ () => this.handlerFilter('eCommerce')}>
         Ecommerce 
         </button>
        <button className="btn" onClick={ () => this.handlerFilter('Communication')}>
         Communication 
         </button>
        <button className="btn" onClick={ () => this.handlerFilter('Marketing')}>
         Marketing 
         </button>
        { this.portfolioItems() }
      </div>
    )
  }
}