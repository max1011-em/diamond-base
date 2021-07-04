const { useState, useEffect } = React;
const { Redirect, Route, Link, BrowserRouter, NavLink } = ReactRouterDOM;

function App() {
    const [userLogin, setLogin] = useState(false);
    const [curUserId, setCurUserId] = useState(null);

    const getLogin = (loginInfo) => {
        setLogin(loginInfo.user_loggedin);
        setCurUserId(loginInfo.user_id)
    };
    //userEffect to check the session. fetch server. 

    return (  
        <BrowserRouter>
            {userLogin ? 
                //pass the set state to searchbar
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
                <Homepage />
            </Route>
            <Route exact path="/login">
                {userLogin? 
                <Redirect to="/main"/> 
                : <LoginContainer getLogin={getLogin}
                />}     
            </Route>
            <Route path="/main">
                <MainContainer curUserId={curUserId}/>      
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