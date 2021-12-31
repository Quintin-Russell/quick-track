import React from 'react';
import pages from '../pages';

export default class AccountSettings extends React.Component {

  readAccFunct() {
    if (!this.props.route.params.get('funct')) {
      return (
      <div className="acc-set-button-cont">
        <h2 className="menu-txt">What Would You Like To Do?</h2>
          <ul className="no-bullets acc-set-button-cont">
          {this.props.page.subPageHash.map(subPgHash => {
            const subPg = pages.find(subPg => subPg.hash === subPgHash);

            return (
            <li key={subPg.hash}>
              <a href={subPg.hash}>
                <button className='lrg-button'>
                  <img className='flex-10 footer-icon' src={subPg.imgSrc} alt={subPg.imgAlt} />
                    <p className='lrg-button-txt flex-90'>{subPg.name}</p>
                </button>
              </a>
            </li>
            );

          })}
        </ul>

      </div>
      );
    }
  }

  render() {
    return (
      <>
      {this.readAccFunct()}
      </>
    );
  }
}
