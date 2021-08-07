const { useState } = React;

function Homepage({getPaperHand}) {
  const [userAnswer, setUserAnswer] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();

    // let answer;
    // e.target.innerText === 'Yes'? answer=true: answer=false;
    setUserAnswer(e.target.innerText);
    getPaperHand(e.target.innerText);
  };

  return (
    <div className="homepage">
      {/* <div className="background-video">
        <video autoPlay muted loop>
          <source src="../static/img/Unicorn-Around.webm" type="video/webm" />
        </video>
      </div> */}
      <section className="demo-1 container-fluid d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="column">
            <h1 className="homepage-text">Are you DIAMOND HANDS? or </h1>
            <h1 className="homepage-text">PAPER HANDS?</h1>              
            <button className="homepage-button-diamond" onClick={handleClick}>I'm Diamond Hand</button>
            <button className="homepage-button-paper" onClick={handleClick}>I'm Paper Hand</button>
          </div>
        </div>
      </section>
    </div>

  );
}

