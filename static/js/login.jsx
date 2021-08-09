const { Link } = ReactRouterDOM;
const { useState, useEffect } = React;

function LoginForm({setAppLoginStatus}) {
  const [username, setUser] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const formInputs = {
      username: username,
      password: password
    };

    fetch('/login-process', {
      method: "POST",
      body: JSON.stringify(formInputs),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((result) => {
        setAppLoginStatus(result);
        localStorage.setItem("login",true);
      });
  };

  return (
      <form className="form-signin" onSubmit={handleSubmit}>
        <img className="mb-4" src="../static/img/diamond.png" alt="" width="80" height="80"/>
        
          <h1 className="h1 mb-3 fw-normal">Welcome Diamond Hands</h1>
          <label>Email address</label>
          <input 
            type="email" 
            id="inputEmail"
            className="form-control" 
            placeholder="Email address" 
            name="username"
            required autoFocus
            value={username}
            onChange={(e) => setUser(e.target.value)}
          />
          <label>Password</label>
          <input 
            type="password" 
            id="inputPassword" 
            className="form-control" 
            placeholder="Password" 
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        <button className="btn btn-lg btn-block col-12 login-button">Log in</button>
      </form>
  );
}

function LoginContainer({getLogin}) {
  const [loginStatus, setLoginStatus] = useState(true);

  const setAppLoginStatus = (result) => {
    setLoginStatus(result.user_loggedin);
    getLogin(result);
  };

  return (
    <div className="login container-fluid d-flex justify-content-center align-items-center">
      <div className="text-center">
          <LoginForm setAppLoginStatus={setAppLoginStatus} />
          <Link to="/signup">Sign up</Link>
          {loginStatus || <h1>You are not here, Please signup!</h1>}
      </div>
    </div>
  )
}

