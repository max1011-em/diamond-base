const { useState, useEffect } = React;

function CoinNews({searchTerm}) {
  const [news, setNews] = useState([]);
  console.log(searchTerm)
  useEffect(() => {
  const url = `/coin-news?term=${searchTerm}`;
  fetch(url)
    .then(response => response.json())
    .then(result => {
      setNews(result);
      console.log(result)
    });
  }, []);

  return (
    <div>
      {news.length > 0 ? <h1>Cryptocurrency News</h1> : null}
      {news.map((article,i) => (
        <div key={i}>
        <a href={article.url} target={"_blank"}>{article.title}</a>
        <h4>{article.publishedAt}</h4>
        <p>{article.description}</p>
        </div>
      ))}
    </div>
  )
}