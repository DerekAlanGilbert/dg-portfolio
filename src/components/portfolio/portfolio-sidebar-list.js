import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PortfolioSideBarList = (props) => {
  const portfolioList = props.data.map(portfolioItem => {
    return (
      <div key={portfolioItem.id} className="portfolio-item-thumb">
        <div className="portfolio-thumg-img">
          <img src={portfolioItem.thumb_image_url}/>
        </div>
        <div className="portfolio-action-wrapper">
          <div className="title">{portfolioItem.name}</div>
          <a className="delete-icon" onClick={() => props.handleDeleteClick(portfolioItem)}>
          <FontAwesomeIcon icon="trash"/>
        </a>
        </div>
      </div>
    )
  });
  
  
  return <div className="portfolio-sidebar-list-wrapper"> { portfolioList } </div>;
}

export default PortfolioSideBarList;