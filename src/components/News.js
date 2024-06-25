import React, { useState, useEffect } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import propTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props) {

    let [articles, setArticles] = useState([]);
    let [loading, setLoading] = useState(false);
    let [currentPage, setCurrentPage] = useState(1);
    let [totalResults, setTotalResults] = useState(0);

    // document.title = `${props.category} - newsMonkey`;

    const updateNews = async () => {
        props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${currentPage}&pageSize=${props.pageSize}`;
        setLoading(true);
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);
        setArticles(parsedData.articles);
        setTotalResults(parsedData.totalResults);
        setLoading(false);
        props.setProgress(100);
    }

    useEffect(() => {
        updateNews();
    }, [])

    const fetchMoreData = async () => {
        currentPage += 1;
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${currentPage}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        setArticles(articles.concat(parsedData.articles));
        setCurrentPage(currentPage);
    }

    return (
        <>
            <div className="container my-3">
                <h2>News Monkey - Top Headlines</h2>
                {loading && <Spinner />}
                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={articles.length < totalResults}
                    loader={<Spinner />}
                >
                    <div className="container row my-1">
                        {articles.map((element) => {
                            return (
                                <div key={element.url} className="col-md-4">
                                    <NewsItem
                                        title={element ? element.title : " "}
                                        description={element ? element.description : " "}
                                        imgSrc={element.urlToImage}
                                        newsUrl={element.url}
                                        newsName={element.source.name}
                                        author={element.author}
                                        date={element.publishedAt}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </InfiniteScroll>
            </div>
        </>
    );
}

News.defaultProps = {
    country: "in",
    category: "general",
    pageSize: 3
}

News.propTypes = {
    country: propTypes.string,
    category: propTypes.string,
    pageSize: propTypes.number,
}