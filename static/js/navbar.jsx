const { NavLink } = ReactRouterDOM;

function Navbar(props) {
  const { getLogout, getCoinName, getCoinInfo} = props;

  const handleLogout = (e) => {
    e.preventDefault();

    fetch("/logout-process", {
      method: "POST",
      body: JSON.stringify({'logout': true}),
      headers: {
      'Content-Type': 'application/json'
    }
    })
    .then(res => res.json())
    .then((result) => {
      getLogout(result.userLogin)
      localStorage.removeItem('login')
    });
  }

  return (
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar ">
        <NavLink 
        to="/main"
        id="nav-brand"
        activeClassName="navlink-active"
        className="navbar-brand">
        <img src="../static/img/diamond-white.png" alt="" width="50" height="50"/>
        DiamondBase
        </NavLink>
        <NavLink 
        to="/main"
        id="nav-link-color"
        activeClassName="navlink-active"
        className="nav-link">Main
        </NavLink>
        <NavLink 
        to="/prices"
        id="nav-link-color"
        activeClassName="navlink-active"
        className="nav-link">Prices
        </NavLink>
        <NavLink 
        to="/exchange"
        id="nav-link-color"
        activeClassName="navlink-active"
        className="nav-link">Exchange
        </NavLink>
        <NavLink 
        to="/news"
        id="nav-link-color"
        activeClassName="navlink-active"
        className="nav-link">News
        </NavLink>
        <NavLink 
        to="/transaction"
        id="nav-link-color"
        activeClassName="navlink-active"
        className="nav-link">Transaction
        </NavLink>
    
        <CoinSearchForm
          getCoinName={getCoinName} 
          getCoinInfo={getCoinInfo}
        />
        <span className="navbar-nav ms-auto">
          <button className="btn btn-warning logout" onClick={handleLogout}>Logout</button>
        </span>
      </nav>
  )
}