// function getUrl(day, coinId) {

//   if(day === '24') {
//     return `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=1&interval=minutely`
//   } 
//     else if(day === '7') {
//     return `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=7&interval=hourly`
//   }
//     else if(day === '30') {
//     return `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=hourly`
//   } 
//     else if(day === '90') {
//     return `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=90&interval=daily`
//   } 
//     else if(day === '1') {
//     return `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=365&interval=hourly`
//   }
// }


function getLabel(day,data) {
  let label = []

  if(day === '24') {
    for(let i = 0; i < data.length; i+= 3) {
      let time = new Date(data[i][0]).toString().split(' ').slice(0,5).join(' ')
      label.push(time);
    }
  } else if (day === '7') {
    for(let i = 0; i < data.length; i+= 2) {
      let time = new Date(data[i][0]).toString().split(' ').slice(0,5).join(' ')
      label.push(time);
    }
  } else if (day === '30') {
    for(let i = 0; i < data.length; i+= 7) {
      let time = new Date(data[i][0]).toString().split(' ').slice(0,5).join(' ')
      label.push(time);
    }
  } else if (day === '90') {
    for(let i = 0; i < data.length; i+= 20) {
      let time = new Date(data[i][0]).toString().split(' ').slice(0,5).join(' ')
      label.push(time);
    }
  } else if (day === '365') {
    for(let i = 0; i < data.length; i+= 4) {
      let time = new Date(data[i][0]).toString().split(' ').slice(0,5).join(' ')
      label.push(time);
    }
  }
  return label;
};


function getPrice(day,data) {
  let price = []

  if(day === '24') {
    for(let i = 0; i < data.length; i+= 3) {
      price.push(data[i][1])
    }
  } else if (day === '7') {
    for(let i = 0; i < data.length; i+= 2) {
      price.push(data[i][1])
    }
  } else if (day === '30') {
    for(let i = 0; i < data.length; i+= 7) {
      price.push(data[i][1])
    }
  } else if (day === '90') {
    for(let i = 0; i < data.length; i+= 20) {
      price.push(data[i][1])
    }
  } else if (day === '365') {
    for(let i = 0; i < data.length; i+= 4) {
      price.push(data[i][1])
    }
  }
  return price;
};