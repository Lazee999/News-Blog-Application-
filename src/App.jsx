import React, { useState } from 'react';
import News from './Components/News/News';
import Blog from './Components/Blog/Blog';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlog, setShowBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);

  const handleCreateBlog = (newBlog) => {
    setBlogs((prevBlogs) => [...prevBlogs, newBlog] )
  }

  const handleShowBlogs = () => {
    setShowNews(false);
    setShowBlog(true);
  };

  const handleBackToNews = () => {
    setShowNews(true);
    setShowBlog(false);
  };

  return (
    <div className="container">
      <div className="news-blog-app">
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} />}
        {showBlog && <Blog onBack={handleBackToNews} onCreateBlog={handleCreateBlog}  />}
      </div>
    </div>
  );
};

export default App;
