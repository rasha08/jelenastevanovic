import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const MobileMenu = () => (
  <ul className="left col s12 hide-on-med-and-up mobile-menu">
    <li className="col s12">
      <Link to="/">
        <a className="waves-effect waves-light btn">POČETNA</a>
      </Link>
    </li>
    <li className="col s12">
      <Link to="/personalni-treninzi-za-zene">
        <a className="waves-effect waves-light btn">TRENINZI</a>
      </Link>
    </li>
    <li className="col s12">
      <Link to="/galerija">
        <a className="waves-effect waves-light btn">GALERIJA</a>
      </Link>
    </li>
    <li className="col s12">
      <Link to="/fitnes-blog-i-saveti-za-zene">
        <a className="waves-effect waves-light btn">BLOG</a>
      </Link>
    </li>
    <li className="col s12">
      <Link to="/fitnes-kuvar-i-zdrava-hrana">
        <a className="waves-effect waves-light btn">KUVAR</a>
      </Link>
    </li>
    <li className="col s12">
      <Link to="/kontakt">
        <a className="waves-effect waves-light btn">KONTAKT</a>
      </Link>
    </li>
  </ul>
);
class Header extends Component {
  constructor() {
    super();
    this.state = {
      showMenu: false
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    if (this.state.showMenu === true) {
      this.setState({
        showMenu: false
      });
    } else {
      this.setState({
        showMenu: true
      });
    }
  }
  render() {
    let menuComponent;
    if (this.state.showMenu) {
      menuComponent = <MobileMenu />;
    } else {
      menuComponent = <div />;
    }
    return (
      <div className="navbar-fixed col s12">
        <div className="row nav-wrapper">
          <div className="heading row">
            <ul className="left hide-on-med-and-up col s2 center-align">
              <button
                className="btn btn-floating btn-large go-down"
                onClick={this.toggleMenu}
              >
                <i className="material-icons">menu</i>
              </button>
            </ul>
            <div className="col l5 m6 s10 center-align">
              <h1>Personalni Trener</h1>
            </div>
            <div className="col l1 m1 s1">
              <img
                src="http://res.cloudinary.com/dgq2ohvtq/image/upload/v1496691641/logo_vuihpz.png"
                alt=""
                className="responsive-img center-align hide-on-med-and-down"
              />
            </div>
            <div className="col l6 m6 s10 offset-s2 center-align go-up">
              <h1>Jelena Stevanović</h1>
            </div>
            <hr className="left hide-on-med-and-up col s12 center-align" />
          </div>
          <div className="row">
            <ul className="left hide-on-small-and-down col s12">
              <li className="col l2 m2 s12 hide-on-med-and-up"><a>MENI</a></li>
              <li className="col l2 m2 s12">
                <Link to="/"><a>POČETNA</a></Link>
              </li>
              <li className="col l2 m2 s12">
                <Link to="/personalni-treninzi-za-zene"><a>TRENINZI</a></Link>
              </li>
              <li className="col l2 m2 s12">
                <Link to="/galerija"><a>GALERIJA</a></Link>
              </li>
              <li className="col l2 m2 s12">
                <Link to="/fitnes-blog-i-saveti-za-zene"><a>BLOG</a></Link>
              </li>
              <li className="col l2 m2 s12">
                <Link to="/fitnes-kuvar-i-zdrava-hrana"><a>KUVAR</a></Link>
              </li>
              <li className="col l2 m2 s12">
                <Link to="/kontakt"><a>KONTAKT</a></Link>
              </li>
            </ul>
          </div>
          {menuComponent}
        </div>
      </div>
    );
  }
}

export default Header;
