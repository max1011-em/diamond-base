const { Redirect, Route, Link, BrowserRouter } = ReactRouterDOM;
const { useState, useEffect } = React;

function CoinInfo({coinInfo}) {
  const coinName = coinInfo.name;
  const image = coinInfo.image.small;
  const currentPrice = coinInfo.market_data.current_price.usd;
  const marketCap = coinInfo.market_data.market_cap.usd;
  const marketCapRank = coinInfo.market_data.market_cap_rank;
  const totalVolume = coinInfo.market_data.total_volume.usd;
  const ath = coinInfo.market_data.ath.usd;
  const athDate = coinInfo.market_data.ath_date.usd;
  const atl = coinInfo.market_data.atl.usd;
  const atlDate = coinInfo.market_data.atl_date.usd;

  return (
    <div>
      <h1>{coinName}</h1>
      <img src={image} alt="coin"/>
      <h2>current price: ${currentPrice}</h2> 
      <h2>market cap: ${marketCap}</h2>
      <h2>market cap rank: {marketCapRank}</h2>
      <h2>total volume: ${totalVolume}</h2>
      
      <h3>All-Time-high: ${ath} {athDate}</h3> 
      <h3>All-Time-low: ${atl} {atlDate}</h3>
    </div>
  )
}

function CoinSearchForm() {
  const [coin, setCoin] = useState("");
  const [coinInfo, setInfo] = useState({});
  const [hasSearched, setHasSearched] = useState(false);

  const url = `https://api.coingecko.com/api/v3/coins/${coin}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setInfo(data);
      setHasSearched(true)
    });
  }

  const addFavCoin = (e) => {
    e.preventDefault();
    fetch("/add-favorite-coin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ coin }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result)
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Search coin</h2>
          <input 
            type="text"
            name="coinname"
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            />
        </div>
        <button>Search</button>
      </form>  
      {hasSearched &&  <>
        <CoinGraph coinData={coinInfo}/>
        <CoinInfo coinInfo={coinInfo}/>
        <button onClick={addFavCoin}>Add Favorite</button>
      </>
      }
    </div>  

  )
};


function UserFavoriteCoin() {
  const [userFavoriteCoin, setUserFavoriteCoin] = useState([]);
  

  return (
    <div>

    </div>
  )
}