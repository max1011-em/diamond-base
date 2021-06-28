const { Redirect, Route, Link, BrowserRouter } = ReactRouterDOM;
const { useState, useEffect, useRef } = React;


function MainContainer({curUserId}) {

  return (
    <div>
      <h4>currentId:{curUserId}</h4>
      <UserInvestmentContainer curUserId={curUserId}/>
      <CoinSearchForm />
    </div>
  )
}
