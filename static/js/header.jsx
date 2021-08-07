const { NavLink } = ReactRouterDOM;

function Header(props) {
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
    <header >
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navExpandContent4"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse" id="navExpandContent4">
          <div className="navbar-nav">
            <a className="nav-item nav-link" href="#">Link</a>
          </div>
        </div>
        <NavLink 
        to="/main"
        activeClassName="navlink-active"
        className="nav-link">Main</NavLink>
        <NavLink 
        to="/prices"
        activeClassName="navlink-active"
        className="nav-link">Prices</NavLink>
        <NavLink 
        to="/exchange"
        activeClassName="navlink-active"
        className="nav-link">Exchange</NavLink>
        <NavLink 
        to="/news"
        activeClassName="navlink-active"
        className="nav-link">News</NavLink>
        <NavLink 
        to="/transaction"
        activeClassName="navlink-active"
        className="nav-link">Transaction</NavLink>
        <button onClick={handleLogout}>Logout</button>
        <CoinSearchForm
          getCoinName={getCoinName} 
          getCoinInfo={getCoinInfo}
        />
      </nav>
    </header>
  )
}