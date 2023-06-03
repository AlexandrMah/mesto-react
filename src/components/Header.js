import React from "react";
import logo from './../images/logo.svg';

function Header() {
  return (
    <header className ="header header_line">
      <img src={logo} alt="Логотип Mesto Russia" className ="header__logo"/>
    </header>
  )
}

export default Header;