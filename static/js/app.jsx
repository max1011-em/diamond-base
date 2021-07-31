const { useState, useEffect } = React;
const { Redirect, Route, Link, BrowserRouter, NavLink } = ReactRouterDOM;

function App() {
    const [userLogin, setLogin] = useState(false);
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
    console.log("login", userLogin)
    return (  
    <>
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
            <LoginContainer />      
        </Route>
        
        <Route exact path="/signup">
            <SignupContainer />        
        </Route>
     </BrowserRouter>}
    </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));