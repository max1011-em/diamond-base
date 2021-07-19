const { useState, useEffect } = React;
const { Redirect, Route, Link, BrowserRouter, NavLink } = ReactRouterDOM;

function App() {
    const [userLogin, setLogin] = useState(false);
    const [isPaperHand, setIsPaperHand] = useState("");

    const getLogin = (loginInfo) => {
        setLogin(loginInfo.user_loggedin);
    };

    const getPaperHand = (paperHand) => {
        setIsPaperHand(paperHand)
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
                to="/profile"
                activeClassName="navlink-active"
                className="nav-link">Profile</NavLink>
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
            
            <Route path="/main">
                {userLogin ? <MainContainer /> :  <Redirect to="/login"/>}     
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
            <Route exact path="/profile">
                <Profile />          
            </Route>
        </BrowserRouter>

    );
}

ReactDOM.render(<App />, document.getElementById('root'));