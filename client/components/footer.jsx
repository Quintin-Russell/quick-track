import React from 'react';

export default class Footer extends React.Component {

  footerIndincator(path, href) {
    const standard = 'footer-icon-cont';
    const circle = 'footer-icon-cont indicator-circle';
    if (path === href) {
      return circle;
    } else {
      return standard;
    }
  }

  render() {
    return (
      <footer className="footer-cont row">
        {
          this.props.pages.map(page => (
            <FooterIcons key={page.hash} page={page} footerIndincator={this.footerIndincator(this.props.route.path, page.hash)}/>
          ))
        }
      </footer>
    );
  }
}

function FooterIcons(props) {
  const { hash, imgSrc, imgAlt } = props.page;
  if (props.page.footerIcon) {
    return (
    <a className={props.footerIndincator} href= {hash}>
      <img src={imgSrc} alt={imgAlt} className="footer-icon"></img>
    </a>
    );
  } else {
    return <></>;
  }

}
