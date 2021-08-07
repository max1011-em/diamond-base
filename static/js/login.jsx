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
        <img class="mb-4" src="../static/img/diamond.png" alt="" width="80" height="80"/>
        <div>
          <h1 class="h1 mb-3 fw-normal">Welcome Diamond Hands</h1>
          <label for="inputEmail" class="sr-only">Email address</label>
          <input 
            type="email" 
            id="inputEmail"
            class="form-control" 
            placeholder="Email address" 
            name="username"
            required autofocus
            value={username}
            onChange={(e) => setUser(e.target.value)}
          />
        </div>
        <div>
          <label for="inputPassword" class="sr-only">Password</label>
          <input 
            type="password" 
            id="inputPassword" 
            class="form-control" 
            placeholder="Password" 
            required
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button class="btn btn-primary btn-lg btn-block">Sign in</button>
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
      <div class="text-center">
          <LoginForm setAppLoginStatus={setAppLoginStatus} />
          <Link to="/signup">Sign up</Link>
          {loginStatus || <h1>You are not here, Please signup!</h1>}
      </div>
    </div>
  )
}

