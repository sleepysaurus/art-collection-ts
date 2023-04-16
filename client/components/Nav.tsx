import { useState } from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  const [burgerVisible, setBurgerVisible] = useState(false)

  const toggleBurger = () => {
    setBurgerVisible((currentBurgerState) => !currentBurgerState)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <button 
            onClick={toggleBurger} 
            className={`navbar-burger burger ${burgerVisible ? 'is-active' : ''}`}
            data-target="navbarMenuHeroA"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div id="navbarMenuHeroA" className={`navbar-menu ${burgerVisible ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <Link className="button is-primary is-normal nav-item" to="/">View collection</Link>
            <Link className="button is-primary is-normal nav-item" to="/add">Add art</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Nav
