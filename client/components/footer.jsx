import React from 'react';

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.parseRoute = props.parseRoute;
    this.state = {
      route: props.route
    };
  }

  footerIndincator(path, href) {
    path = `#${path}`;
    const standard = 'footer-icon-cont';
    const circle = 'footer-icon-cont indicator-circle';
    if (path === href) {
      return circle;
    } else {
      return standard;
    }
  }

  componentDidMount() {
    window.addEventListener('hashchange', e => {
      const route = this.parseRoute(window.location.hash);
      this.setState({ route });
    });
  }

  render() {
    return (
      <footer className="footer-cont row">
        {
          this.props.pages.map(page => (
            <FooterIcons key={page.hash} page={page} footerIndincator={this.footerIndincator(this.state.route.path, page.hash)}/>
          ))
        }
      </footer>
    );
  }
}

function FooterIcons(props) {
  const { hash, imgSrc, imgAlt } = props.page;
  return (
    <a className={props.footerIndincator} href= {hash}>
      <img src={imgSrc} alt={imgAlt} className="footer-icon"></img>
    </a>
  );
}
