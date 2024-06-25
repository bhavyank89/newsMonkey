import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./spinner";
import propTypes from "prop-types";
import InfiniteScroll from 'react-infinite-scroll-component';

export default class News extends Component {
    static defaultProps = {
        country: "in",
        category: "general",
        pageSize: 3
    }

    static propTypes = {
        country: propTypes.string,
        category: propTypes.string,
        pageSize: propTypes.number,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            currentPage: 1,
            totalResults: 0
        }
        document.title = `${this.props.category} - newsMonkey`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const { currentPage } = this.state;
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${currentPage}&pageSize=${this.props.pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json();
        this.props.setProgress(70);
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false
        });
        this.props.setProgress(100);
    }

    async componentDidMount() {
        this.updateNews();
    }

    fetchMoreData = async () => {
        let { currentPage } = this.state;
        currentPage += 1;
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${currentPage}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            currentPage: currentPage,
        });
    }

    render() {
        return (
            <>
                <div className="container my-3">
                    <h2>News Monkey - Top Headlines</h2>
                    {this.state.loading && <Spinner />}
                    <InfiniteScroll
                        dataLength={this.state.articles.length}
                        next={this.fetchMoreData}
                        hasMore={this.state.articles.length < this.state.totalResults}
                        loader={<Spinner />}
                    >
                        <div className="container row my-1">
                            {this.state.articles.map((element) => {
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
}
