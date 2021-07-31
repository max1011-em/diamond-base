const { useState, useEffect } = React;
const { Redirect, Route, Link, BrowserRouter, NavLink } = ReactRouterDOM;

function App() {
    const [userLogin, setLogin] = useState(localStorage.getItem('login'));
    const [isPaperHand, setIsPaperHand] = useState("");
    const [coinName, setCoinName] = useState("");
    const [coinInfo, setCoinInfo] = useState({});

    const getLogin = (loginInfo) => {
        setLogin(loginInfo.user_loggedin);
    };

    const getPaperHand = (paperHand) => {
        setIsPaperHand(paperHand)
    }

    const getLogout = (isLogout) => {
        setLogin(isLogout)
    }

    useEffect(() => {
        fetch("/session")
          .then((res) => res.json())
          .then((result) => {
              console.log(result)
            setLogin(result.hasSession)
          });
      }, []);
      
      const getCoinName = (coinName) => {
        setCoinName(coinName);
      };
    
      const getCoinInfo = (coinInfo) => {
        setCoinInfo(coinInfo);
      };

    return (  
   <BrowserRouter>
    {userLogin ? 
        <Header getLogout={getLogout}
                getCoinName={getCoinName}
                getCoinInfo={getCoinInfo}/>
        : null}

    <Route exact path="/">
        <Homepage getPaperHand={getPaperHand}/>
    </Route>

    {isPaperHand ==="Yes" ? 
    <Redirect to="/block"/>
    : (isPaperHand === "No"?
    <Redirect to="/login"/> : null)
    }

    <Route exact path="/main">
        {userLogin ? <MainContainer /> :  <Redirect to="/login"/>}     
    </Route>
    <Route path="/main/:coinId">
        <CoinInfoRender coinName={coinName} coinInfo={coinInfo}/>
    </Route>
    <Route exact path="/login">
        {userLogin? 
        <Redirect to="/main"/> 
        :  <LoginContainer getLogin={getLogin} />}     
    </Route>
    <Route exact path="/block">
        <BlockUser />
    </Route>
    <Route exact path="/signup">
        <SignupContainer />        
    </Route>
    <Route exact path="/prices">
        {userLogin ? <CoinPrice getCoinInfo={getCoinInfo} getCoinName={getCoinName}/>  
        :  <Redirect to="/login"/>}    
        
    </Route>
    <Route exact path="/exchange">      
        {userLogin ? <CoinExchange /> :  <Redirect to="/login"/>}     
    </Route>
    <Route exact path="/news">
        {userLogin ? <News /> :  <Redirect to="/login"/>}        
    </Route>
    <Route exact path="/transaction">
        {userLogin ? <TransactionContainer />  :  <Redirect to="/login"/>}      
    </Route>
</BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

{/* <>
    {userLogin? 
        <BrowserRouter>
            <Header getLogout={getLogout}
                    getCoinName={getCoinName}
                    getCoinInfo={getCoinInfo}/>
        
        <Route exact path="/main">
            <MainContainer />     
        </Route>
        <Route path="/main/:coinId">
            <CoinInfoRender coinName={coinName} coinInfo={coinInfo}/>
        </Route>
        <Route exact path="/prices">
             <CoinPrice getCoinInfo={getCoinInfo} getCoinName={getCoinName}/>         
        </Route>
        <Route exact path="/exchange">      
            <CoinExchange />     
        </Route>
        <Route exact path="/news">
            <News />        
        </Route>
        <Route exact path="/transaction">
            <Transaction />      
        </Route>
    </BrowserRouter> 
   
    :
    <BrowserRouter>
        <Route exact path="/">
            <Homepage getPaperHand={getPaperHand}/>
        </Route>
        <Route exact path="/block">
            <BlockUser />
        </Route>
        {isPaperHand ==="Yes" ? 
          <Redirect to="/block"/>
        : (isPaperHand === "No"?
        <Redirect to="/login"/> : null)
        }
        <Route exact path="/login">
            <LoginContainer getLogin={getLogin} />      
        </Route>
        
        <Route exact path="/signup">
            <SignupContainer />        
        </Route>
     </BrowserRouter>}
    </>
    );
} */}


{/* <BrowserRouter>
{userLogin ? 
    <Header getLogout={getLogout}
            getCoinName={getCoinName}
            getCoinInfo={getCoinInfo}/>
    : null}

<Route exact path="/">
    <Homepage getPaperHand={getPaperHand}/>
</Route>

{isPaperHand ==="Yes" ? 
  <Redirect to="/block"/>
: (isPaperHand === "No"?
<Redirect to="/login"/> : null)
}

<Route exact path="/main">
    {userLogin ? <MainContainer /> :  <Redirect to="/login"/>}     
</Route>
<Route path="/main/:coinId">
    <CoinInfoRender coinName={coinName} coinInfo={coinInfo}/>
</Route>
<Route exact path="/login">
    {userLogin? 
    <Redirect to="/main"/> 
    :  <LoginContainer getLogin={getLogin} />}     
</Route>
<Route exact path="/block">
    <BlockUser />
</Route>
<Route exact path="/signup">
    <SignupContainer />        
</Route>
<Route exact path="/prices">
     {userLogin ? <CoinPrice getCoinInfo={getCoinInfo} getCoinName={getCoinName}/>  
     :  <Redirect to="/login"/>}    
       
</Route>
<Route exact path="/exchange">      
    {userLogin ? <CoinExchange /> :  <Redirect to="/login"/>}     
</Route>
<Route exact path="/news">
    {userLogin ? <News /> :  <Redirect to="/login"/>}        
</Route>
<Route exact path="/transaction">
    {userLogin ? <TransactionContainer />  :  <Redirect to="/login"/>}      
</Route>
</BrowserRouter> */}