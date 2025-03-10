import React, { useState } from 'react';
import News from './Components/News/News';
import Blog from './Components/Blog/Blog';
import { useEffect } from 'react';

const App = () => {
  const [showNews, setShowNews] = useState(true);
  const [showBlog, setShowBlog] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null)
  coìt [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('blogs')) || []
    setBlogs(savedBlogs)
  },[])
  const handleCreateBlog = (newBlog, isEdit) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = isEdit ? prevBlogs.map((blog) => (blog === selectedPost ? newBlog : blog)) :  [...prevBlogs, newBlog]
      localStorage.setItem('blogs', JSON.stringify(updatedBlogs))
      return updatedBlogs 
    })
    setIsEditing(false)
    setSelectedPost(null)
  }

  const handleEditBlog = (blogs) => {
    setSelectedPost(blogs)
    setIsEditing(true)
    setShowNews(false)
    setShowBlog(true)
  }

  const handleDeleteBlog = (blogToDelete) => {
    setBlogs((prevBlogs) => {
      const updatedBlogs = prevBlogs.filter((blog) => blog !== blogToDelete)
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
    setIsEditing(false)
    setSelectedPost(null)
  };

  return (
    <div className="container">
      <div className="news-blog-app">
        {showNews && <News onShowBlogs={handleShowBlogs} blogs={blogs} onClick={handleEditBlog} onDeleteBlog={handleDeleteBlog} />}
        {showBlog && <Blog onBack={handleBackToNews} onCreateBlog={handleCreateBlog} editPost={selectedPost} isEditing={isEditing} />}
      </div>
    </div>
  );
};

export default App;
