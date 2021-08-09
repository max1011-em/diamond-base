const { Route, Switch, useRouteMatch, useHistory } = ReactRouterDOM;
const { useState,useEffect } = React;

function CoinPrice({getCoinInfo,getCoinName}) {
  const history = useHistory();
  const [coinPrice, setCoinPrice] = useState([]);
  const coinPriceUrl = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"

  useEffect(() => {
  fetch(coinPriceUrl)
    .then(response => response.json())
    .then(coinPrice => {
      setCoinPrice(coinPrice);
    });
  }, []);

  const handleClick = (e) => {
    const coinId = e.currentTarget.dataset.id;
    const coinUrl = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

    fetch(coinUrl)
      .then(response => response.json())
      .then(coinInfo => {
        getCoinInfo(coinInfo)
        getCoinName(coinInfo.name)
        history.push({pathname:`/main/${coinId}`, state:{coinInfo}})
      });
  }

  const formatPercent = number => 
    `${new Number(number).toFixed(2)}%`
  let { path } = useRouteMatch();

  const formatDollar = (number, maximumSignificantDigits) =>
    new Intl.NumberFormat(
      'en-US', 
      { 
        style: 'currency', 
        currency: 'USD',
        maximumSignificantDigits
      })
      .format(number);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h1>Cryptocurrency prices</h1>
          <table className="table table-hover price-table-size">
            <thead className="price-table">
              <tr>
                <th>#</th>
                <th>Cryptocurrency</th>
                <th>Symbol</th>
                <th>Price</th>
                <th>24H Change</th>
                <th>Market cap</th>
              </tr>
            </thead>
            <tbody>
              {coinPrice.map((coin,i) => (
                <tr key={coin.id} data-id={coin.id} onClick={handleClick} className="price-hover">
                  <td>{i+1}</td>
                  <td id={coin.id} >
                    <img
                      src={coin.image} 
                      style={{width: 25, height: 25, marginRight: 10}} 
                    />
                    {coin.name}
                  </td>
                  <td>{coin.symbol.toUpperCase()}</td>
                  <td>{formatDollar(coin.current_price, 20)}</td>
                  <td> 
                    <span
                      className={coin.price_change_percentage_24h > 0 ? (
                        'text-success' 
                      ) : 'text-danger'}
                    >
                    {formatPercent(coin.price_change_percentage_24h)}
                    </span>
                  </td>
                  <td>{formatDollar(coin.market_cap, 12)}</td>     
                </tr>
              ))}
            </tbody>
          </table>
        </div>   
      </div>    
    </div>
  )
}