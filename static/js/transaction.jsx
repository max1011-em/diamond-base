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
        <div className="col-8">
          <h5>Total Portfolio Value</h5>
          <h1 className="text-color">{formatDollar(total, 12)}</h1>
          <h4 className="margin-2">Crytocurrency</h4> 
          <table className="table table-hover trans-table-size">
            <thead className="trans-table">
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
                <tr key={i} onClick={() => handleClick(coin)} className="trans-hover">
                  <td>
                  <img
                    src={coin.img} 
                    style={{width: 25, height: 25, marginRight: 10}} 
                  />
                    {coin.coinName}</td>
                  <td>{coin.sym}</td>
                  <td>{coin.qty}</td>
                  <td>{formatDollar(coin.curPrice, 12)}</td>
                  <td>{formatDollar(coin.avePrice, 12)}</td>
                  <td>{formatDollar(coin.totalReturn, 12)}</td>
                  <td>${coin.equity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="col-4">
          <TransactionGraph holding={holdings}/>
        </div>       
      </div>  
    </div>
  );
}


function TransactionHistory({history,transCoinName}) {
  const [transHistory, setTransHistory] = useState([]);

  useEffect(() => {
    setTransHistory(history);
  },[]);

  const handleRemove = (coin) => {
    const delTransaction = transHistory.filter((trans) => trans.userCoinId !== coin.userCoinId);
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
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3><span className="text-color">{transCoinName}</span> transaction history</h3> 
          <table className="table trans-table-size margin-2">
            <thead className="trans-table">
              <tr>
                <th>Type</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Date</th>
                <th>Cost</th>
                <th>Action</th>
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
                  <td><button className="btn btn-warning remove-button" onClick={() => handleRemove(coin)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
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