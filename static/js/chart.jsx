const { useState, useEffect, useRef } = React;

function CoinGraph({coinInfo}) {
  const canvasRef = useRef();
  const [ historyMarket, setHistoryMarket ] = useState([]);
  const [url, setUrl] = useState(`https://api.coingecko.com/api/v3/coins/${coinInfo.id}/market_chart?vs_currency=usd&days=1&interval=hourly`);

  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(price => {
        setHistoryMarket(price.prices);
      });
    }, [url]);

  const handleClick = (e) => {
    e.preventDefault();
    let url;
    const days = e.target.innerText.replace(/\D/g, "");
    days === '24'? 
    url = `https://api.coingecko.com/api/v3/coins/${coinInfo.id}/market_chart?vs_currency=usd&days=1&interval=hourly` :
    url = `https://api.coingecko.com/api/v3/coins/${coinInfo.id}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
    setUrl(url);
  };

  let label = Array(historyMarket.length).fill("");

  useEffect(() => {
    new Chart(canvasRef.current.getContext('2d'), {
      type: 'line',
      data: {
          labels: label,
          datasets: [{
              label: "Dogecoin",
              data: historyMarket.map((price) => price[1]),
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
          }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            }
        },
        elements: {
          point:{
              radius: 1
          }
      }
    }
  });
  },[historyMarket])
  
  return (
    <div id="coinContainer">
      <button onClick={handleClick}>24h</button>
      <button onClick={handleClick}>7d</button>
      <button onClick={handleClick}>30d</button>
      <button onClick={handleClick}>90d</button>
      <button onClick={handleClick}>365d</button>
      <canvas ref={canvasRef} id="myChart" width="500" height="500"></canvas>
    </div>
  )
};


function UserInvestmentGraph({userInvestments}) {
  const canvasRef = useRef();
  
  const initInvestment = userInvestments.reduce((sum,coin) => {
    return sum + (coin.avePrice * coin.qty)
  },0);
  
  async function reduce(userInvestments) {
    let result = 0;
    for (const coin of userInvestments) {
      const url = `https://api.coingecko.com/api/v3/coins/${coin.coinIdName}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
      const res = await fetch(url);
      const coinInfo = await res.json();
      let curPrice = coinInfo.market_data.current_price.usd
      result += (curPrice * coin.qty)
    }

    new Chart(canvasRef.current.getContext('2d'), {
      type: 'line',
      data: {
          labels: ['Initial Investment', 'Current Investment'],
          datasets: [{
              label: 'User Investment',
              data: [initInvestment,result],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
          }]
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
              }
          }
      }
  });
  }

  useEffect(() => {
      reduce(userInvestments)
  },[userInvestments])
  
  return (
    <div id="coinContainer">
      <canvas ref={canvasRef} id="myChart" width="500" height="500"></canvas>
    </div>
  )
};


