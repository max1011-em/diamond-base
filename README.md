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
To run Eat Drink Vote, you must have installed:
 - [PostgreSQL](https://www.postgresql.org/)
 - [Python](https://www.python.org/downloads/)


 #### Diamond Base on your local computer

 Clone or fork repository:
 ```
 $ git clone https://github.com/max1011-em/diamond-base
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
$ createdb donations
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
   ```
$ python3 opensecrets_api.py
```
  
To run the app from the command line:
```
$ python3 server.py
```
---
### Features

#### Gate
Each new user must confirm they “hodl” before signing up through an initial gate where they are asked their  ‘Diamond Hands’ or ‘Paper Hands’ status. 
If ‘Paper Hands, they are blocked
If ’Diamond Hands’, they are redirected to a sign in page

<!-- ![Browse Companies](/static/gif/browsecompanies.gif "Browse Companies") -->
#### Main Page
The main page allows users to easily view and update their total current holdings easily

<!-- ![Browse Politicians](/static/gif/browsepoliticians.gif "Browse Politicians") -->
#### Price
Users are provided additional information to help them with their decisions. Current top 100 coins by market cap are shown under prices. Each list item connects to a coin information page.

<!-- ![Why It Matters Quiz](/static/gif/quiz.gif "Why It Matters Quiz") -->
#### Exchange
Users are provided exchanges websites by trust rank. 
<!-- ![Save & Share Quiz Results](/static/gif/saveresults.gif "Save & Share Quiz Results") -->
#### News
Top articles on the news page, and follow links to view articles on the linked websites.

<!-- ![Save & Share Quiz Results](/static/gif/saveresults.gif "Save & Share Quiz Results") -->
#### Transactions
View all transaction history and see a breakdown of their holdings. A pie through chart.js to visually display total holdings, allowing for an easily digestible breakdown.Users can click the coin and see all clicked coin transactions and can remove the data with the remove button.

![Save & Share Quiz Results](/static/gif/saveresults.gif "Save & Share Quiz Results")

---
### <a name="featuresfor2.0"></a> Features for 2.0
Future iterations of this project will include:
* When a user searches for a company/politician in the search bar, all industry/state cells not containing that company will disappear. 
* Companies' names on the quiz page link out to their cells on the Browse Companies page.
* Quiz will be expanded to recommend food companies to users based on the issues that matter to them.
* Quiz will be lengthened to include more questions on more key issues.
---


### <a name="aboutthedeveloper"></a> About the Developer
Diamond Base developer Nara Kim is a landscape architect and software engineer. This is her first full-stack project. She can be found on [LinkedIn](https://www.linkedin.com/in/nara-kim-6b4b37b0/) and on [Github](https://github.com/max1011-em).