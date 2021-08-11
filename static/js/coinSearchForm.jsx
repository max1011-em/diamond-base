const { Redirect, Route, Link, BrowserRouter, useHistory } = ReactRouterDOM;
const { useState, useEffect, useRef } = React;

function CoinInfo({coinInfo}) {
  const coinName = coinInfo.name;
  const image = coinInfo.image.small;
  const currentPrice = coinInfo.market_data.current_price.usd;
  const marketCapRank = coinInfo.market_data.market_cap_rank;
  const perc24h = coinInfo.market_data.price_change_percentage_24h;

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
        <div className="col-12 display-flex">
          <img className="coin-img" src={image} alt="coin"/>
          <h1>{coinName}</h1>
        </div>
      </div> 

      <div className="row">
        <div className="col-12">
          <h2 className="inline small-margin">{formatDollar(currentPrice,20)}</h2> 
            <span
              className={perc24h > 0 ? (
                'text-success' 
                ) : 'text-danger'}
                >
                {formatPercent(perc24h)}
            </span>
          <h2>Rank #{marketCapRank}</h2>
          <h2 className="margin-2">About {coinName}</h2>
          <div dangerouslySetInnerHTML={{__html: coinInfo.description.en}} />      
        </div>
      </div>
    </div>
  )
}

function CoinSearchForm(props) {

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
            <ul className="autocomplete dropdown-menu">
              {filtered.map((suggestion, index) => {
                let className;
                if (index === active) {
                  className = "active";
                }
                return (
                  <li className={"dropdown-item" + " " + className} key={suggestion} onClick={onClick}>
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
    .then(coinInfo => {
      getCoinName(input)
      getCoinInfo(coinInfo)
      history.push(`/main/${input}`)
    });
  }

  return (
      <form className="d-flex search-input" onSubmit={handleSubmit}>
        <div className="input-group">
          <span className="input-group-text" id="basic-addon1">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </span>
          <input
            id="auto"
            className="form-control me-1"
            type="search"
            onChange={onChange}
            onKeyDown={onKeyDown}
            name="coinName"
            placeholder="Search all cryptocurrencies" 
            value={input}
          />
          {renderAutocomplete()}
          
        </div>
          <button className="btn btn-warning coin-search" type="submit">Search</button>
      </form>
  );
};