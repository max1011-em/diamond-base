const { Route, Switch, useRouteMatch, useHistory } = ReactRouterDOM;
const { useState, useEffect } = React;

function CoinExchange() {
  const [exchange, setExchange] = useState([]);
  const exchangeUrl = "https://api.coingecko.com/api/v3/exchanges"


  useEffect(() => {
  fetch(exchangeUrl)
    .then(response => response.json())
    .then(exchange => {
      setExchange(exchange.slice(0,50));
    });
  }, []);

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
          <h1>Coin Exchanges</h1>
          <table className="table exchange-table-size">
            <thead className="exchange-table">
              <tr>
                <th>Trust #</th>
                <th>Name</th>
                <th>Year-Established</th>
                <th>Country</th>
                <th>Trade Volume 24th BTC</th>
                <th>Visit</th>
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
                  <td>{formatDollar(exchange.trade_volume_24h_btc, 12)}</td> 
                  <td><a className="btn btn-warning exchange-a" href={exchange.url} role="button" target={"_blank"}>Go!</a> </td> 
                   
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}