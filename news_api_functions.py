import requests
from apikey import NEWS_API_KEY
from model import connect_to_db, db, Article
import time


def get_articles_add_to_db():
    """get articles and add to db"""

    url = f"https://newsapi.org/v2/everything?q=cryptocurrency&apiKey={NEWS_API_KEY}"
    
    response = requests.get(url)
    data = response.json()
    articles = data['articles'][:10]

    for article in articles:
      Article_added = add_Article_to_db(article)


def get_coin_news_articles(coin_name):
    """get searched coin articles"""

    url = f"https://newsapi.org/v2/everything?q={coin_name}&apiKey={NEWS_API_KEY}"
    
    response = requests.get(url)
    data = response.json()
    articles = data['articles'][:3]

    return articles


def add_Article_to_db(article):
    """Create article object"""
    
    author = article['author']
    url = article['url']
    title = article['title']
    source = article['source']['name']
    image_url = article['urlToImage']
    published = article['publishedAt']
    description = article['description']


    add_article = Article(author=author,
                            url=url,
                            title=title,
                            source=source,
                            image_url=image_url,
                            published=published,
                            description=description)
    db.session.add(add_article)
    db.session.commit()
    return add_article


if __name__ == "__main__":
  from server import app

  connect_to_db(app)
  print("Connected to DB.")
  time_start = time.time()
  get_articles_add_to_db()
  time_end = time.time()
  print('Time taken to get news:', time_end - time_start)
