const { useState, useEffect } = React;
const { Redirect, Route, Link, BrowserRouter, NavLink } = ReactRouterDOM;

function App() {
    const [userLogin, setLogin] = useState(false);
    const [isPaperHand, setIsPaperHand] = useState("");

    const getLogin = (loginInfo) => {
        setLogin(loginInfo.user_loggedin);
    };

    const getLogout = (logoutInfo) => {
        setLogin(logoutInfo.userLogout)
    }
    const getPaperHand = (paperHand) => {
        setIsPaperHand(paperHand)
    }

    const handleLogout = (e) => {
        e.preventDefault();
    
        fetch("/logout-process", {
          method: "POST",
          body: JSON.stringify({'logout': true}),
          headers: {
          'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then((result) => {
          setLogin(result.userLogout)
        });
      }

    useEffect(() => {
        fetch("/session")
          .then((res) => res.json())
          .then((result) => {
            setLogin(result.hasSession)
          });
      }, []);
    

    return (  
        <BrowserRouter>
            {userLogin ? 
                <header>
                <NavLink 
                to="/main"
                activeClassName="navlink-active"
                className="nav-link">Main</NavLink>
                <NavLink 
                to="/prices"
                activeClassName="navlink-active"
                className="nav-link">Prices</NavLink>
                <NavLink 
                to="/news"
                activeClassName="navlink-active"
                className="nav-link">News</NavLink>
                <NavLink 
                to="/profile"
                activeClassName="navlink-active"
                className="nav-link">Profile</NavLink>
                <button onClick={handleLogout}>test Logout</button>
                </header>
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
                {userLogin ? <MainContainer getLogout={getLogout}/> :  <Redirect to="/login"/>}     
            </Route>
            <Route path="main/:coinName">
                {/* <CoinGraph coinData={coinInfo}/>
                <CoinInfo coinInfo={coinInfo}/> */}
                <CoinNews />
                {/* <AddFavCoin coin={coinName}/> */}
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
                <TopVolCoinList />          
            </Route>
            <Route exact path="/news">
                <CoinNews />          
            </Route>
            <Route exact path="/profile">
                <Profile />          
            </Route>

            
            {/* <Route exact path={path}>
                <h1>Your investment</h1>
                <UserInvestmentContainer />
                <UserFavCoinContainer />
                {/* <CoinNews searchTerm={"cryptocurrency"}/> */}
            {/* </Route> */}

        </BrowserRouter>

    );
}

ReactDOM.render(<App />, document.getElementById('root'));