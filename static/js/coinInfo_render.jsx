const { useState } = React;

function CoinInfoRender({coinName, coinInfo}) {
  return (
    <div className="container">
      <CoinGraph coinInfo={coinInfo}/>
      <AddFavCoin coinName={coinName}/>
      <CoinInfo coinInfo={coinInfo}/>
      <CoinNews coinName={coinName}/>
    </div>
  )
}