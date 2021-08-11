const { useState, useEffect, useRef } = React;

function CoinGraph({coinInfo}) {
  const canvasRef = useRef();
  const [ historyMarket, setHistoryMarket ] = useState([]);
  const [url, setUrl] = useState("");
  const [day, setDay] = useState('24');
  const [myChart, setMyChart] =useState(null);
  const defaultBtnClass = "btn btn-warning graph-btn" 

  useEffect(() => {
    setUrl(`https://api.coingecko.com/api/v3/coins/${coinInfo.id}/market_chart?vs_currency=usd&days=1&interval=minutely`)
    }, [coinInfo]);

  useEffect(() => {
    if(url !== "") {
    fetch(url)
      .then(response => response.json())
      .then(price => {
        setHistoryMarket(price.prices);
      });
    }
    }, [url]);

  const handleClick = (e) => {
    e.preventDefault();
    let days = e.target.innerText.replace(/\D/g, "");
    days === '24'? 
    setUrl(`https://api.coingecko.com/api/v3/coins/${coinInfo.id}/market_chart?vs_currency=usd&days=1&interval=minutely`) :
    setUrl(`https://api.coingecko.com/api/v3/coins/${coinInfo.id}/market_chart?vs_currency=usd&days=${days}&interval=hourly`);
    setDay(days);
  };

  let label = getLabel(day,historyMarket);
  let price = getPrice(day,historyMarket);

  useEffect(() => {
  if (myChart !== null) {
    console.log('destroyed')
    myChart.destroy()
  };

  setMyChart(
   new Chart(canvasRef.current.getContext('2d'), {
      type: 'line',
      data: {
          labels: label,
          datasets: [{
              label: coinInfo.name,
              data: price,
              fill: false,
              borderColor: 'rgb(89, 72, 213)',
              tension: 0.1,
              borderWidth: 2
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
  })
  );
  },[historyMarket])
 
  return (
    <div className="chartLine">
      <div className="row">
        <div className="col-12">
          <div className="btn-toolbar">
            <span className="ms-auto">
              <button className={day==="24"? defaultBtnClass + " active" : defaultBtnClass} onClick={handleClick}>24h
              </button>
              <button className="btn btn-warning graph-btn" onClick={handleClick}>7d</button>
              <button className="btn btn-warning graph-btn" onClick={handleClick}>30d</button>
              <button className="btn btn-warning graph-btn" onClick={handleClick}>90d</button>
              <button className="btn btn-warning graph-btn" onClick={handleClick}>365d</button>
            </span>
          </div>
          <canvas ref={canvasRef} id="myChart"></canvas>
        </div>
      </div> 
    </div>
  )
};


function TransactionGraph({holding}) {
  const canvasRef = useRef();
  let label = holding.map(coin => coin.coinName);

  useEffect(() => {
    new Chart(canvasRef.current.getContext('2d'), {
      type: 'doughnut',
      data: {
          labels: label,
          datasets: [{
              data: holding.map(coin => coin.equity),
              fill: false,
              backgroundColor: 'rgb(253, 160, 48)',
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
    <div className="chartPie">
      <canvas ref={canvasRef} id="myChart"  width="500" height="500"></canvas>
    </div>
  )
};


// function UserInvestmentGraph({userInvestments}) {
//   const canvasRef = useRef();
  
//   const initInvestment = userInvestments.reduce((sum,coin) => {
//     return sum + (coin.avePrice * coin.qty)
//   },0);
  
//   async function reduce(userInvestments) {
//     let result = 0;
//     for (const coin of userInvestments) {
//       const url = `https://api.coingecko.com/api/v3/coins/${coin.coinIdName}?localization=false&tickers=false&market_data=true&community_data=false&developer_data=false&sparkline=false`
//       const res = await fetch(url);
//       const coinInfo = await res.json();
//       let curPrice = coinInfo.market_data.current_price.usd
//       result += (curPrice * coin.qty)
//     }

//     new Chart(canvasRef.current.getContext('2d'), {
//       type: 'line',
//       data: {
//           labels: ['Initial Investment', 'Current Investment'],
//           datasets: [{
//               label: 'User Investment',
//               data: [initInvestment,result],
//               fill: false,
//               borderColor: 'rgb(75, 192, 192)',
//               tension: 0.1
//           }]
//       },
//       options: {
//           scales: {
//               y: {
//                   beginAtZero: true
//               }
//           }
//       }
//   });
//   }

//   useEffect(() => {
//       reduce(userInvestments)
//   },[userInvestments])
  
//   return (
//     <div id="coinContainer">
//       <canvas ref={canvasRef} id="myChart" width="500" height="500"></canvas>
//     </div>
//   )
// };


