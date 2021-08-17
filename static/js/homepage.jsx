const { useState } = React;

function Homepage({getPaperHand}) {
  const [userAnswer, setUserAnswer] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    setUserAnswer(e.target.innerText);
    getPaperHand(e.target.innerText);
  };

  return (
    <div className="homepage">

      <section className="demo-1 container-fluid d-flex justify-content-center align-items-center">
        <div className="row justify-content-center">
          <div className="column">
            <h1 className="homepage-text">Are you DIAMOND HANDS?</h1>
            <h1 className="homepage-text">or </h1>
            <h1 className="homepage-text">PAPER HANDS?</h1>              
            <div className="homepage-button">
              <button className="homepage-button-diamond" onClick={handleClick}>I'm Diamond Hands</button>
              <button className="homepage-button-paper" onClick={handleClick}>I'm Paper Hands</button>
            </div>
          </div>
        </div>
      </section>
    </div>

  );
}

