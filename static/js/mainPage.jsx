const { Route, Switch, useRouteMatch } = ReactRouterDOM;
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



    </div>
  )
}
