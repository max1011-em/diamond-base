const { useState, useEffect } = React;

function TopVolCoinList() {
  const [data, setData] = useState([]);
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false"

  useEffect(() => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      setData(data);
    });
  }, []);

function handleClick(e) {
  console.log(e.target.id);

  console.log("test")
}

  return (
    <div>
      <h1>Coinmarketcap clone</h1>

      <table >
        <thead>
          <tr>
            <th>Symbol</th>
            <th>24H Change</th>
            <th>Price</th>
            <th>Market cap</th>
          </tr>
        </thead>
        <tbody>
          {data.map(coin => (
            <tr key={coin.id}>
              <td>
                <img
                  onClick={handleClick}
                  id={coin.id} 
                  src={coin.image} 
                  style={{width: 25, height: 25, marginRight: 10}} 
                />
                {coin.symbol.toUpperCase()}
              </td>
              <td> 
                <span
                  className={coin.price_change_percentage_24h > 0 ? (
                    'text-success' 
                  ) : 'text-danger'}
                >
                {coin.price_change_percentage_24h}
                </span>
              </td>
              <td>{coin.current_price}</td>
              <td>{coin.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}