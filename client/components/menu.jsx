import React from 'react';

export default function Menu(props) {
  return (
    <div className="overlay">
      <div className="menu-cont">
        <div className="header-cont">
            <i onClick={props.toggleMenu} className="fas fa-angle-double-left"></i>
          <a onClick={props.toggleMenu} className="header-logo-cont" href="#">
              <img className="menu-header-logo" src="images/quick-track-logo.png" alt="quick-track-logo"></img>
            </a>
          <h1 className="menu-txt">
            Menu
                </h1>
        </div>
        <div className="menu-icon-cont col">
          {props.pages.map(page => {
            if (page.menuIcon) {
              return (
                <a onClick={props.toggleMenu} className="menu-header-cont" key={page.hash} href={page.hash}>
                  <img className='menu-icon-img' src={page.imgSrc} alt={page.imgAlt} />
                  <p className="pg-id-txt menu-icon-txt">{page.name}</p>
                </a>
              );
            } else {
              return <></>;
            }
          })}
        </div>
        <div className="menu-footer-cont">
          <p className="menu-txt">
            Designed by Quintin Russell
            QuickTrack Finance 2021
                </p>
        </div>
      </div>
    </div>
  );
}
