const { useHistory } = ReactRouterDOM;
const { useState, useEffect } = React;

function Transaction({holdings, getTransaction,getCoinName}) {
  const history = useHistory();
  const [transaction, setTransaction] = useState([]);
  const total = holdings.reduce((acc, cur) => {
    return acc + cur.equity
  },0); 
 
  const handleClick = (coin) => {
    const coinSymbol = coin.sym;
    fetch(`/transaction.json?sym=${coinSymbol}`)
      .then(response => response.json())
      .then(transaction => {
        setTransaction(transaction.transaction);
        getTransaction(transaction.transaction);
        getCoinName(coin.coinName)
        history.push({pathname:`/transaction/${coinSymbol}`, state:{transaction}})
      });
  }

  return (
    <div>
    <h3>Your Crytocurrency List</h3> 
    <h3>Total: ${total}</h3>
    <table>
      <thead>
        <tr>
          <th>Coin Name</th>
          <th>Symbol</th>
          <th>Quantity</th>
          <th>Current Price</th>
          <th>Average Cost</th>
          <th>Total Return</th>
          <th>Equity</th>
        </tr>
      </thead>
      <tbody>
        {holdings.map((coin,i) => (
          <tr key={i} onClick={() => handleClick(coin)}>
            <td>
            <img
              src={coin.img} 
              style={{width: 25, height: 25, marginRight: 10}} 
            />
              {coin.coinName}</td>
            <td>{coin.sym}</td>
            <td>{coin.qty}</td>
            <td>${coin.curPrice}</td>
            <td>${coin.avePrice}</td>
            <td>${coin.totalReturn}</td>
            <td>${coin.equity}</td>
          </tr>
        ))}
      </tbody>
    </table>
    <TransactionGraph holding={holdings}/>
    </div>
  );
}


function TransactionHistory({history,transCoinName}) {
  const [transHistory, setTransHistory] = useState([]);

  useEffect(() => {
    setTransHistory(history);
  },[]);

  const handleRemove = (coin) => {
    let delTransaction = transHistory.filter((trans) => trans.userCoinId !== coin.userCoinId);
    setTransHistory(delTransaction);

    fetch('/remove-transaction', {
      method: "POST",
      body: JSON.stringify(coin),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => res.json())
    .then((result) => {
      console.log(result.success)
    });
  }

  return (
    <div>
    <h3>Your {transCoinName} transaction history</h3> 
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Date</th>
          <th>Cost</th>
        </tr>
      </thead>
      <tbody>
        {transHistory.map((coin) => (
          <tr key={coin.userCoinId}>
            <td>{coin.type}</td>
            <td>${coin.price}</td>
            <td>{coin.qty}</td>
            <td>{coin.date}</td>
            <td>${coin.cost}</td>
            <td><button onClick={() => handleRemove(coin)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function TransactionContainer({getTransHistory,getTransCoinName}) {
  const [uniqCoin, setUniqCoin] = useState([]);

  const getTransaction = (history) => {
    getTransHistory(history);
  }
  const getCoinName = (name) => {
    getTransCoinName(name);
  }
  useEffect(() => {
    fetch("/investments.json")
    .then((res) => res.json())
    .then((data) => {
      setUniqCoin(data.holdings);
  });
  }, []);
  
  return (
    <div>
      <Transaction holdings={uniqCoin} 
                    getTransaction={getTransaction}
                    getCoinName={getCoinName}/>
    </div>
  )
}