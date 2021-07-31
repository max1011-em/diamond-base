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
    <header>
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
    </header>
  )
}