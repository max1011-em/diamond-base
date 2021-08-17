const { useState, useEffect } = React;

function News() {
  const {coinName} = ReactRouterDOM.useParams()
  const [news, setNews] = useState([]);
  const [headline, setHeadLine] = useState([]);

  useEffect(() => {
    fetch("/article.json")
    .then((res) => res.json())
    .then((article) => {
      setHeadLine(article.articles[0])
      setNews(article.articles.slice(1,9))
    });
  }, []);

  return (
    <div className="container">

      <div className="main-card">
        <a className="text-white" href={headline.url} target={"_blank"}>
          <div className="card mb-4 bg-primary">
            <div className="card-body headline">
              <h5 className="display-4 card-title">{headline.title}</h5>
              <p className="card-text">{headline.description}</p>
            </div>
            <div className="card-footer">
              <button className="btn btn-success ml-auto news-btn">Continue reading...</button>
            </div>
          </div>
        </a>
      </div>
      
      <h1 className="margin-2">Coin News</h1>
      <div className="row">
      {news.map((article,i)  =>
        <div key={i} className="col-md-12">
        <div className="card flex-md-row mb-4 box-shadow h-md-250">
          <div className="card-body d-flex flex-column align-items-start sub-body">
            <h3 className="mb-0">
            <a className="text-dark" href={article.url} target={"_blank"}>
              {article.title}</a>
            </h3>
            <div className="mb-1 text-muted">{article.published}</div>
            <p className="card-text mb-auto margin-2">{article.description}</p>
          </div>
          <img className="card-img-right flex-auto d-none d-md-block" src={article.image_url} alt="Card image cap" />
        </div>
      </div>
        )}
      </div>
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
      <h1 className="margin-4">{coinName} News</h1>
      <div className="row">
        {news.map((article,i)  =>
          <div key={i} className="col-md-12">
            <div className="card flex-md-row mb-4 box-shadow h-md-250">
              <div className="card-body d-flex flex-column align-items-start sub-body">
                <h3 className="mb-0">
                <a className="text-dark" href={article.url} target={"_blank"}>
                  {article.title}</a>
                </h3>
                <div className="mb-1 text-muted">{article.publishedAt}</div>
                <p className="card-text mb-auto">{article.description}</p>
              </div>
              <img className="card-img-right flex-auto d-none d-md-block" src={article.urlToImage} alt={`../static/img/crypto${i}.jpg`} />
            </div>
          </div>
        )}
      </div>
    
    </div>
  )
}