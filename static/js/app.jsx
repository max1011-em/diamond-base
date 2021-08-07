const { useState, useEffect } = React;
const { Redirect, Route, Link, BrowserRouter, NavLink } = ReactRouterDOM;

function App() {
    const [userLogin, setLogin] = useState(localStorage.getItem('login'));
    const [isPaperHand, setIsPaperHand] = useState("");
    const [coinName, setCoinName] = useState("");
    const [coinInfo, setCoinInfo] = useState({});
    const [transHistory, setTransHistory] = useState([]);
    const [transCoinName, setTransCoinName] = useState("");

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
            setLogin(result.hasSession)
          });
      }, []);
      
    const getCoinName = (coinName) => {
    setCoinName(coinName);
    };

    const getCoinInfo = (coinInfo) => {
    setCoinInfo(coinInfo);
    };

    const getTransHistory = (history) => {
        setTransHistory(history);
      }

    const getTransCoinName = (name) => {
    setTransCoinName(name);
    }
    
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

    {isPaperHand ==="I'm Paper Hand" ? 
    <Redirect to="/block"/>
    : (isPaperHand === "I'm Diamond Hand"?
    <Redirect to="/login"/> : null)
    }

    <Route exact path="/main">
        {userLogin ? <MainContainer /> :  <Redirect to="/login"/>}     
    </Route>
    <Route path="/main/:coinId">
        <CoinInfoRender coinName={coinName} coinInfo={coinInfo}/>
    </Route>
    <Route path="/transaction/:coinSym">
        <TransactionHistory history={transHistory} transCoinName={transCoinName}/>
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
        {userLogin ? <TransactionContainer 
                        getTransHistory={getTransHistory}
                        getTransCoinName={getTransCoinName}/>  
        :  <Redirect to="/login"/>}      
    </Route>
</BrowserRouter>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

