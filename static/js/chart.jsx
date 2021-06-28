const { useState, useEffect, useRef } = React;

function calculateChange(curr, currChange) {
  if (currChange === 0) {
      return curr;
  }
  return currChange > 0 ? curr / (currChange/100) : curr + (curr * (currChange * -1 / 100));
}

function CoinGraph({coinData}) {
  const canvasRef = useRef();
  
  const currPrice = coinData.market_data.current_price.usd;
  const change24h = calculateChange(currPrice, coinData.market_data.price_change_percentage_24h);
  const change7d = calculateChange(currPrice, coinData.market_data.price_change_percentage_7d);
  const change30d = calculateChange(currPrice, coinData.market_data.price_change_percentage_30d);
  const change200d = calculateChange(currPrice, coinData.market_data.price_change_percentage_200d);
  const change1y = calculateChange(currPrice, coinData.market_data.price_change_percentage_1y);
  console.log(currPrice,change24h,change7d,change30d,change200d,change1y)
  // var ctx = document.getElementById('myChart').getContext('2d');
  useEffect(() => {
    var myChart = new Chart(canvasRef.current.getContext('2d'), {
      type: 'line',
      data: {
          labels: ['1Y', '200D', '30D', '7D', '1D', 'Current Price'],
          datasets: [{
              label: coinData.name,
              data: [change1y, change200d, change30d, change7d, change24h, currPrice],
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
  },[coinData])
  
  return (
    <div id="coinContainer">
      <canvas ref={canvasRef} id="myChart" width="500" height="500"></canvas>
    </div>
  )
};


function UserCoinGraph() {
  const canvasRef = useRef();
  
  useEffect(() => {
    var myChart = new Chart(canvasRef.current.getContext('2d'), {
      type: 'line',
      data: {
          labels: ['1Y', '200D', '30D', '7D', '1D', 'Current Price'],
          datasets: [{
              label: coinData.name,
              data: [change1y, change200d, change30d, change7d, change24h, currentPrice],
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
  },[coinData])
  
  return (
    <div id="coinContainer">
      <canvas ref={canvasRef} id="myChart" width="500" height="500"></canvas>
    </div>
  )
};