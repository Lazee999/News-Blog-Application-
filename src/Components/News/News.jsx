import React, { useState, useEffect } from 'react';
import Weather from "../Weather/Weather";
import Calender from '../Calender/Calender';
import './News.scss';
import userImg from '../../assets/images/user.jpg';
import noImg from '../../assets/images/no-img.png';
import blogImg1 from '../../assets/images/blog1.jpg';
import blogImg2 from '../../assets/images/blog2.jpg';
import blogImg3 from '../../assets/images/blog3.jpg';
import blogImg4 from '../../assets/images/blog4.jpg';
import axios from 'axios';
import NewsModal from '../NewsModal/NewsModal';
import Bookmark from '../Bookmarks/Bookmarks';
import BlogModal from '../BlogModal/BlogModal';

const categories = [
    'general',
    'world',
    'business',
    'entertainment',
    'sports',
    'science',
    'health',
    'nation',
];

const News = ({ onShowBlogs, blogs, onEditBlog }) => {
    const [headline, setHeadline] = useState(null);
    const [news, setNews] = useState([]);
    const [selectCategory, setSelectCategory] = useState('general');
    const [searchInput, setSearchInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);
    const [bookmarks, setBookmarks] = useState([]);
    const [showBookmarkModal, setShowBookmarkModal] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showBlogModal, setShowBlogModal] = useState(false);

    useEffect(() => {
        const fetchNews = async () => {
            let url = `https://gnews.io/api/v4/top-headlines?category=${selectCategory}&lang=en&apikey=a8f5cc7e26bfbc6875421e34e8f4241f`;

            if (searchQuery) {
                url = `https://gnews.io/api/v4/search?q=${searchQuery}&lang=en&apikey=a8f5cc7e26bfbc6875421e34e8f4241f`;
            }
            const response = await axios.get(url);
            const fetchedNews = response.data.articles;

            fetchedNews.forEach((article) => {
                if (!article.image) {
                    article.image = noImg;
                }
            });

            setHeadline(fetchedNews[0]);
            setNews(fetchedNews.slice(1, 7));

            const savedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
            setBookmarks(savedBookmarks);

            console.log(news);
        };
        fetchNews();
    }, [selectCategory, searchQuery]);

    const handleCategoryClick = (e, category) => {
        e.preventDefault();
        setSelectCategory(category);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setSearchQuery(searchInput);
        setSearchInput('');
    };

    const handleArticleClick = (article) => {
        setSelectedArticle(article);
        setShowModal(true);

        console.log(article);
    };

    const handleBookmarkClick = (article) => {
        setBookmarks((prevBookmarks) => {
            const updatedBookmarks = prevBookmarks.find((bookmark) => bookmark.title === article.title)
                ? prevBookmarks.filter((bookmark) => bookmark.title !== article.title)
                : [...prevBookmarks, article];
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks))
            return updatedBookmarks
        });
    };


    const handleBlogClick = (blog) => {
        if (!blog) return;
        setSelectedPost(blog);
        setShowBlogModal(true);
    };


    const closeBlogModal = () => {
        setShowBlogModal(false);
        setSelectedPost(null);
    }

    return (
        <div className='news'>
            <header className="news-header">
                <h1 className="logo">News & Blogs</h1>
                <div className="search-bar">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Search News..."
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button type="submit">
                            <i className="fa-solid fa-magnifying-glass"></i>
                        </button>
                    </form>
                </div>
            </header>
            <div className="news-content">
                <div className="navbar">
                    <div className="user" onClick={onShowBlogs}>
                        <img src={userImg} alt="User" />
                        <p>Mary's Blog</p>
                    </div>
                    <nav className="categories">
                        <h1 className="nav-heading">Categories</h1>
                        <div className="nav-links">
                            {categories.map((category) => (
                                <a
                                    href="#"
                                    key={category}
                                    className="nav-link"
                                    onClick={(e) => handleCategoryClick(e, category)}
                                >
                                    {category}
                                </a>
                            ))}
                            <a
                                href="#"
                                className="nav-link"
                                onClick={() => setShowBookmarkModal(true)}
                            >
                                Bookmarks <i className="fa-solid fa-bookmark"></i>
                            </a>
                        </div>
                    </nav>
                </div>
                <div className="news-section">
                    {headline && (
                        <div className="headline" onClick={() => handleArticleClick(headline)}>
                            <img src={headline.image || noImg} alt={headline.title} />
                            <h2 className="heading-title">
                                {headline.title}
                                <i
                                    className={`${bookmarks.some((bookmark) => bookmark.title === headline.title)
                                        ? 'fa-solid'
                                        : 'fa-regular'
                                        } fa-bookmark bookmark`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleBookmarkClick(headline);
                                    }}
                                ></i>
                            </h2>
                        </div>
                    )}
                    <div className="news-grid">
                        {news.map((article, index) => (
                            <div
                                key={index}
                                className="news-grid-item"
                                onClick={() => handleArticleClick(article)}
                            >
                                <img src={article.image || noImg} alt={article.title} />
                                <h3>
                                    {article.title}
                                    <i
                                        className={`${bookmarks.some((b) => b.title === article.title)
                                            ? 'fa-solid'
                                            : 'fa-regular'
                                            } fa-bookmark bookmark`}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleBookmarkClick(article); // Corrected here
                                        }}
                                    ></i>
                                </h3>
                            </div>
                        ))}
                    </div>
                </div>
                <NewsModal
                    show={showModal}
                    article={selectedArticle}
                    onClose={() => setShowModal(false)}
                />
                <Bookmark
                    show={showBookmarkModal}
                    bookmarks={bookmarks}
                    onClose={() => setShowBookmarkModal(false)}
                    onSelectArticle={handleArticleClick}
                    onDeleteBookmark={handleBookmarkClick}
                />
                <div className="my-blog">
                    <h1 className="my-blogs-heading"> My Blogs</h1>
                    <div className="blog-posts">
                        {blogs.map((blog, index) => (
                            <div key={index} className="blog-post" onClick={() => handleBlogClick(blog)}>
                                <img src={blog.image || noImg} alt={blog.title} />
                                <h3> {blog.title}</h3>
                              
                                <div className="post-buttons">
                                    <button className="edit-post" onClick={() => onEditBlog(blog)}>
                                        <i className='bx-bxs-edit'></i></button>
                                    <button className="delete-post">
                                        <i className='bx-bxs-x-circle'></i></button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {selectedPost && showBlogModal && (
                        <BlogModal show={showBlogModal} blog={selectedPost} onClose={closeBlogModal} />
                    )}


                </div>
                <div className="weather-calendar">
                    <Weather />
                    <Calender />
                </div>
            </div>
            <footer className="news-footer">
                <p>
                    <span>News & Blogs App</span>
                </p>
                <p> &copy; 2025 All rights reserved. Designed By Code and Create </p>
            </footer>
        </div>
    );
};

export default News;
