const { Redirect, Route, Link, BrowserRouter } = ReactRouterDOM;
const { useState, useEffect } = React;

function AddFavCoin({coinName}) {

  const handleClick = (e) => {
    e.preventDefault();
    fetch("/add-favorite-coin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coinName }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("addFavCoin function")
      });
  }

  return (
    <div>
      <button onClick={handleClick}>Add Favorite</button>
    </div>  

  )
};

function UserFavCoin({fav_coin}) {
const [result, setResult] = useState([])

useEffect(() => {
  async function awaitForEach () {
    const arr = [];
    for (const coin of fav_coin) {
      const coinUrl = `https://api.coingecko.com/api/v3/coins/${coin.coinIdName}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;
      const data = await fetch(coinUrl);
      const res = await data.json();
      arr.push(res);
    }
    setResult(arr);
  }

  awaitForEach();

}, [fav_coin])

  return (
    <div>
      <h1>Your favorite coins</h1>
      <table>
        <thead>
          <tr>
            <th>Coin Name</th>
            <th>Current Price</th>
          </tr>
        </thead>
        <tbody>
         {result.map((coin,i) => 
            <tr key={i}>
              <td>
                <img
                    src={coin.image.large} 
                    style={{width: 25, height: 25, marginRight: 10}} 
                  />
                  {coin.name}
              </td>
              <td>{coin.market_data.current_price.usd}</td>
            </tr>
         )}
        </tbody>
      </table>
    </div>
  )
}



function UserFavCoinContainer() {
  const [userFavCoins, setUserFavCoin] = useState([]);
  
  useEffect(() => {
    fetch("/favorite-coin.json")
      .then((res) => res.json())
      .then((data) => {
        setUserFavCoin(data.fav_coin)
      });
  }, []);

  return (
    <div>
      {/* {userFavCoins.length > 0 &&  */}
      <UserFavCoin fav_coin={userFavCoins}/>
    </div>
  )
}


