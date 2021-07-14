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

  let { path, url } = useRouteMatch();

  return (
    <div>
      <Auto 
        coinName={coinName}
        getCoinName={getCoinName} 
        getCoinInfo={getCoinInfo}
      />
        <Switch>
          <Route exact path={path}>
            <h2>Your investment</h2>
            <UserInvestmentContainer />
            <UserFavCoinContainer />
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
