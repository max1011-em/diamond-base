const { Redirect, Route, Link, BrowserRouter, Switch, useRouteMatch } = ReactRouterDOM;
const { useState, useEffect, useRef } = React;


function MainContainer({curUserId}) {
  const [coinName, setCoin] = useState("");
  const [coinInfo, setInfo] = useState({});
  const [favCoin, setFavCoin] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const getCoinName = (coinName) => {
    setCoin(coinName);
  };

  const getCoinInfo = (coinInfo) => {
    setInfo(coinInfo);
  };

  const getHasSearched = (hasSearched) => {
    setHasSearched(hasSearched);
  };

  const getNewFavCoin = (newFavCoin) => {
    setFavCoin(newFavCoin);
  }

  let { path, url } = useRouteMatch();

  return (
    <div>
      <h4>currentId:{curUserId}</h4>
      <CoinSearchForm 
        coinName={coinName}
        getCoinName={getCoinName} 
        getCoinInfo={getCoinInfo}
        getHasSearched={getHasSearched}
      />
        <Switch>
          <Route exact path={path}>
            <UserInvestmentContainer curUserId={curUserId}/>
            <UserFavCoinContainer favCoin={favCoin}/>
          </Route>

          <Route exact path={`${path}/:${coinName}`}>
            <CoinGraph coinData={coinInfo}/>
            <CoinInfo coinInfo={coinInfo}/>
            <AddFavCoin coin={coinName} getNewFavCoin={getNewFavCoin}/>
          </Route>

        </Switch>
    </div>
  )
}
