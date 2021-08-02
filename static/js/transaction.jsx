const { useHistory } = ReactRouterDOM;
const { useState, useEffect } = React;

function Transaction({holdings, getTransaction}) {
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


function TransactionHistory({transHistory}) {
  console.log(transHistory)
  return (
    <div>
    <h3>Your {transHistory[0].coinName} transaction history</h3> 
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
        {transHistory.map((coin,i) => (
          <tr key={i}>
            <td>{coin.type}</td>
            <td>${coin.price}</td>
            <td>{coin.qty}</td>
            <td>{coin.date}</td>
            <td>${coin.cost}</td>
            <td><button>Edit</button></td>
            <td><button>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}

function TransactionContainer({getTransHistory}) {
  const [uniqCoin, setUniqCoin] = useState([]);

  const getTransaction = (history) => {
    console.log(history)
    getTransHistory(history);
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
      <Transaction holdings={uniqCoin} getTransaction={getTransaction}/>
    </div>
  )
}