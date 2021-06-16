const { Redirect, Route, Link, BrowserRouter } = ReactRouterDOM;
const { useState, useEffect } = React;

function Coins() {
    const [todos, setTodo] = useState("");

    // useEffect(() => {
    //     fetch('https://cors-anywhere.herokuapp.com/https://www.coingecko.com/api/documentations/v3/swagger.json')
    //     .then(response => response.json())
    //     .then(data => console.log(data));
    // },[]);
    return (
        <div>
            <h1>I'm coin</h1>
        </div>    
    )
};

function Profile() {
    return (
        <div>
            <h1>from profile</h1>
        </div>    
    )
};