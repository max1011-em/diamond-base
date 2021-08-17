const { useState, useEffect } = React;

function UserInvestmentList({holdings}) {
  console.log(holdings)
  const total = holdings.reduce((acc, cur) => {
    return acc + cur.equity
  },0); 

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
    <div>
      <h5>Total investment</h5> 
      <h1 className="text-color">Total: {formatDollar(total, 12)}</h1>
      <h2 className="margin-2">Coin list</h2> 
      <table className="table table-hover trans-table-size">
        <thead className="trans-table">
          <tr>
            <th>Coin Name</th>
            <th>Quantity</th>
            <th>Equity</th>
          </tr>
        </thead>
        <tbody>
          {holdings.map((coin,i) => (
            <tr key={i}>
              <td>
              <img
                src={coin.img} 
                style={{width: 25, height: 25, marginRight: 10}} 
              />
                {coin.coinName}</td>
              <td>{coin.qty}</td>
              <td>{formatDollar(coin.equity, 12)}</td>
            </tr>
          ))}
        </tbody>
        </table>
    </div>
  );
}

function AutoCompUserInvestment({getCoinName,getCoinIdName}) {
  const [active, setActive] = useState(0);
  const [isShow, setIsShow] = useState(false);
  const [filtered, setFiltered] = useState([]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestion] = useState([]);

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
    getCoinName(e.currentTarget.innerText);
    const findCoinId = suggestions.filter(({coin_name}) => coin_name === e.currentTarget.innerText);
    getCoinIdName(findCoinId[0].coin_id_name)
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
          <ul className="autocomplete auto-margin">
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

  return (
    <div>
      <input
        id="auto"
        className="form-control"
        type="text"
        onChange={onChange}
        onKeyDown={onKeyDown}
        name="coinName"
        value={input}
        autocomplete="off"
      />
      {renderAutocomplete()}
    </div>
  );
}

function BuyForm({ handleHistoryUpdate }) {
  const [coinName, setCoinName] = useState("");
  const [purchsedDate, setDate] = useState("");
  const [initPrice, setInitPrice] = useState("");
  const [qty, setQty] = useState("");
  const [coinIdName, setCoinIdName] = useState("")
  
  const getCoinName = (coinName) => {
    setCoinName(coinName)
  };

  const getCoinIdName = (coinIdName) => {
    setCoinIdName(coinIdName)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formInputs = {
      "coin_name": coinName,
      "date":purchsedDate,
      "price": initPrice,
      "qty": qty,
      "coin_id_name":coinIdName,
      "transaction":"Buy"
    };

    fetch('/add-investment', {
      method: "POST",
      body: JSON.stringify(formInputs),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result.success)
      handleHistoryUpdate();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label text-color">Coin Name</label>
        <AutoCompUserInvestment getCoinName={getCoinName} getCoinIdName={getCoinIdName}/>
      </div>

      <div className="mb-3">
        <label className="form-date text-color">Purchased date</label>
        <input 
          type="date"
          className="form-control"
          name="date"
          value={purchsedDate}
          onChange={(e) => setDate(e.target.value)}
          id="date"
          autocomplete="off"
          />
      </div>
      <div className="mb-3">
        <label className="form-label text-color">Initial Price $</label>
        <input 
          type="text"
          className="form-control"
          name="initprice"
          value={initPrice}
          onChange={(e) => setInitPrice(e.target.value)}
          id="initprice"
          autocomplete="off"
          />
      </div>
      <div className="mb-3">
        <label className="form-label text-color">Quantity</label>
        <input 
          type="text"
          className="form-control"
          name="qty"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          id="qty"
          autocomplete="off"
          />
      </div>
      <button className="btn btn-warning submit-btn">submit</button>   
    </form>
  );
}

function SellForm({ handleHistoryUpdate }) {
  const [coinName, setCoinName] = useState("");
  const [sellDate, setSellDate] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [qty, setQty] = useState("");
  const [coinIdName, setCoinIdName] = useState("")
  
  const getCoinName = (coinName) => {
    setCoinName(coinName)
  };

  const getCoinIdName = (coinIdName) => {
    setCoinIdName(coinIdName)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formInputs = {
      "coin_name": coinName,
      "date":sellDate,
      "price": sellPrice,
      "qty": qty,
      "coin_id_name":coinIdName,
      "transaction":"Sell"
    };

    fetch('/add-investment', {
      method: "POST",
      body: JSON.stringify(formInputs),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result.success)
      handleHistoryUpdate();
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label text-color">Coin Name</label>
        <AutoCompUserInvestment getCoinName={getCoinName} getCoinIdName={getCoinIdName}/>
      </div>
      <div className="mb-3">
        <label className="form-date text-color">Sell date</label>
        <input 
          type="date"
          className="form-control"
          name="date"
          value={sellDate}
          onChange={(e) => setSellDate(e.target.value)}
          id="date"
          />
      </div>
      <div className="mb-3">
        <label className="form-label text-color">Sell Price $</label>
        <input 
          type="text"
          className="form-control"
          name="sellPrice"
          value={sellPrice}
          onChange={(e) => setSellPrice(e.target.value)}
          id="sellPrice"
          autocomplete="off"
          />
      </div>
      <div className="mb-3">
        <label className="form-label text-color">Quantity</label>
        <input 
          type="text"
          className="form-control"
          name="qty"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          id="qty"
          autocomplete="off"
          />
      </div>
      <button className="btn btn-warning submit-btn">submit</button>
    </form>
  );
}


function UserInvestmentContainer() {
  // const [userInvestments, setUserInvestment] = useState([]);
  const [transaction, setTransaction] = useState([]);
  const [uniqCoin, setUniqCoin] = useState([]);

  const getInvestmentInfo = () => {
    fetch("/investments.json")
      .then((res) => res.json())
      .then((data) => {
        setUniqCoin(data.holdings);
        setTransaction(data.investments)
    });
  } 

  useEffect(() => {
    getInvestmentInfo();
  }, []);
 
  const handleHistoryUpdate= () => {
    getInvestmentInfo();
  }
  
  return (
    <div>
      <div className="row">
        <div className="col-8">
          <UserInvestmentList holdings={uniqCoin}/>
          <UserFavCoinContainer />
        </div>

        <div className="col-4">
          <h2>Add Buy</h2>
          <BuyForm handleHistoryUpdate={handleHistoryUpdate}/>
          <h2 className="margin-2">Add Sell</h2>
          <SellForm handleHistoryUpdate={handleHistoryUpdate}/>
        </div>
      </div>  

    </div>
  )
}