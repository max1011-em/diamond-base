const { useState, useEffect } = React;

function News() {
  const {coinName} = ReactRouterDOM.useParams()
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetch("/article.json")
    .then((res) => res.json())
    .then((article) => {
      setNews(article.articles)
    });
  }, []);

  return (
    <div>
      <h1>Coin News</h1>
      {news.map((article,i)  =>
        <div key={i}>
          <img
            src={article.image_url}
            style={{width: 50, height: 50, marginRight: 10}}
          />
          <a href={article.url} target={"_blank"}>{article.title}</a>
          <p>{article.author} {article.published} by {article.source}</p>
          <p>{article.description}</p>
        </div>
        )}
    </div>
  )
}


function CoinNews({coinName}) {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const url = `/coin-news?name=${coinName}`;
    fetch(url)
      .then(response => response.json())
      .then(article => {
        setNews(article.articles)
      });
    }, []);

  return (
    <div>
      <h1>Stories</h1>
      {news.map((article,i)  =>
        <div key={i}>
          <img
            src={article.urlToImage}
            style={{width: 50, height: 50, marginRight: 10}}
          />
          <a href={article.url} target={"_blank"}>{article.title}</a>
          <p>{article.author} {article.publishedAt} by {article.source.name}</p>
          <p>{article.description}</p>
        </div>
        )}
    </div>
  )
}