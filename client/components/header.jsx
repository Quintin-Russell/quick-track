import React from 'react';

export default class Header extends React.Component {

  render() {
    return (
      <header className="header-cont col">
        <i onClick= { this.props.handleMenuClick } className="fas fa-bars header-bars"></i>
        <div className="row just-cent">
          <img onClick= { this.goHome } className="header-logo" src="images/quick-track-logo.png" alt="quick-track-logo"></img>
        </div>
          <div className="row">
            <div className="pg-id-cont row">
              <section className="pg-id-img-cont">
                <PgId pages={this.props.pages} route={this.props.route}/>
            </section>
          </div>
            <CreateIcon route={this.props.route} pages={this.props.pages}/>
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
      <a onClick= {props.handleCreatIconClick} href={pg.createQuery} className="create-cont">
        <i className="fas fa-plus-circle create-icon"></i>
      </a>
    );
  } else {
    return <></>;
  }
  // for (const pg of props.pages) {
  //   if ((pg.hash === route) && (pg.createQuery)) {
  //     return (
  //     <a onClick= {props.handleCreatIconClick} href={pg.createQuery} className="create-icon">
  //       <i className="fas fa-plus-circle create-icon"></i>
  //       </a>
  //     );
  //   }
  // }
}

function PgId(props) {
  if (!props.route.path) {
    return (
      <>
    <img src="images/home.png" alt="home-icon" className="pg-id-img"/>
    <p className="pg-id-txt">Home</p>
    </>
    );
  }
  const route = `#${props.route.path}`;
  for (const page of props.pages) {
    if (page.hash === route) {
      return (
        <>
          <img src={page.imgSrc} alt={page.imgAlt} className="pg-id-img" />
          <p className="pg-id-txt">{page.name}</p>
        </>
      );
    }
  }
}

// // raw html: for reference
// /* <div class="header-cont col">
//   <i class="fas fa-bars header-bars"></i>
//   <div class="row just-cent">
//     <img class="header-logo" src="images/quick-track-logo.png" alt="quick-track-logo">
//         </div>
//     <div class="row">
//       <div class="pg-id-cont row">
//         <section class="pg-id-img-cont">
//           <img class="pg-id-img" src="images/past-exp-logo.png" alt="past-expense-logo">
//             <p class="pg-id-txt">Past Expenses</p>
//             </section>
//           </div>
//         <div class="create-cont">
//           <i class="fas fa-plus-circle create-icon"></i>
//         </div>
//       </div>
//     </div> */
