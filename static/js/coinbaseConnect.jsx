const { useState, useEffect } = React;

function CoinbaseConnect() {
  const authUrl = `https://www.coinbase.com/oauth/authorize?client_id=196a722b4e0d4d872838803b9ffb97dab6d0b9118f426016395829d1bdb31027&redirect_uri=http%3A%2F%2F0.0.0.0%3A5000%2Fmain&response_type=code&scope=wallet%3Auser%3Aread`

  const redirect_uri = 'http://http://0.0.0.0:5000/main';

  return (
    <div>
      <a href={authUrl}>Connect Coinbase</a>
    </div>
  )
}