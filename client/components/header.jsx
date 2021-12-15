import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <header className="header-cont col">
          <i onClick={this.props.toggleMenu} className="fas fa-bars header-bars"></i>
        <div className="row just-cent">
          <a href="">
            <img className="header-logo" src="images/quick-track-logo.png" alt="quick-track-logo"></img>
          </a>
        </div>
          <div className="row">
            <div className="pg-id-cont row">
              <section className="pg-id-img-cont">
                <PgId
                pages={this.props.pages}
                route={this.props.route}/>
            </section>
          </div>
            <CreateIcon
            route={this.props.route}
            pages={this.props.pages}/>
            </div>
          </header>
    );
  }
}

function CreateIcon(props) {
  if (!props.route.path) {
    return <></>;
  }
  const route = `#${props.route.path}`;
  const pg = props.pages.find(page => {
    return page.hash === route;
  });
  if (pg && pg.createQuery) {
    return (
      <a
      onClick= {props.handleCreatIconClick}
      href={pg.createQuery}
      className="create-cont">
        <i className="fas fa-plus-circle create-icon"></i>
      </a>
    );
  } else {
    return <></>;
  }
}

function PgId(props) {
  if (!props.route.path) {
    return (
      <>
    <img
    src="images/home.png"
    alt="home-icon"
    className="pg-id-img"/>
    <p className="pg-id-txt">Home</p>
    </>
    );
  }
  const route = `#${props.route.path}`;
  for (const page of props.pages) {
    if (page.hash === route) {
      return (
        <>
          <img
          src={page.imgSrc}
          alt={page.imgAlt}
          className="pg-id-img" />
          <p className="pg-id-txt">{page.name}</p>
        </>
      );
    }
  }
}
