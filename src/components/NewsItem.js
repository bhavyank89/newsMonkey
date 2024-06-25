import React from 'react';

export default function NewsItem(props) {
    let { title, description, imgSrc, newsUrl, newsName, author } = props;
    return (
        <div>
            <div className="card my-3">
                <img src={imgSrc ? imgSrc : "https://store-images.microsoft.com/image/apps.12023.9007199266275245.7377bf21-471c-43a3-bb59-4c83837ff924.6a83faf9-2551-4185-8102-6471b3f26300?h=464"} style={{ width: "100%", height: "200px" }} className="card-img-top" alt="..." />
                <div className="card-body">
                    <span className="badge rounded-pill bg-danger my-1">{newsName}</span>
                    <h5 className="card-title">{title} ...<span style={{ fontSize: "15px", fontWeight: "500" }}>read More</span></h5>
                    <p className="card-text">{description} ...<span style={{ fontSize: "15px", fontWeight: "500" }}>read More</span></p>
                    <figcaption className="blockquote-footer text-end">{!author ? "unknown" : author}</figcaption>
                    <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
                </div>
            </div>
        </div>
    )
}