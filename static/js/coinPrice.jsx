const { Route, Switch, useRouteMatch, useHistory } = ReactRouterDOM;
const { useState } = React;

function CoinPrice() {
  const history = useHistory();
  const [data, setData] = useState([]);
  const [coinName, setCoinName] = useState("");
  const [coinInfo, setInfo] = useState({});
  const url = "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false"


  useEffect(() => {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      setData(data);
    });
  }, []);

  const handleClick = (e) => {
    const coinId = e.target.id;
    const coinUrl = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`;

    fetch(coinUrl)
      .then(response => response.json())
      .then(data => {
        setInfo(data)
        setCoinName(data.name)
        history.push(`/main/${data.name}`)
      });
  }

  let { path } = useRouteMatch();

  return (
    <div>
      <h1>Get cryptocurrency prices</h1>

      <table >
        <thead>
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
          {data.map((coin,i) => (
            <tr key={coin.id}>
              <td>{i+1}</td>
              <td id={coin.id} onClick={handleClick}>
                <img
                  src={coin.image} 
                  style={{width: 25, height: 25, marginRight: 10}} 
                />
                {coin.name}
              </td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>{coin.current_price}</td>
              <td> 
                <span
                  className={coin.price_change_percentage_24h > 0 ? (
                    'text-success' 
                  ) : 'text-danger'}
                >
                {coin.price_change_percentage_24h}
                </span>
              </td>
              <td>{coin.market_cap}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}