const { useState, useEffect } = React;

function CoinNews() {
  console.log("in coinNews")
  const {coinName} = ReactRouterDom.useParams()
  // const [news, setNews] = useState([]);
  // console.log(searchTerm)
  // useEffect(() => {

  // fetch('/add-coin-news', {
  //   method: "POST",
  //   body: JSON.stringify({searchTerm}),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  //   .then(response => response.json())
  //   .then(result => {
  //     console.log(result);
  //   });
  // }, []);

  return (
    <div>
      {/* {news.length > 0 ? <h1>Cryptocurrency News</h1> : null}
      {news.map((article,i) => (
        <div key={i}>
        <a href={article.url} target={"_blank"}>{article.title}</a>
        <h4>{article.publishedAt}</h4>
        <p>{article.description}</p>
        </div>
      ))} */}
      <h2>coin news</h2>
      <div>{coinName}</div>
    </div>
  )
}

function CoinNewsContainer() {
  
  return (
    <div>
      {/* {news.length > 0 ? <h1>Cryptocurrency News</h1> : null}
      {news.map((article,i) => (
        <div key={i}>
        <a href={article.url} target={"_blank"}>{article.title}</a>
        <h4>{article.publishedAt}</h4>
        <p>{article.description}</p>
        </div>
      ))} */}
      <p>test</p>
    </div>
  )
}