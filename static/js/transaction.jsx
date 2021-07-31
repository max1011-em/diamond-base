const { useState, useEffect } = React;

function Transaction({holdings}) {
  console.log(holdings)
  const total = holdings.reduce((acc, cur) => {
    return acc + cur.total
  },0); 

  return (
    <div>
    <h1>Your coin list</h1> 
    <h3>Total: ${total}</h3>
    <table>
      <thead>
        <tr>
          <th>Coin Name</th>
          <th>Quantity</th>
          <th>Total</th>
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
            <td>{coin.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}


function TransactionContainer() {
  const [transaction, setTransaction] = useState([]);
  const [uniqCoin, setUniqCoin] = useState([]);

  useEffect(() => {
    fetch("/investments.json")
    .then((res) => res.json())
    .then((data) => {
      console.log("in getinvestinfo", data.holdings)
      setUniqCoin(data.holdings);
      setTransaction(data.investments)
  });
  }, []);



  
  return (
    <div>
      <Transaction holdings={uniqCoin}/>
    </div>
  )
}