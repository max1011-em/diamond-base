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
    <div>
      <h1>Are you paper hands?</h1>
      <button onClick={handleClick}>Yes</button>
      <button onClick={handleClick}>No</button>
    </div>
  );
}

