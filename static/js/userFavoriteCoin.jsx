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
        console.log(result)
      });
  }

  return (
      <div className="row">
        <div className="col-12">
          <button className="btn btn-warning fav-btn" onClick={handleClick}>Add Favorite</button>
        </div> 
      </div> 
  )
};


function UserFavCoinContainer() {
  const [userFavCoins, setUserFavCoin] = useState([]);
  
  useEffect(() => {
    fetch("/favorite-coin.json")
      .then((res) => res.json())
      .then((data) => {
        setUserFavCoin(data.fav_coin)
      });
  }, []);

  const handleRemove = (coin) => {
    const delFavCoin = userFavCoins.filter((favCoin) => favCoin.coinId !== coin.coinId);
    setUserFavCoin(delFavCoin);

    fetch('/remove-fav_coin', {
      method: "POST",
      body: JSON.stringify(coin),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result.success)
    });
  }

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
         {userFavCoins.map((coin) => 
            <tr key={coin.coinId}>
              <td>
                <img
                    src={coin.img} 
                    style={{width: 25, height: 25, marginRight: 10}} 
                  />
                  {coin.coinName}
              </td>
              <td>{coin.curPrice}</td>
              <td><button onClick={() => handleRemove(coin)}>Remove</button></td>
            </tr>
         )}
        </tbody>
      </table>
    </div>
  )
}


