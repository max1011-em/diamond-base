const { useState, useEffect, useRef } = React;



function CoinGraph({coinInfo}) {
  const canvasRef = useRef();
  const [ historyMarket, setHistoryMarket ] = useState([]);
  const [url, setUrl] = useState(`https://api.coingecko.com/api/v3/coins/${coinInfo.id}/market_chart?vs_currency=usd&days=1&interval=minutely`);
  const [day, setDay] = useState('24');
  console.log(url)
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(price => {
        setHistoryMarket(price.prices);
      });
    }, [url]);

  const handleClick = (e) => {
    console.log(coinInfo.id)
    e.preventDefault();
    let url;
    let days = e.target.innerText.replace(/\D/g, "");
    days === '24'? 
    url = `https://api.coingecko.com/api/v3/coins/${coinInfo.id}/market_chart?vs_currency=usd&days=1&interval=minutely` :
    url = `https://api.coingecko.com/api/v3/coins/${coinInfo.id}/market_chart?vs_currency=usd&days=${days}&interval=hourly`;
    setDay(days)
    setUrl(url);
  };

  let label = getLabel(day,historyMarket);
  let price = getPrice(day,historyMarket)
  // let label = Array(historyMarket.length).fill("");

  useEffect(() => {
    new Chart(canvasRef.current.getContext('2d'), {
      type: 'line',
      data: {
          labels: label,
          datasets: [{
              label: coinInfo.name,
              data: price,
              fill: false,
              borderColor: 'rgb(255, 127, 80)',
              tension: 0.1
          }]
      },
      options: {
        scales: {
            y: {
                beginAtZero: true
            },
            xAxes: [{
              ticks: {
                  display: false 
              }
          }]
        },
        elements: {
          point:{
              radius: 2
          }
      },
    }
  });
  },[historyMarket,coinInfo])
  
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


function TransactionGraph({holding}) {
  console.log(holding)
  const canvasRef = useRef();
  let label = holding.map(coin => coin.coinName);
  // const color = Object.values(Utils.CHART_COLORS)
  useEffect(() => {
    new Chart(canvasRef.current.getContext('2d'), {
      type: 'doughnut',
      data: {
          labels: label,
          datasets: [{
              data: holding.map(coin => coin.equity),
              fill: false,
              backgroundColor: 'rgb(255, 127, 80)',
              tension: 0.1
          }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Doughnut Chart'
          }
        }
    }
  });
  },[holding])
  
  return (
    <div id="coinContainer">
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


