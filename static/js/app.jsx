const { useState, useEffect } = React;
const { Redirect, Route, Link, BrowserRouter } = ReactRouterDOM;

function App() {
    const [userLogin, setLogin] = useState(false);
    const getLogin = (login) => {
        setLogin(login)
    }

    return (
        <BrowserRouter>
            <Route exact path="/">
                <Homepage />
            </Route>
            <Route exact path="/login">
                {userLogin? 
                <Redirect to="/coins"/> 
                : <LoginContainer getLogin={getLogin}
                />}     
            </Route>
            <Route exact path="/coins">
                <Coins />        
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