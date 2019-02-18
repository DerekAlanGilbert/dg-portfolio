import React, { Component } from 'react';
import Axios from 'axios';

export default class PortfolioForm extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      categoryname: '',
      description: '', 
      category: 'eCommerce',
      position: '',
      url: '',
      thumb_image: '',
      banner_image: '',
      logo: '',
    }
    
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  
  buildForm () {
    let formData = new FormData();
    
    formData.append('portfolio_item[name]', this.state.name)
    formData.append('portfolio_item[description]', this.state.description)
    formData.append('portfolio_item[url]', this.state.url)
    formData.append('portfolio_item[category]', this.state.category)
    formData.append('portfolio_item[position]', this.state.position)
    
    return formData;
  }
  
  handleChange (event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
  
  handleSubmit (event) {
    Axios
    .post(
      'https://derekgilbert.devcamp.space/portfolio/portfolio_items',
       this.buildForm(), { 
         withCredentials: true 
        })
        .then(response => {
          this.props.handleSuccessfulFormSubmission(response.data.portfolio_item)
        })
        .catch(error =>{
          console.log('ERROR::PortfolioFormHandleSubmit', error)
        })
        
    event.preventDefault();
  }
  
  render () {
    return (
      <div>
        <h1>Portfolio Form</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <input 
              type='text' 
              name='name' 
              placeholder='Porfolio Item Name' 
              value={this.state.name} 
              onChange={this.handleChange}/>
            <input 
              type='text' 
              name='url' 
              placeholder='Url' 
              value={this.state.url} 
              onChange={this.handleChange}/>
            </div>
          <div>
            <input 
              type='text' 
              name='position' 
              placeholder='Position' 
              value={this.state.position} 
              onChange={this.handleChange}/>
            <select 
              name='category' 
              value={this.state.category} 
              onChange={this.handleChange}>
               <option value="eCommerce" >eCommerce</option> 
               <option value="digitalMarketing">Digital Marketing</option> 
               <option value="Enterprise">Enterprise</option> 
               <option value="startUp">Start-up</option> 
            </select>
          </div>
          <div>
            <textarea 
              name='description' 
              placeholder='Description' 
              value={this.state.description}
              onChange={this.handleChange}/>
          </div>
          <div>
            <button type='submit'>SUBMIT</button>
          </div>
        </form>
      </div>
    )
  }
}