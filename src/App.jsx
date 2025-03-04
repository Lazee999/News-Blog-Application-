import React, { useState } from 'react'
import News from './Components/News/News'
import Blog from './Components/Blog/Blog'

const App = () => {
  const [showNews, setShowNews] = useState(true)
  const [showBlog, setShowBlog] = useState(false)
  
  const handleToggleBlogs = () => {
    setShowNews(false)
    setShowBlog(true)
  }

  const handleToggleNews = () => {
    setShowNews(true)
    setShowBlog(false)
  }
  
  return (
    <div className='container'>
      <div className="news-blog-app">
        {showNews &&  <News onShowBlogs={handleshowBlogs} />}
        {showBlog &&  <Blog onClick={handleBackToNews} />}
        <News /> 
        <Blog />
      </div>
    </div>
  )
}

export default App