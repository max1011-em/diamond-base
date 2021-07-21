const { Redirect, Route, Link, BrowserRouter, Switch, useRouteMatch } = ReactRouterDOM;
const { useState, useEffect, useRef } = React;


function MainContainer({getLogout}) {
  const [coinName, setCoin] = useState("");
  const [coinInfo, setInfo] = useState({});

  const getCoinName = (coinName) => {
    setCoin(coinName);
  };

  const getCoinInfo = (coinInfo) => {
    setInfo(coinInfo);
  };

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
      getLogout(result.userLogout)
    });
  }
  
  useEffect(() => {
    const loc = window.location.href;
    const code = loc.split('code=')[1];

    if (code) {
      console.log(code);
    }

  }, []);


  let { path, url } = useRouteMatch();

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
      <Auto 
        coinName={coinName}
        getCoinName={getCoinName} 
        getCoinInfo={getCoinInfo}
      />
        <Switch>
          <Route exact path={path}>
            <CoinbaseConnect />
            <h1>Your investment</h1>
            <UserInvestmentContainer />
            <UserFavCoinContainer />
            <TopVolCoinList />
            <CoinNews searchTerm={"cryptocurrency"}/>
          </Route>

          <Route exact path={`${path}/:${coinName}`}>
            <CoinGraph coinData={coinInfo}/>
            <CoinInfo coinInfo={coinInfo}/>
            <CoinNews searchTerm={coinName}/>
            <AddFavCoin coin={coinName}/>
          </Route>

        </Switch>
    </div>
  )
}
