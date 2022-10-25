import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
    
    return (
      <header className="header">
        <Link to="/">
          <img width={20} height={20} src="img/logo.gif" />
        </Link>
        <h3 className="name">Hacker News</h3>
      </header>
    );
  }
  
  export default Header;