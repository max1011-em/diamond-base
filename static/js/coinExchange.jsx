const { Route, Switch, useRouteMatch, useHistory } = ReactRouterDOM;
const { useState, useEffect } = React;

function CoinExchange() {
  const [exchange, setExchange] = useState([]);
  const exchangeUrl = "https://api.coingecko.com/api/v3/exchanges"


  useEffect(() => {
  fetch(exchangeUrl)
    .then(response => response.json())
    .then(exchange => {
      setExchange(exchange.slice(0,30));
    });
  }, []);

  return (
    <div>
      <h1>Coin Exchanges</h1>

      <table >
        <thead>
          <tr>
            <th>Trust #</th>
            <th>Name</th>
            <th>Year-Established</th>
            <th>Country</th>
            <th>Trade Volume 24th BTC</th>
          </tr>
        </thead>
        <tbody>
          {exchange.map((exchange,i) => (
            <tr key={i}>
              <td>{i+1}</td>
              <td>
                <img
                  src={exchange.image} 
                  style={{width: 25, height: 25, marginRight: 10}} 
                />
                {exchange.name}
              </td>
              <td>{exchange.year_established}</td>
              <td>{exchange.country}</td>
              <td>{exchange.trade_volume_24h_btc}</td> 
              <td><a href={exchange.url} target={"_blank"}>Go!</a> </td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}