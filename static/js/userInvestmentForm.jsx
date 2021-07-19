const { useState, useEffect } = React;

function UserInvestment({data}) {
  return (
    <div>
    <h1>Your coin list</h1> 
    <table>
      <thead>
        <tr>
          <th>Coin Name</th>
          <th>Purchase Date</th>
          <th>Average Price</th>
          <th>Quantity</th>
        </tr>
      </thead>
      <tbody>
        {data.map((coin,i) => (
          <tr key={i}>
            <td>{coin.coinName}</td>
            <td>{coin.purchasedDate}</td>
            <td>${coin.avePrice}</td>
            <td>{coin.qty}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function AutoCompUserCoin({getCoinName,getCoinIdName}) {
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

  return (
    <div>
          <input
            id="auto"
            type="text"
            onChange={onChange}
            onKeyDown={onKeyDown}
            name="coinName"
            placeholder="Type to add your coins" 
            value={input}
          />
          {renderAutocomplete()}
    </div>
  );
}

function AddUserInvestment({addInvestment}) {
  const [coinName, setCoinName] = useState("");
  const [purchsedDate, setDate] = useState("");
  const [avePrice, setAvePrice] = useState("");
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
      "purchased_date":purchsedDate,
      "ave_price": avePrice,
      "qty": qty,
      "coin_id_name":coinIdName
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
      const {investmentAdded: { coinName, coinIdName, purchasedDate, avePrice, qty},} = result;
      addInvestment(coinName, coinIdName, purchasedDate, avePrice, qty)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Coin Name</label>
        <AutoCompUserCoin getCoinName={getCoinName} getCoinIdName={getCoinIdName}/>
      </div>
      <div>
        <label>Purchased date</label>
        <input 
          type="date"
          name="date"
          value={purchsedDate}
          onChange={(e) => setDate(e.target.value)}
          id="date"
          />
      </div>
      <div>
        <label>Average Price $</label>
        <input 
          type="text"
          name="aveprice"
          value={avePrice}
          onChange={(e) => setAvePrice(e.target.value)}
          id="aveprice"
          />
      </div>
      <div>
        <label>Quantity</label>
        <input 
          type="text"
          name="qty"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          id="qty"
          />
      </div>
      <button>submit investment</button>
    </form>
  );
}

function UserInvestmentContainer() {
  const [userInvestments, setUserInvestment] = useState([]);

  const addInvestment = (coinName, coinIdName, purchasedDate, avePrice, qty) => {
    const newInvestment = {coinName, coinIdName, purchasedDate, avePrice, qty};
    const curInvestment = [...userInvestments];
    setUserInvestment([...curInvestment, newInvestment]);
  }

  useEffect(() => {
    fetch("/investments.json")
      .then((res) => res.json())
      .then((data) => {
        setUserInvestment(data.investments);
      });
  }, []);

  const data= userInvestments.filter((curInvestment,i) => {
    return curInvestment.qty > 0;
    // if (curInvestment.qty > 0) {
    //   return <UserInvestment 
    //       key={i}
    //       coinName={curInvestment.coinName}
    //       purchasedDate={curInvestment.purchasedDate}
    //       avePrice={curInvestment.avePrice}
    //       qty={curInvestment.qty}
    //       />
    // }
  });

  return (
    <div>
      <UserInvestmentGraph userInvestments={userInvestments}/>
      <h1>Add your investment</h1>
      <AddUserInvestment addInvestment={addInvestment} />
      <UserInvestment data={data}/>
    </div>
  )
}