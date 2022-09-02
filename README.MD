<div align="center" >
  <a href="#readme-top">
    <img src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="Logo" width="80" height="80">
  </a>

<h3 align="center">Stock Analysis</h3>

  <p align="center">
    A website that provides historical data, news headlines, and sentiment for stocks
    <br />
    <a href="https://github.com/MatthewS-1/stock-analysis"><strong>Explore the docs »</strong></a>
    <br />
    <a href="https://github.com/MatthewS-1/stock-analysis/issues">Report Bug</a>
    ·
    <a href="https://github.com/MatthewS-1/stock-analysis/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project


https://user-images.githubusercontent.com/74331273/188052536-356d6ed8-95be-4890-9edd-df11a8416779.mp4


I'm currently working on deploying the project, so for the time being here is a video

<h3>How it works</h3>
The server uses Nasdaq and newsapi.org APIs to create two endpoints '/stocks/{stock symbol}' and '/news/{stock symbol}'. When one of these endpoints are called data from the Nasdaq and newsapi.org APIs are called and stored in a MySQL database. The MySQL database stores the data along with a timestamp, so that new calls to the Nasdaq and newsapi.org APIs only occur again after 6 hours. 
<br></br>
To perform sentiment analysis, I developed a Naive Bayes classifier, as it's very good for performance. I used [Sentiment Analysis for Financial News](https://www.kaggle.com/datasets/ankurzing/sentiment-analysis-for-financial-news) and [Financial Sentiment Analysis](https://www.kaggle.com/datasets/sbhatti/financial-sentiment-analysis?select=data.csv) for training. In the '/news/{stock symbol}' endpoint, there is an extra part where the classifier is applied to the articles retrieved from the newsapi.org API so that a sentiment score is produced.
<br></br>
The client utilizes the two API endpoints to retrieve data. The '/stocks/{stock symbol}' endpoint is used for the statistics component, which involves a graph and stats about a stock. On the other hand, the table with recent news headlines and a sentiment score uses '/news/{stock symbol}' for data.


### Built With

* [Node](https://nodejs.org/en/)
<br></br>
* [React](https://reactjs.org/)
* [react-chartjs-2](https://react-chartjs-2.js.org/)
* [Chakra-UI](https://chakra-ui.com/)
<br></br>
* [Express](https://expressjs.com/)
* [Nasdaq API](https://data.nasdaq.com)
* [NewsAPI.org API](https://newsapi.org)
* [Natural.js](https://www.npmjs.com/package/natural)
<br></br>
* [MySql](https://www.mysql.com/)
* [Node.js MySql](https://www.npmjs.com/package/mysql)

<!-- GETTING STARTED -->
## Getting Started

### Prerequisites

Ensure npm is up to date
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Get a free Nasdaq API Key and a NewsAPI key at [Nasdaq API](https://data.nasdaq.com) [NewAPI](https://newsapi.org)
2. Clone the repo
   ```sh
   git clone https://github.com/MatthewS-1/stock-analysis.git
   ```
3. Install NPM packages
   ```sh
   cd client
   npm install
   ```
   ```sh
   cd server
   npm install
   ```
4. Set Up your MySQL server by importing the MySQL dump found in the 'MySqlDump' folder
   ![MySQL import](https://dev.mysql.com/doc/workbench/en/images/wb-navigator-data-export-object.png)
4. Enter your API in `config.js`
   ```ts
    const NEWS_API_KEY = "Nasdaq API key"
    const NASDAQ_API_KEY = "NewsAPI.org key"

    //enter your MySQL config
    const connection = mysql.createConnection({
        host: '',
        user: '',
        password: '',
        database: ''
    })
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- ROADMAP -->
## Roadmap

- [x] Save API calls to MySQL database
- [x] Implement Sentiment Classification
- [ ] Deploy website

See the [open issues](https://github.com/github_username/repo_name/issues) for a full list of proposed features (and known issues).

<p align="right">



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)
</p>
