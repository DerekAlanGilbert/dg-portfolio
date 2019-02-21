import React from 'react';

const PortfolioSideBarList = (props) => {
  const portfolioList = props.data.map(portfolioItem => {
    return (
      <div key={portfolioItem.id} className="portfolio-item-thumb">
        <div className="portfolio-thumg-img">
          <img src={portfolioItem.thumb_image_url}/>
        </div>
        <h1 className="title">{portfolioItem.name}</h1>
        <h2>{portfolioItem.id}</h2>
        <a className="delete-item" onClick={() => props.handleDeleteClick(portfolioItem)}> Delete {portfolioItem.name}</a>
      </div>
    )
  });
  
  
  return <div className="portfolio-sidebar-list-wrapper"> { portfolioList } </div>;
}

export default PortfolioSideBarList;