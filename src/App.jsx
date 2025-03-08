import React, { useState } from 'react';
import News from './Components/News/News';
import Blog from './Components/Blog/Blog';
import { useEffect } from 'react';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlog, setShowBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || []
    setBlogs(savedBlogs)
  },[])
  const handleCreateBlog = (newBlog) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = [...prevBlogs, newBlog]
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
      return updatedBlogs 
    })
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
