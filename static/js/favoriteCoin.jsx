const { Redirect, Route, Link, BrowserRouter } = ReactRouterDOM;
const { useState, useEffect } = React;

function UserFavCoin({coinName}) {
  return (
    <div>
      <ul>
        <li>{coinName}</li>
      </ul>
    </div>
  )
}

function AddFavCoin({coin}) {
  const coinName = coin;

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
    <div>
      <button onClick={handleClick}>Add Favorite</button>
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

  const result = userFavCoins.map((favCoin,i) => {
      return <UserFavCoin 
                key={i}
                coinName={favCoin.coinName}
             />
  });

  return (
    <div>
      {result.length > 0 && 
      <>
      <h2>User favorite coin</h2>
      {result}
      </>
      }
    </div>
  )
}


