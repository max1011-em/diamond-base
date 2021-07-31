// const { useEffect } = require("react");
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
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Welcome to Diamond Hands </h1>
        <label>User name</label>
        <input 
          type="text" 
          name="username"
          value={username}
          onChange={(e) => setUser(e.target.value)}
          id="username"
        />
      </div>
      <div>
        <label>Password</label>
        <input 
          type="password" 
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          id="password"
        />
      </div>
      <button>Log in!</button>
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
      <div>
          <LoginForm setAppLoginStatus={setAppLoginStatus} />
          <Link to="/signup">Sign up</Link>
          {loginStatus || <h1>You are not here, Please signup!</h1>}
      </div>
  )
}

