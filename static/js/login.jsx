// const { useEffect } = require("react");
const { Link } = ReactRouterDOM;
const { useState, useEffect } = React;

function Homepage() {
  return (
    <div>
      <h1>Are you paper hands?</h1>
      <button>Yes</button>
      <button>No</button>
    </div>
  );
}

function LoginForm({getUser}) {
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
        getUser(result.user_loggedin);
        // Also send result.message
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
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
          type="text" 
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

  const setAppLoginStatus = (isLoggedIn) => {
    setLoginStatus(isLoggedIn);
    getLogin(isLoggedIn);
  };

  return (
      <div>
          <LoginForm getUser={setAppLoginStatus} />
          <Link to="/signup">Sign up</Link>
          {loginStatus || <h1>You are not here, Please signup!</h1>}
      </div>
  )
}

