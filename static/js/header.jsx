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
<<<<<<< HEAD
      to="/exchange"
      activeClassName="navlink-active"
      className="nav-link">Exchange</NavLink>
      <NavLink 
=======
>>>>>>> 9006b5e996f83d7066dc3bbd0493f1fc443ff926
      to="/news"
      activeClassName="navlink-active"
      className="nav-link">News</NavLink>
      <NavLink 
<<<<<<< HEAD
      to="/transaction"
      activeClassName="navlink-active"
      className="nav-link">Transaction</NavLink>
      <button onClick={handleLogout}>Logout</button>
      <CoinSearchForm
=======
      to="/profile"
      activeClassName="navlink-active"
      className="nav-link">Profile</NavLink>
      <button onClick={handleLogout}>Logout</button>
      <Auto 
>>>>>>> 9006b5e996f83d7066dc3bbd0493f1fc443ff926
        getCoinName={getCoinName} 
        getCoinInfo={getCoinInfo}
      />
    </header>
  )
}