# Diamond Base
Diamond base is a Single Page Application to centralize investment tracking and coin data for investors. The backend delivers user data through Python with the Flask web framework. The Front end is javascript using React with React Router to reduce API wait time, speeding up user interactions and improving performance.


<!-- ![Homepage](/static/gif/homepage.gif "Homepage") -->

## Contents
 - [Technologies](#technologies)
- [Datasets/APIs](#apis)
 - [Installation](#installation)
 - [Features](#features)
 - [Features for 2.0](#featuresfor2.0)
 - [About the Developer](#aboutthedeveloper)

### Technologies
* Python 
* PostgresSQL
* Flask
* Flask-SQLAlchemy
* SQLAlchemy
* Javascript
* AJAX/JSON
* React
* React Router
* Bootstrap
* HTML/CSS

### <a name="apis"></a> Datasets/APIs
* [CoinGecko](https://www.coingecko.com/en/api) 
* [newapi](https://newsapi.org/)

---
### Installation
#### Prerequisites
To run Diamond Base, you must have installed:
 - [PostgreSQL](https://www.postgresql.org/)
 - [Python](https://www.python.org/downloads/)


 #### Diamond Base on your local computer

 Clone or fork repository:
 ```
 $ git clone https://github.com/max1011-em/diamond-base.git
 ```

Create and activate a virtual environment within your Eat Drink Vote directory:
```
$ virtualenv env
$ source env/bin/activate
```
Install dependencies:
```
$ pip install -r requirements.txt
```
Get an API key from OpenSecrets and add your API key to the opensecrets_api.py file.

Create database 'coins':
   ```
$ createdb coins
```
To create the database tables and seed the database with each CSV file (indivs18, votes, industry_codes), run the following commands:
   ```
$ python3 model.py
```
   ```
$ python3 seed_database.py
```
   ```
$ python3 news_api_functions.py
```
  
To run the app from the command line:
```
$ python3 server.py
```
---
### Features

#### Gate
Each new user must confirm they “hodl” before signing up through an initial gate where they are asked their  ‘Diamond Hands’ or ‘Paper Hands’ status. 
If ‘Paper Hands, they are blocked.
If ’Diamond Hands’, they are redirected to a sign in page.

![gate](/static/gif/gate1.gif "gate")

#### Main Page
The main page allows users to easily view and update their total current holdings easily.

![main](/static/gif/main1.gif "main")

#### Search coin
To make finding coin information easy, users can also find information related to any coin with autocomplete search.Using Chart.js with custom algorithms to display historical data for 24h to 1 year. Users can also see date and price by hovering over each point of data.
 
![search coin](/static/gif/searchCoin.gif "search coin")

#### Transactions
View all transaction history and see a breakdown of their holdings. A pie through chart.js to visually display total holdings, allowing for an easily digestible breakdown.Users can click the coin and see all clicked coin transactions and can remove the data with the remove button.

![transaction](/static/gif/transaction.gif "transaction")

#### Price
Users are provided additional information to help them with their decisions. Current top 100 coins by market cap are shown under prices. Each list item connects to a coin information page.

![price](/static/gif/price.gif "price")

#### News
Top articles on the news page, and follow links to view articles on the linked websites.

![news](/static/gif/news.gif "news")

#### Exchange
Users are provided exchanges websites by trust rank. 
![exchange](/static/img/exchange.png "exchange")

### <a name="aboutthedeveloper"></a> About the Developer
Diamond Base developer Nara Kim is a landscape architect and software engineer. This is her first full-stack project. She can be found on [LinkedIn](https://www.linkedin.com/in/nara-kim-6b4b37b0/) and on [Github](https://github.com/max1011-em).