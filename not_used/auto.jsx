const { useState, useEffect, useRef } = React;

function Auto(props) {
  const [display, setDisplay] = useState(false);
  const [options, setOptions] = useState([]);
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const {getCoinName, getCoinInfo} = props;
  const url = `https://api.coingecko.com/api/v3/coins/${search}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
  let history = useHistory();

  useEffect(() => {
    const coins = [];
    fetch("/coins.json")
      .then((res) => res.json())
      .then((result) => {
        result.coins.map((name) => {
          return coins.push(name);
        })
      });
      setOptions(coins);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickoutside);

    return () => {
      document.removeEventListener("mousedown", handleClickoutside)
    };
  },[]);

  const handleClickoutside = (e) => {
    const {current: wrap} = wrapperRef;
    if (wrap && !wrap.contains(e.target)) {
      setDisplay(false);
    }
  };

  const setCoinDex = (coin) => {
    setSearch(coin);
    setDisplay(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(url)
    .then(response => response.json())
    .then(data => {
      getCoinName(search)
      getCoinInfo(data)
      history.push(`/main/${search}`)
    });
  }

  return (
    <div ref={wrapperRef}>
      <form onSubmit={handleSubmit}>
        <div>
          <h2>Autocomplete search coin</h2>
          <input
            id="auto"
            type="text"
            name="coinName"
            onClick={() => setDisplay(!display)}
            placeholder="Type to search" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
          {display && (
            <div>
              {options.filter((coinName) => coinName.indexOf(search) > -1).map((value,i) => {
                return (
                  <div
                    onClick={() => setCoinDex(value)}
                    key={i}
                    >
                    <span>{value}</span>
                  </div>)
              })}
            </div>
          )}
        <button>Search</button>
      </form>
    </div>
  );
};