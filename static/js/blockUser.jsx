const { Link } = ReactRouterDOM;

function BlockUser() {
  return (
    <div className="block container-fluid d-flex justify-content-center align-items-center">
      <div className="text-center">
        <img className="mb-4" src="../static/img/block.png" alt="" width="200" height="200"/>
        <h1> Uh oh! You <span className="paper-text">PAPER HANDS</span>!</h1>
        <h2> You can't access our site</h2>
        <h2> Please come back when you are <span className="diamond-text">DIAMOND HANDS</span>!</h2>
        <Link className="btn btn-warning btn-lg" to="/">Go back home</Link>
      </div>
    </div>
  )
}


