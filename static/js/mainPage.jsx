const { Redirect, Route, Link, BrowserRouter, Switch, useRouteMatch } = ReactRouterDOM;
const { useState, useEffect, useRef } = React;


function MainContainer() {
  const [coinName, setCoin] = useState("");
  const [coinInfo, setInfo] = useState({});

  const getCoinName = (coinName) => {
    setCoin(coinName);
  };

  const getCoinInfo = (coinInfo) => {
    setInfo(coinInfo);
  };

  const handleLogout = () => {

  }
  
  let { path, url } = useRouteMatch();

  return (
    <div>
      <Auto 
        coinName={coinName}
        getCoinName={getCoinName} 
        getCoinInfo={getCoinInfo}
      />
      <button onClick={handleLogout}>Logout</button>
        <Switch>
          <Route exact path={path}>
            <CoinbaseConnect />
            <h1>Your investment</h1>
            <UserInvestmentContainer />
            <UserFavCoinContainer />
            <TopVolCoinList />
            {/* <CoinNews /> */}
          </Route>

          <Route exact path={`${path}/:${coinName}`}>
            <CoinGraph coinData={coinInfo}/>
            <CoinInfo coinInfo={coinInfo}/>
            <AddFavCoin coin={coinName}/>
          </Route>

        </Switch>
    </div>
  )
}
