import { Link } from 'react-router-dom'

function Header () {
  return (
    <>
      <header className="header">
        {/* TAB INDEX: add here to make h1 focusable. tabIndex={0} */}
        <h1><Link to='/'>My Collection</Link></h1>
      </header>
    </>
  )
}

export default Header