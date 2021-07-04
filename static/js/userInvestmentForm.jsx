const { useState, useEffect } = React;

function UserInvestment(props) {
  const { coinName, purchasedDate, avePrice, qty} = props;
  return (
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
        <tr>
        <td>{coinName}</td>
        <td>{purchasedDate}</td>
        <td>${avePrice}</td>
        <td>{qty}</td>
        </tr>
      </tbody>
    </table>
  );
}

function AddUserInvestment({addInvestment}) {
  const [coinName, setCoinName] = useState("");
  const [purchsedDate, setDate] = useState("");
  const [avePrice, setAvePrice] = useState("");
  const [qty, setQty] = useState("");
  
  const handleSubmit = (e) => {
    e.preventDefault();

    const formInputs = {
      "coin_name": coinName,
      "purchased_date":purchsedDate,
      "ave_price": avePrice,
      "qty": qty
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
      const {investmentAdded: { coinName, purchasedDate, avePrice, qty, userCoinId},} = result;
      addInvestment(coinName, purchasedDate, avePrice, qty, userCoinId)
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Coin Name</label>
        <input 
          type="text"
          name="coinname"
          value={coinName}
          onChange={(e) => setCoinName(e.target.value)}
          id="coinname"
          />
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

function UserInvestmentContainer({curUserId}) {
  const [userInvestments, setUserInvestment] = useState([]);

  const addInvestment = (coinName, purchasedDate, avePrice, qty, userCoinId) => {
    const newInvestment = {coinName, purchasedDate, avePrice, qty, userCoinId};
    const curInvestment = [...userInvestments];
    setUserInvestment([...curInvestment, newInvestment]);
  }

  useEffect(() => {
    fetch("/investments.json")
      .then((res) => res.json())
      .then((data) => {
        setUserInvestment(data.investments)
      });
  }, []);
  
  const result = userInvestments.map((curInvestment,i) => {
    if (curInvestment.userCoinId === curUserId 
        && curInvestment.qty > 0) {
      return <UserInvestment 
          key={i}
          coinName={curInvestment.coinName}
          purchasedDate={curInvestment.purchasedDate}
          avePrice={curInvestment.avePrice}
          qty={curInvestment.qty}
          />
    }
  });

  return (
    <div>
      <h2>User Investment</h2>
      <h4>Add your investment</h4>
      <AddUserInvestment addInvestment={addInvestment} />
      {result}
    </div>
  )
}