
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