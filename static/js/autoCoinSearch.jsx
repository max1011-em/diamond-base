const { Redirect, Route, Link, BrowserRouter, useHistory } = ReactRouterDOM;
const { useState, useEffect, useRef } = React;

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

      <h2>About {coinName}</h2>
      <div dangerouslySetInnerHTML={{__html: coinInfo.description.en}} />
      
    </div>
  )
}

function Auto(props) {
  const [active, setActive] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestion] = useState([]);
  const [coinId, setCoinId] = useState("")

  const {getCoinName, getCoinInfo} = props;
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  let history = useHistory();

  useEffect(() => {
    const coins = [];
    fetch("/coins.json")
      .then((res) => res.json())
      .then((result) => {
        result.coins.map((value) => {
          return coins.push(value);
        });
      });
      setSuggestion(coins);
  }, []);

  const onChange = e => {
    const input = e.currentTarget.value;
    const newFilteredSuggestions = suggestions.filter(
      ({coin_name}) => coin_name.toLowerCase().indexOf(input.toLowerCase()) > -1
      ).map(({coin_name}) => coin_name);
    setActive(0);
    setFiltered(newFilteredSuggestions);
    setIsShow(true);
    setInput(e.currentTarget.value)
  };

  const onClick = e => {
    setActive(0);
    setFiltered([]);
    setIsShow(false);
    setInput(e.currentTarget.innerText);
    const findCoinId = suggestions.filter(({coin_name}) => coin_name === e.currentTarget.innerText);
    setCoinId(findCoinId[0].coin_id_name);
  };

  const onKeyDown = e => {
      if (e.keyCode === 13) { // enter key
        setActive(0);
        setIsShow(false);
        setInput(filtered[active])
      }
      else if (e.keyCode === 38) { // up arrow
        return (active === 0) ? null : setActive(active - 1);
      }
      else if (e.keyCode === 40) { // down arrow
        return (active - 1 === filtered.length) ? null : setActive(active + 1);
      }
    };

  const renderAutocomplete = () => {
      if (isShow && input) {
        if (filtered.length) {
          return (
            <ul className="autocomplete">
              {filtered.map((suggestion, index) => {
                let className;
                if (index === active) {
                  className = "active";
                }
                return (
                  <li className={className} key={suggestion} onClick={onClick}>
                    {suggestion}
                  </li>
                );
              })}
            </ul>
          );
        } else {
          return (
            <div className="no-autocomplete">
              <em>Not found</em>
            </div>
          );
        }
      }
      return <></>;
    }

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url)
    .then(response => response.json())
    .then(data => {
      getCoinName(input)
      getCoinInfo(data)
      history.push(`/main/${input}`)
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
          <h1>search coin</h1>
          <input
            id="auto"
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            name="coinName"
            placeholder="Type to search" 
            value={input}
          />
          {renderAutocomplete()}
        <button>Search</button>
      </form>
    </div>
  );
};