const { useState, useEffect } = React;
const { Redirect, Route, Link, BrowserRouter, NavLink } = ReactRouterDOM;

function App() {
    const [userLogin, setLogin] = useState(false);
    const [isPaperHand, setIsPaperHand] = useState("");
    const [coinName, setCoin] = useState("");
    const [coinInfo, setInfo] = useState({});

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
        setCoin(coinName);
      };
    
      const getCoinInfo = (coinInfo) => {
        setInfo(coinInfo);
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
            <Route path="/main/:coinName">
                <CoinGraph coinData={coinInfo}/>
                <AddFavCoin coinName={coinName}/>
                <CoinInfo coinInfo={coinInfo}/>
                <CoinNews coinName={coinName}/>
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
                <CoinPrice />     
            </Route>
            <Route exact path="/news">
                <News />        
            </Route>
            <Route exact path="/profile">
                <Profile />      
            </Route>
        </BrowserRouter>

    );
}

ReactDOM.render(<App />, document.getElementById('root'));